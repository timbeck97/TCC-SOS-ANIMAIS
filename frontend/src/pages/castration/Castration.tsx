import DataTable, { TableColumn, TableStyles } from "react-data-table-component"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../../components/input/Input"
import { TableWaitingList } from "../../components/tablewaitingList/TableWaitingList"
import { EsperaCastracao } from "../../types/EsperaCastracao"
import { fintNextMonday, formatDateWithHour, formatSituacao } from "../../services/Util"
import { HiOutlineCube } from "react-icons/hi";
import { useEffect, useState } from "react"
import { FcList, FcOvertime, FcStatistics } from "react-icons/fc"
import { CastrationModel } from "../../types/CastrationModel"
import { PiDog } from "react-icons/pi";
import { Dropdown, Modal } from "flowbite-react"
import { FaCheck, FaRegFilePdf, FaSearch } from "react-icons/fa"
import { MdOutlineFileDownload } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import api, { deleteRequest, get, post, put, request } from "../../services/Axios"
import { openAlertSuccess, openAlertWarning } from "../../services/Alert"
import { GrLinkPrevious } from "react-icons/gr";
import { ConfirmModal } from "../../components/modal/ConfirmModal"
import { Label } from "../../components/label/Label"
import { Title } from "../../components/title/Title"
import { Button } from "../../components/button/Button"
import { FiPlus } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form"
import { CastrationFormSchema, CastrationFormType } from "../../schemas/CastrationFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Subtitle } from "../../components/title/Subtitle"
import { CastrationAnimals } from "../../components/castrationAnimals/CastrationAnimals"
import { customTableStyle } from "../../components/castrationAnimals/TableStyle"



