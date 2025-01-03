import DataTable, { TableColumn } from "react-data-table-component"
import { Pawbackground } from "../../components/pawbackground/Pawbackground"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../../components/input/Input"
import { TableWaitingList } from "../../components/tablewaitingList/TableWaitingList"
import { EsperaCastracao } from "../../types/EsperaCastracao"
import { fintNextMonday, formatDateWithHour, formatSituacao} from "../../services/Util"
import { HiOutlineCube } from "react-icons/hi";
import { useEffect, useState } from "react"
import {  FcOvertime, FcStatistics } from "react-icons/fc"
import { CastrationModel } from "../../types/CastrationModel"
import { PiDog } from "react-icons/pi";
import { Dropdown } from "flowbite-react"
import { FaSearch } from "react-icons/fa"
import { MdOutlineFileDownload } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { get, post } from "../../services/Axios"
import { openAlertSuccess, openAlertWarning } from "../../services/Alert"



export const Castration = () => {
    const { id } = useParams<{ id: string | undefined }>()

    const navigate = useNavigate();
    const [listsEspera, setListsEspera] = useState<EsperaCastracao[]>([])
    const [castracoes, setCastracoes] = useState<CastrationModel[]>([])
    const [animais, setAnimais] = useState<EsperaCastracao[]>([])
    const [castracao, setCastracao] = useState<CastrationModel>({
        data: fintNextMonday(),
        observacao: '',
        quantidadeAnimais: 0,
        quantidadeCaixasPequenas: 0,
        quantidadeCaixasMedias: 0,
        quantidadeCaixasGrandes: 0
    })
    useEffect(() => {
        console.log('useEffect castracoes');
        
        if (id === 'nova') {
            getWaitingList();
        } else if (id) {
            getCastration(id)
        }else{
            getCastrations()
        }
    }, [id])
    // const { register, handleSubmit, formState: { errors }, watch } = useForm<CastrationFormType>({
    //     defaultValues: { data: fintNextMonday() }, resolver: zodResolver(CastrationFormSchema)
    // });
    // const values = watch()

    const getWaitingList = ()=>{
        get<EsperaCastracao[]>('/castration/waitingList',{},{},(response) => {
            console.log(response)
            setListsEspera(response)
        })
    }
    const getCastration = (id: string, callback?:()=>void) => {
        get<CastrationModel>('/castration/' + id,{},{},(response) => {
            setCastracao(response)
            if(callback){
                callback()
            }
        })
    }
    const getCastrations = () => {
        get<CastrationModel[]>('/castration',{},{},(response) => {
            console.log(response);
            
            setCastracoes(response)
        })
    }
    const handleAbrirCastracao = (row: any) => {
        getCastration(row.id, ()=>{
            navigate('/gerenciar/castracoes/' + row.id)
        })

    }
    const generateReport = (row: any) => {
        alert('Gerar relatório da castração ' + row.id)
    }
    const handleChangeCastracao = <K extends keyof NonNullable<CastrationModel>>(name:K, value: NonNullable<CastrationModel[K]>) => {
        if(castracao){
            setCastracao({...castracao, [name]: value})
        }else{
            let obj:CastrationModel = {
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
        situacao?:string;
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
            { name: 'Ações', cell: renderAcoes},

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
        if(qttCaixasPequenas === 0 && qttCaixasMedias === 0 && qttCaixasGrandes === 0){
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
        setListsEspera([...filaEspera])
        setAnimais([...animaisCastracao])
    }
    const postCastration = () => {
        if (animais.length === 0) {
            openAlertWarning('Selecione os animais para castração')
            return
        }
        let obj={
            data: new Date(castracao?.data).toISOString(),
            observacao: castracao?.observacao,
            quantidadeAnimais: animais.length,
            animais: animais
        }
       
        post<CastrationModel>('/castration',obj,{},(response) => {
            openAlertSuccess('Castração cadastrada com sucesso')
            navigate('/gerenciar/castracoes')
            setListsEspera([])
            setAnimais([])
        })
    }
    const renderCadastrarNovaCastracao = () => {
        return (
            <div className="p-3">
                <div className="flex  border-b border-gray-900/10 pb-5 mt-3">
                    <PiDog size={35} />
                    <h1 className="text-2xl inline font-bold mb-2 ml-2  poppins-semibold">Registrar nova data de castração</h1>
                </div>
                <form>
                    <div className="flex flex-col gap-5">
                        <div className="border-b border-gray-900/10 pb-5 mt-5">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-4">
                                <div className="sm:col-span-2 space-y-4">

                                    <Input id="dataIdx"
                                        label="Data da Castração"
                                        type="datetime-local"
                                        name='data'
                                        value={castracao?.data}
                                        onChange={(e:any) => handleChangeCastracao('data', e.target.value)}
                                    />


                                    <Input id="observacaoIdx"
                                        label="Observações"
                                        type="textarea"
                                        lines={4}
                                        name='observacao'
                                        value={castracao?.observacao}
                                        onChange={(e:any) => handleChangeCastracao('observacao', e.target.value)}
                                      

                                    />
                                    <button type="button"
                                        onClick={selectAnimais}
                                        className="bg-gray-600 text-white ml-2 px-4 rounded-xl py-1 rounded flex justify-center items-center focus:outline-none focus:ring-2"
                                    >
                                        <HiOutlineCube />
                                        <span>&nbsp; Selecionar Animais Automaticamente</span>

                                    </button>
                                </div>

                                <div className="sm:col-span-2">

                                    <div className="h-full">

                                        <Input id="quantidadeCaixasPequenasIdx"
                                            label="Quantidade de Caixas Pequenas"
                                            type="number"
                                            name="quantidadeCaixasPequenas"
                                            value={castracao?.quantidadeCaixasPequenas}
                                            onChange={(e:any) => handleChangeCastracao('quantidadeCaixasPequenas', e.target.value)}
                                        />
                                        <Input id="quantidadeCaixasMediasIdx"
                                            label="Quantidade de Caixas Médias"
                                            type="number"
                                            name= "quantidadeCaixasMedias"
                                            value={castracao?.quantidadeCaixasMedias}
                                            onChange={(e:any) => handleChangeCastracao('quantidadeCaixasMedias', e.target.value)}
                                        />
                                        <Input id="quantidadeCaixasGrandesIdx"
                                            label="Quantidade de Caixas Grandes"
                                            type="number"
                                            name = 'quantidadeCaixasGrandes'
                                            value={castracao?.quantidadeCaixasGrandes}
                                            onChange={(e:any) => handleChangeCastracao('quantidadeCaixasGrandes', e.target.value)}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 gap-3">
                                <button type="button" onClick={()=>postCastration()}
                                    className="bg-indigo-500 float-right text-white px-4 rounded-xl py-1 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Cadastrar
                                </button>


                            </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-5 mt-5">
                            <div className="flex items-center">
                                <FcOvertime size={35} />
                                <h2 className="text-lg/7 font-semibold text-gray-900 ml-2">Lista de Espera</h2>
                            </div>
                            <div className="mt-3">
                                <TableWaitingList dataProps={listsEspera} selectAnimals={true} handleSelectRows={handleSelect} />
                            </div>
                        </div>
                        {/* <pre className="mt-5">
                            <p className="font-bold">
                                Valores formulário
                            </p>

                            <p>Data: {values.data.toString()}</p>
                            <p>Observacao: {values.observacao}</p>
                            <p>Quantidade de Caixas Pequenas: {values.quantidadeCaixasPequenas}</p>
                            <p>Quantidade de Caixas Médias: {values.quantidadeCaixasMedias}</p>
                            <p>Quantidade de Caixas Grandes: {values.quantidadeCaixasGrandes}</p>
                            <p>Animais: </p>
                            {animais.length > 0 && animais.map((animal, index) =>
                                (<p key={index} >{(index + 1) + '-' + animal.nomeRequerente + '-' + animal.nomeAnimal}</p>)
                            )}

                        </pre> */}
                    </div>
                </form>
                <button type="button" onClick={() => navigate(-1)}
                    className="bg-gray-200 text-gray px-2 rounded-xl py-1 mb-5 rounded"
                >
                    Voltar
                </button>
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
                <div className="flex  border-b border-gray-900/10 pb-3 mt-3">
                    <PiDog size={35} />
                    <h1 className="text-2xl inline font-bold mb-2 ml-2  poppins-semibold">Detalhes da Castração</h1>
                </div>

                <div className="flex flex-col gap-5 mt-2 ">
                    <div className="grid grid-cols-3 border-b pb-4 border-gray-900/10">
                        <div>
                            <label className="text-sm font-bold">Data</label>
                            <p>{formatDateWithHour(castracao?.data)}</p>
                           
                        </div>
                        <div>
                            <label className="text-sm font-bold">Quantidade de Animais</label>
                            <p>{castracao?.quantidadeAnimais}</p>
                        </div>
                        <div>
                            <label className="text-sm font-bold">Observação</label>
                            <p>{castracao?.observacao}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-md inline font-bold poppins-semibold">Lista de animais</p>
                        <TableWaitingList dataProps={castracao?.animais} remote={false} pagination={false} />
                    </div>
                </div>
                <button type="submit" onClick={() => navigate(-1)}
                    className="bg-gray-200 text-gray px-2 rounded-xl py-1 mb-3 mt-8 rounded"
                >
                    Voltar
                </button>
            </div>
        )
    }
    const renderCastracoes = () => {
        return (
            <div>
                <div className="rounded px-2 pt-4 flex items-center  border-b border-gray-900/10 pb-5">
                    <FcStatistics size={35} />
                    <h1 className="text-2xl ml-3  poppins-semibold">Castrações SOS Animais</h1>
                </div>
                <button type="submit" onClick={() => {
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
                }}
                    className="bg-indigo-500 mt-2 mb-5 float-right text-white px-4 rounded-xl py-1  rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Nova Castração
                </button>
                <DataTable
                    columns={columns}
                    data={castracoes}
                    pagination={true}
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
        <Pawbackground>
            <div className="border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white">
                {!id ? renderCastracoes() : renderDetalheCastracao()}
            </div>
        </Pawbackground>
    )
}