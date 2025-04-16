import { useNavigate, useParams } from "react-router-dom"
import Input from "../../components/input/Input"
import { EsperaCastracao } from "../../types/EsperaCastracao"
import { fintNextMonday, formatDateWithHour, formatPorteAnimal, formatSituacao, formatTipoAnimal } from "../../services/Util"
import { HiOutlineCube } from "react-icons/hi";
import { useEffect, useState } from "react"
import { FcInfo, FcList, FcOvertime, FcStatistics } from "react-icons/fc"
import { CastrationModel } from "../../types/CastrationModel"
import { PiDog } from "react-icons/pi";
import { Dropdown, Modal } from "flowbite-react"
import { FaCheck, FaRegFilePdf, FaSearch } from "react-icons/fa"
import { MdOutlineFileDownload } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import {api,  deleteRequest, post, put, request } from "../../services/Axios"
import { openAlertSuccess, openAlertWarning } from "../../services/Alert"
import { GrLinkPrevious } from "react-icons/gr";
import { ConfirmModal } from "../../components/modal/ConfirmModal"
import { Label } from "../../components/label/Label"
import { Title } from "../../components/title/Title"
import { Button } from "../../components/button/Button"
import { FiCheck, FiPlus } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form"
import { CastrationFormSchema, CastrationFormType } from "../../schemas/CastrationFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Subtitle } from "../../components/title/Subtitle"
import { CastrationAnimals } from "../../components/castrationAnimals/CastrationAnimals"
import { Table } from "../../components/table/Table"
import { Column } from "../../components/table/Column"
import { WaitListModal } from "../../components/WaitListModal/WaitListModal"