export const Castration = () => {
    const { id } = useParams<{ id: string | undefined }>()
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<CastrationFormType>({
        defaultValues: {
            data: fintNextMonday()
        },
        resolver: zodResolver(CastrationFormSchema)
    });

    const navigate = useNavigate();
    const [listsEspera, setListsEspera] = useState<EsperaCastracao[]>([])
    const [castracoes, setCastracoes] = useState<CastrationModel[]>([])
    const [animais, setAnimais] = useState<EsperaCastracao[]>([])


    const [showSelecionarCaixas, setShowSelecionarCaixas] = useState<boolean>(false)
    const [confirmFinalizarCastracao, setConfirmFinalizarCastracao] = useState<boolean>(false)

    const [castracao, setCastracao] = useState<CastrationModel>({
        data: fintNextMonday(),
        observacao: '',
        quantidadeAnimais: 0,
        quantidadeCaixasPequenas: 0,
        quantidadeCaixasMedias: 0,
        quantidadeCaixasGrandes: 0
    })
    const [saveAnimalRemover, setSaveAnimalRemover] = useState<EsperaCastracao | null>(null)

    useEffect(() => {
        if (id === 'nova') {
            getWaitingList();
        } else if (id) {
            getCastration(id)
        } else {
            getCastrations()
        }
    }, [id])


    const getWaitingList = async() => {
        let response=await request<EsperaCastracao[]>('get','/castration/waitingList')
        setListsEspera(response||[])
    }
    const getCastration = async (id: string | number | undefined, callback?: () => void) => {
        if (!id) {
            return;
        }
        let response = await request<CastrationModel>('get','/castration/' + id)
        setCastracao(response||{} as CastrationModel)
            if (callback) {
                callback()
            }
    }
    const getCastrations = async () => {
        let response=await request<CastrationModel[]>('get','/castration', {}, {})
        setCastracoes(response||[])
    }
    const concluirCastracao = () => {
        put('/castration/concluir/' + id, {}, {}, {}).then(data => {
            getCastration(id);
            setConfirmFinalizarCastracao(false)
            openAlertSuccess('Castracao Concluida')
        })
    }
    const validarConclusao = ()=>{
        if(!permitidoConcluir(true)){
            return;
        }
        setConfirmFinalizarCastracao(true)
    }
    const permitidoConcluir = (showAlert:boolean)=>{
        if(castracao && castracao.animais && castracao.animais.length>0){
            if(!castracao.animais.every(a=>a.idFaixa && a.idFaixa!=0)){
                if(showAlert){
                    openAlertWarning('Para finalizar a castração é necessário informar as faixas de valores')
                }
                return false;
            }
            if(castracao.data){
                let objData=new Date(castracao.data)
                if(objData.getTime()>new Date().getTime()){
                    if(showAlert){
                        openAlertWarning('Não é possível concluir uma castração que ainda nao ocorreu')
                    }
                    return false;
                }
            }else{
                return false;
            }
            return true;
        }else{
            return false;
        }
        
    }
    const handleAbrirCastracao = (row: any) => {
        getCastration(row.id, () => {
            navigate('/gerenciar/castracoes/' + row.id)
        })

    }
    const generateReport = (row: any) => {
        api.get('/report/castration/' + row.id, { responseType: 'blob' }).then((response) => {

            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'pdfCastracaoSOSAnimais.pdf';

            if (contentDisposition) {
                const matches = contentDisposition.match(/filename="(.+)"/);
                if (matches && matches[1]) {
                    fileName = matches[1];
                }
            }

            const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = urlBlob;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            link?.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(urlBlob);
        })
    }
    const handleChangeCastracao = <K extends keyof NonNullable<CastrationModel>>(name: K, value: NonNullable<CastrationModel[K]>) => {
        if (castracao) {
            setCastracao({ ...castracao, [name]: value })
        } else {
            let obj: CastrationModel = {
                data: '',
                observacao: '',
                quantidadeAnimais: 0
            }
            obj[name] = value
            setCastracao(obj)
        }

    };
    const renderAcoes = (row: any) => {
        return (
            <div>
                <Dropdown
                    inline
                    className="mt-3"
                    label={
                        <span
                            className="bg-indigo-500 float-right text-white flex items-center px-2 rounded-md py-1 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <LuPencil />
                            <span>&nbsp;Ações</span>
                        </span>
                    }
                >

                    <Dropdown.Item icon={MdOutlineFileDownload} onClick={() => generateReport(row)}>Gerar Relatório</Dropdown.Item>
                    <Dropdown.Item icon={FaSearch} onClick={() => handleAbrirCastracao(row)}>Abrir</Dropdown.Item>
                </Dropdown>
            </div>
        )
    }
    const columns: TableColumn<{
        data: string;
        quantidadeAnimais: number;
        observacao: string;
        situacao?: string;
    }>[] = [
            {
                id: 'data',
                name: 'Data',
                selector: (row) => row.data,
                format: (row) => formatDateWithHour(row.data),
                sortable: true,
            },
            {
                id: 'quantidadeAnimais',
                name: 'Quantidade de Animais',
                selector: (row) => row.quantidadeAnimais,
                sortable: true,
            },
            {
                id: 'situacao',
                name: 'Situação',
                selector: (row) => formatSituacao(row.situacao),
                sortable: true,
            },
            {
                id: 'observacao',
                name: 'Observação',
                selector: (row) => row.observacao,
                sortable: true,
            },
            { name: 'Ações', cell: renderAcoes },

        ]


    const handleSelect = (selectedRows: EsperaCastracao[]) => {
        setAnimais(selectedRows)
        let filaEspera = listsEspera
        filaEspera.forEach((animal) => {
            if (selectedRows.includes(animal)) {
                animal.selected = true
            }
        })
        setListsEspera(filaEspera)
    }
    const selectAnimais = () => {
        let qttCaixasPequenas = castracao?.quantidadeCaixasPequenas || 0
        let qttCaixasMedias = castracao?.quantidadeCaixasMedias || 0
        let qttCaixasGrandes = castracao?.quantidadeCaixasGrandes || 0
        if (qttCaixasPequenas === 0 && qttCaixasMedias === 0 && qttCaixasGrandes === 0) {
            openAlertWarning('Informe a quantidade de caixas para selecionar os animais automaticamente')
            return;
        }
        let filaEspera = listsEspera

        filaEspera.sort((a, b) => {
            let dateA = a.dataSolicitacao
            let dateB = b.dataSolicitacao
            if (dateA > dateB) {
                return 1
            }
            if (dateA < dateB) {
                return -1
            }
            return 0
        })
        let animaisCastracao: EsperaCastracao[] = []
        filaEspera.forEach((animal) => {

            switch (animal.porteAnimal) {
                case 'PEQUENO':
                    if (qttCaixasPequenas > 0) {
                        qttCaixasPequenas--
                        animal.selected = true
                    }
                    break;
                case 'MEDIO':
                    if (qttCaixasMedias > 0) {
                        qttCaixasMedias--
                        animal.selected = true
                    }
                    break;
                case 'GRANDE':
                    if (qttCaixasGrandes > 0) {
                        qttCaixasGrandes--
                        animal.selected = true
                    }
                    break;
            }
            if (animal.selected === true) {
                animaisCastracao.push(animal)
            }
        })
        console.log('on select animais');

        setListsEspera([...filaEspera])
        setAnimais([...animaisCastracao])
    }
    const postCastration = (data: CastrationFormType) => {
        if (animais.length === 0) {
            openAlertWarning('Selecione os animais para castração')
            return
        }

        let obj = {
            data: new Date(data?.data).toISOString(),
            observacao: data?.observacao,
            quantidadeAnimais: animais.length,
            animais: animais
        }

        post<CastrationModel>('/castration', obj, {}, (response) => {
            openAlertSuccess('Castração cadastrada com sucesso')
            navigate('/gerenciar/castracoes')
            setListsEspera([])
            setAnimais([])
        })
    }
    const removerAnimal = (animal: EsperaCastracao) => {
        deleteRequest<void>('/castration/waitingList/' + animal.id, (response) => {
            openAlertSuccess('Animal removido da lista de espera')
            if (castracao?.id) {
                getCastration(castracao.id, () => {
                    setSaveAnimalRemover(null)
                })
            }
        })
    }

    const renderModalSelecionarCaixas = () => {
        return (
            <Modal show={showSelecionarCaixas} onClose={() => setShowSelecionarCaixas(false)}>
                <Modal.Header >
                    Selecionar Caixas Disponíveis
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Input id="quantidadeCaixasPequenasIdx"
                            label="Quantidade de Caixas Pequenas"
                            type="number"
                            name="quantidadeCaixasPequenas"
                            value={castracao?.quantidadeCaixasPequenas}
                            onChange={(e: any) => handleChangeCastracao('quantidadeCaixasPequenas', e.target.value)}

                        />
                        <Input id="quantidadeCaixasMediasIdx"
                            label="Quantidade de Caixas Médias"
                            type="number"
                            name="quantidadeCaixasMedias"
                            value={castracao?.quantidadeCaixasMedias}
                            onChange={(e: any) => handleChangeCastracao('quantidadeCaixasMedias', e.target.value)}

                        />
                        <Input id="quantidadeCaixasGrandesIdx"
                            label="Quantidade de Caixas Grandes"
                            type="number"
                            name='quantidadeCaixasGrandes'
                            value={castracao?.quantidadeCaixasGrandes}
                            onChange={(e: any) => handleChangeCastracao('quantidadeCaixasGrandes', e.target.value)}

                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full space-x-2 flex justify-end">

                        <Button text="Fechar" onClick={() => setShowSelecionarCaixas(false)} type="neutral" />
                        <Button text="Confirmar" onClick={() => {
                            setShowSelecionarCaixas(false)
                            selectAnimais()
                        }} type="default" />
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
    const onSubmit: SubmitHandler<CastrationFormType> = data => {
        postCastration(data)
    }
    const renderCadastrarNovaCastracao = () => {
        return (
            <div className="p-3">
                <div className="flex  border-b border-gray-900/10 pb-5 mt-3">
                    <Title text="Registrar nova data de castração" icon={<PiDog size={35} />} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <div className="border-b border-gray-900/10 pb-5 mt-5">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-4">
                                <div className="sm:col-span-1 space-y-4">
                                    <Subtitle text="Dados da Castração" extraClasses="mb-3" />
                                    <hr />
                                    <Input id="dataIdx"
                                        label="Data da Castração"
                                        type="datetime-local"
                                        errors={errors.data}
                                        {...register('data')}
                                    />


                                    <Input id="observacaoIdx"
                                        label="Observações"
                                        type="textarea"
                                        lines={4}
                                        errors={errors.observacao}
                                        {...register('observacao')}


                                    />

                                </div>



                            </div>
                            <div className="mt-3 space-x-2">
                                <Button buttonType="submit" text='Cadastrar' icon={<FiPlus />} type="default" />
                                <Button text="Selecionar Animais Automaticamente" buttonType="button" onClick={() => setShowSelecionarCaixas(true)} icon={<HiOutlineCube />} class="bg-gray-600 text-white px-4 rounded-xl py-1 rounded focus:outline-none focus:ring-2 mb-3 mt-3 " />

                            </div>
                        </div>
                        <div className="pb-5 mt-5">
                            <div className="flex items-center">
                                <FcOvertime size={35} />
                                <h2 className="text-lg/7 font-semibold text-gray-900 ml-2">Lista de Espera</h2>
                            </div>
                            <div className="mt-3">
                                <TableWaitingList customTableStyle={customTableStyle} dataProps={listsEspera} selectAnimals={true} handleSelectRows={handleSelect} />
                            </div>
                        </div>

                    </div>
                </form>
                <div>
                    <Button text="Voltar" onClick={() => navigate(-1)} icon={<GrLinkPrevious />} type="neutral" />
                </div>
                {renderModalSelecionarCaixas()}
            </div>
        )
    }
    const renderDetalheCastracao = () => {
        return (
            id === 'nova' ? renderCadastrarNovaCastracao() : renderInfoCastracao()
        )
    }
    const renderInfoCastracao = () => {
        return (
            <div className="pt-3">
                <div className="flex items-center  border-b border-gray-900/10 pb-3 mt-3">
                    <Title text="Detalhes da Castração" icon={<PiDog size={35} />} />

                </div>

                <div className="flex flex-col gap-5 mt-2 ">
                    <div className="grid grid-cols-1 md:grid-cols-3 space-y-2">
                        <div>
                            <Label text="Data" />
                            <p>{formatDateWithHour(castracao?.data)}</p>

                        </div>
                        <div>
                            <Label text="Quantidade de Animais" />
                            <p>{castracao?.quantidadeAnimais}</p>
                        </div>
                        <div>
                            <Label text="Observação" />
                            <p>{castracao?.observacao}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Label text="Situação" />
                            <p>{formatSituacao(castracao.situacao)}</p>

                        </div>
                    </div>
                    <hr />
                    <div>
                        <Title text='Lista de animais' icon={<FcList size={30} />} />
                        {/* <TableWaitingList
                            dataProps={castracao?.animais}
                            customTableStyle={customTableStyle}
                            remote={false}
                            permiteUploadPagamento
                            pagination={false}
                            permiteAlterarFaixaPreco={true}
                            refresh={() => getCastration(castracao.id)}
                            handleRemoveAnimal={(animal) => setSaveAnimalRemover(animal)} /> */}
                            <CastrationAnimals 
                            dataProps={castracao?.animais}
                            refresh={() => getCastration(castracao.id)}
                            handleRemoveAnimal={(animal) => setSaveAnimalRemover(animal)}
                            />
                    </div>
                </div>
                <div className="space-x-0 sm:space-x-2 mt-4 sm:mt-1">
                    {castracao && castracao.situacao==='EM_ANDAMENTO' &&  <Button text="Concluir Castração" onClick={validarConclusao} class="w-full sm:w-60 mt-1" icon={<FaCheck />} type="success" />}
                    <Button text="Gerar Relatório" onClick={() => generateReport(castracao)} class="w-full sm:w-60 mt-1" icon={<FaRegFilePdf />} type="default" />
                    <Button text="Voltar" onClick={() => navigate(-1)} icon={<GrLinkPrevious />} class="w-full sm:w-40 mt-1" type="neutral" />
                </div>

                <ConfirmModal
                    show={saveAnimalRemover != null}
                    confirm={() => removerAnimal(saveAnimalRemover as EsperaCastracao)}
                    close={() => setSaveAnimalRemover(null)}
                    title="Remover Animal"
                    text="Deseja realmente remover este animal da lista de castração?"
                />
                <ConfirmModal
                    show={confirmFinalizarCastracao}
                    confirm={() => concluirCastracao()}
                    close={() => setConfirmFinalizarCastracao(false)}

                    text="Deseja realmente concluir esta castração?"
                />


            </div>
        )
    }
    const renderCastracoes = () => {
        return (
            <div>
                <div className="rounded px-2 pt-4 flex items-center  border-b border-gray-900/10 pb-5">
                    <Title text="Castrações SOS Animais" icon={<FcStatistics size={35} />} />
                </div>

                <Button text="Nova Castração" class="float-right mt-3" onClick={() => {
                    getWaitingList();
                    navigate('/gerenciar/castracoes/nova')
                    setCastracao({
                        data: fintNextMonday(),
                        observacao: '',
                        quantidadeAnimais: 0,
                        quantidadeCaixasPequenas: 0,
                        quantidadeCaixasMedias: 0,
                        quantidadeCaixasGrandes: 0
                    })
                }} icon={<FiPlus />} type="default" />
                <DataTable
                    columns={columns}
                    data={castracoes}
                    pagination={true}
                    customStyles={customTableStyle}
                    onRowClicked={(row) => handleAbrirCastracao(row)}
                    defaultSortFieldId='data'
                    pointerOnHover
                    highlightOnHover
                    paginationComponentOptions={
                        {
                            rowsPerPageText: 'Registros por página',
                            rangeSeparatorText: 'de',
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'Todos',
                        }
                    }
                />
            </div>
        )
    }
    return (

        <div className="pb-12 px-10 bg-[#f3f4f6] flex flex-col grow">
            {!id ? renderCastracoes() : renderDetalheCastracao()}
        </div>

    )
}