export const Castration = () => {
    const { id } = useParams<{ id: string | undefined }>()
    const { register, handleSubmit, formState: { errors } } = useForm<CastrationFormType>({
        defaultValues: {
            data: fintNextMonday()
        },
        resolver: zodResolver(CastrationFormSchema)
    });

    const navigate = useNavigate();
    const [listsEspera, setListsEspera] = useState<EsperaCastracao[]>([])
    const [castracoes, setCastracoes] = useState<CastrationModel[]>([])
    const [animais, setAnimais] = useState<EsperaCastracao[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showAdicionarAnimal, setShowAdicionarAnimal] = useState(false)
    const [waitListSelect, setWaitListSelect] = useState<EsperaCastracao | null>(null)

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
    // eslint-disable-next-line
    }, [id])


    const getWaitingList = async () => {
        let response = await request<EsperaCastracao[]>('get', '/castration/waitingList')
        setListsEspera(response || [])
        if(loading){
            setLoading(false)
        }
    }
    const getCastration = async (id: string | number | undefined, callback?: () => void) => {
        if (!id) {
            return;
        }
        let response = await request<CastrationModel>('get', '/castration/' + id)
        setCastracao(response || {} as CastrationModel)
        if (callback) {
            callback()
        }
        if(loading){
            setLoading(false)
        }
    }
    const getCastrations = async () => {
        let response = await request<CastrationModel[]>('get', '/castration', {}, {})
        setCastracoes(response || [])
        if(loading){
            setLoading(false)
        }
    }
    const concluirCastracao = () => {
        put('/castration/concluir/' + id, {}, {}, {}).then(data => {
            getCastration(id);
            setConfirmFinalizarCastracao(false)
            openAlertSuccess('Castracao Concluida')
        })
    }
    const validarConclusao = () => {
        if (!permitidoConcluir(true)) {
            return;
        }
        setConfirmFinalizarCastracao(true)
    }
    const permitidoConcluir = (showAlert: boolean) => {
        if (castracao && castracao.animais && castracao.animais.length > 0) {
            if (!castracao.animais.filter(c=>c.formaPagamento!=='CASTRACAO_SOLIDARIA').every(a => a.idFaixa && a.idFaixa !== 0)) {
                if (showAlert) {
                    openAlertWarning('Para finalizar a castração é necessário informar as faixas de valores')
                }
                return false;
            }
            if (castracao.data) {
                let objData = new Date(castracao.data)
                if (objData.getTime() > new Date().getTime()) {
                    if (showAlert) {
                        openAlertWarning('Não é possível concluir uma castração que ainda nao ocorreu')
                    }
                    return false;
                }
            } else {
                return false;
            }
            return true;
        } else {
            return false;
        }

    }
    const handleAbrirCastracao = (row: any) => {
        console.log('clicou')
        getCastration(row.id, () => {
            navigate('/gerenciar/castracoes/' + row.id)
        })

    }
    const generateReport = (row: any) => {
        api.get('/report/castration/' + row.id, { responseType: 'blob' }).then((response:any) => {
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


    const handleSelect = (selectedRows: EsperaCastracao[]) => {
        setAnimais(selectedRows)
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
        let newFila = filaEspera.map((animal) => {

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
                animaisCastracao.push({ ...animal })
            }
            return animal;
        })

        setListsEspera([...newFila])
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
     const adicionarAnimalCastracao = async (id:number) => {
            await request<void>('post', `/castration/waitingList/${castracao.id}/addAnimal/${id}`)
            openAlertSuccess('Animal adicionado com sucesso')
            setShowAdicionarAnimal(false)
            getCastration(castracao.id)
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
    const handleAddNovoAnimal = ()=>{
        if(listsEspera.length===0){
            getWaitingList()
        }
        setShowAdicionarAnimal(true)
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
    const renderDadosAnimal = (row: EsperaCastracao) => {
        return (
            <div className="w-full">
                <div className="flex flex-col items-center ">
                    <span className="poppins-bold">{row.nomeAnimal}</span>
                    <span className="poppins-bold text-indigo-500">{formatTipoAnimal(row.tipoAnimal)}</span>
                    <span>{formatPorteAnimal(row.porteAnimal)}</span>
                </div>
            </div>
        )
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
                            <div className="mt-3 space-x-2 sm:block grid space-y-2 sm:space-y-0">
                                <Button buttonType="submit" text='Cadastrar' icon={<FiPlus />} type="default" />
                                <Button text="Selecionar Animais Automaticamente" buttonType="button" onClick={() => setShowSelecionarCaixas(true)} icon={<HiOutlineCube />} type="neutral" />

                            </div>
                        </div>
                        <div className="pb-5 mt-5">
                            <div className="flex items-center">
                                <FcOvertime size={35} />
                                <h2 className="text-lg/7 font-semibold text-gray-900 ml-2">Lista de Espera</h2>
                            </div>
                            <div className="mt-3">
                                <Table<EsperaCastracao> id='tableAnimaisIdx' data={listsEspera} enablePagination={true} selectable={true} onSelectRow={(rows: EsperaCastracao[]) => handleSelect(rows)}>
                                    <Column<EsperaCastracao> field="nomeRequerente" align="center" label="Nome do Requerente" />
                                    <Column<EsperaCastracao> field="porteAnimal" align="center" label="Porte do Animal" format="porteAnimal" />
                                    <Column<EsperaCastracao> label="Animal" align="center" component={(idx, row) => renderDadosAnimal(row)} />
                                    <Column<EsperaCastracao> field="dataSolicitacao" align="center" label="Data da Solicitação" format="data" />
                                    <Column<EsperaCastracao> field="formaPagamento" align="center" label="Forma de Pagamento" format="formaPagamento" />
                                    <Column<EsperaCastracao> label="Ações" component={(idx, row) => <button type="button" onClick={() => setWaitListSelect(row)} >
                                        <FcInfo title="Abri detalhes da solicitação" className="text-xl md:text-2xl" />
                                    </button>} />

                                </Table>
                                <WaitListModal show={waitListSelect !== null} handleClose={() => setWaitListSelect(null)} obj={waitListSelect} />
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
                        <div className="mt-3">
                            <CastrationAnimals
                                dataProps={castracao?.animais}
                                refresh={() => getCastration(castracao.id)}
                                handleRemoveAnimal={(animal) => setSaveAnimalRemover(animal)}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-x-0 sm:space-x-2 mt-4 sm:mt-1">
                    {castracao && castracao.situacao === 'EM_ANDAMENTO' && <Button text="Concluir Castração" onClick={validarConclusao} class="w-full sm:w-60 mt-1" icon={<FaCheck />} type="success" />}
                    {castracao && castracao.id && castracao.situacao === 'EM_ANDAMENTO' &&  <Button text="Adicionar Animal" onClick={() => handleAddNovoAnimal()} class="w-full sm:w-60 mt-1" icon={<FiCheck />} type="default" />}
                    <Button text="Gerar Relatório" onClick={() => generateReport(castracao)} class="w-full sm:w-60 mt-1" icon={<FaRegFilePdf />} type="neutral" />
                    <Button text="Voltar" onClick={() => navigate(-1)} icon={<GrLinkPrevious />} class="w-full sm:w-40 mt-1" type="neutral" />
                </div>
                {renderModalAdicionarAnimal()}
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
    const renderModalAdicionarAnimal = () => {
        return (
            <Modal show={showAdicionarAnimal} onClose={() => setShowAdicionarAnimal(false)} size="5xl">
                <Modal.Header >
                    <Subtitle text="Adicionar Animal" />
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Table id='tableAnimaisAdicionarIdx' data={listsEspera} enablePagination={true}>
                            <Column field="nomeRequerente" align="center" label="Nome do Requerente" />
                            <Column label="Animal" align="center" component={(idx, row: EsperaCastracao) => renderDadosAnimal(row)} />
                            <Column field="dataSolicitacao" align="center" label="Data da Solicitação" format="data" />
                            <Column field="formaPagamento" align="center" label="Forma de Pagamento" format="formaPagamento" />
                            <Column label="" component={(idx, row: EsperaCastracao) => <Button text="Selecionar" onClick={()=>adicionarAnimalCastracao(row.id)}  type="default" />} />
                        </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full space-x-2 flex justify-end">
                        <Button text="Fechar" onClick={() => setShowAdicionarAnimal(false)} type="neutral" />
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
    const renderCastracoes = () => {
        return (
            <div>
                <div className="px-2 pt-4  border-b border-gray-900/10 pb-5">
                    <Title text="Castrações SOS Animais" icon={<FcStatistics size={35} />} />
                </div>

                <div className="flex justify-end mt-3 mb-3">
                    <Button text="Nova Castração" onClick={() => {
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
                </div>
                <Table id='tableAnimaisIdx' data={castracoes} enablePagination={true} onRowClick={handleAbrirCastracao}
                    columnsRowClick={[0, 1, 2, 3,4,5]}
                >
                    <Column field="data" label="Data" format="dataHora" align="center" />
                    <Column field="valorPagoSos" label="Valor pago SOS Animais" format="moedaCifrao" align="center" />
                    <Column field="valoPagoPopulacao" label="Valor pago População" format='moedaCifrao' align="center" />
                    <Column field="quantidadeAnimais" label="Quantidade de Animais" align="center" />
                    <Column field="situacao" label="Situação" format="situacaoCastracao" align="center" />
                    <Column field="observacao" label="Observação" align="center" />
                    <Column label="Ações" component={(idx, row)=>renderAcoes(row)} />
                </Table>


            </div>
        )
    }
    return (

        <div className="pb-12 px-10 bg-[#f3f4f6] flex flex-col grow relative">
            {!id ? renderCastracoes() : renderDetalheCastracao()}
            <div
                className={`absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center 
          transition-opacity duration-50 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        </div>

    )
}