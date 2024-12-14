import DataTable, { TableColumn } from "react-data-table-component"
import { Pawbackground } from "../../components/pawbackground/Pawbackground"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import Input from "../../components/input/Input"
import { TableWaitingList } from "../../components/tablewaitingList/TableWaitingList"
import { EsperaCastracao } from "../../types/EsperaCastracao"
import { fintNextMonday, parseDate } from "../../services/Util"
import { HiOutlineCube } from "react-icons/hi";
import { useEffect, useState } from "react"
import { getWaitingCastration, getWaitingList } from "../../services/RequestService"
import { MOCK_CASTRACOES } from "../../services/Constantes"
import { CastrationFormSchema, CastrationFormType } from "../../schemas/CastrationFormSchema"
import {  FcOvertime, FcStatistics } from "react-icons/fc"
import { CastrationModel } from "../../types/CastrationModel"
import { PiDog } from "react-icons/pi";
import { Dropdown } from "flowbite-react"
import { FaSearch } from "react-icons/fa"
import { MdOutlineFileDownload } from "react-icons/md";
import { LuPencil } from "react-icons/lu";



export const Castration = () => {
    const { id } = useParams<{ id: string | undefined }>()

    const navigate = useNavigate();
    const [listsEspera, setListsEspera] = useState<EsperaCastracao[]>([])
    const [animais, setAnimais] = useState<EsperaCastracao[]>([])
    const [castracao, setCastracao] = useState<CastrationModel | null>(null)
    useEffect(() => {

        if (id === 'nova') {
            getWaitingList().then((data) => {
                setListsEspera(data)
            })
        } else if (id) {
            getWaitingCastration(Number(id)).then((data) => {
                setCastracao(data)
            })
        }
    }, [id])
    const { register, handleSubmit, formState: { errors }, watch } = useForm<CastrationFormType>({
        defaultValues: { data: fintNextMonday() }, resolver: zodResolver(CastrationFormSchema)
    });
    const values = watch()
    const handleAbrirCastracao = (row: any) => {
        getWaitingCastration(row.id).then((data) => {
            setCastracao(data)
            navigate('/gerenciar/castracoes/' + row.id)
        })

    }
    const generateReport = (row: any) => {
        alert('Gerar relatório da castração ' + row.id)
    }
    const renderAcoes = (row: any) => {
        return (
            <div>
                <Dropdown
                    inline
                    label={
                        <span
                            className="bg-indigo-500 float-right text-white flex items-center px-2 rounded-md py-1 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <LuPencil />
                            <span>&nbsp;Ações</span>
                        </span>
                    }
                >


                    <Dropdown.Item icon={FaSearch} onClick={() => handleAbrirCastracao(row)}>Abrir</Dropdown.Item>
                    <Dropdown.Item icon={MdOutlineFileDownload} onClick={() => generateReport(row)}>Gerar Relatório</Dropdown.Item>
                </Dropdown>
            </div>
        )
    }
    const columns: TableColumn<{
        data: string;
        quantidadeAnimais: number;
        observacao: string;
    }>[] = [
            {
                id: 'data',
                name: 'Data',
                selector: (row) => row.data,
                sortable: true,
            },
            {
                id: 'quantidadeAnimais',
                name: 'Quantidade de Animais',
                selector: (row) => row.quantidadeAnimais,
                sortable: true,
            },
            {
                id: 'observacao',
                name: 'Observação',
                selector: (row) => row.observacao,
                sortable: true,
            },
            { name: 'Ações', cell: renderAcoes }

        ]

    const onSubmit: SubmitHandler<CastrationFormType> = data => {
        let obj = {
            data: data.data,
            observacao: data.observacao,
            quantidadeCaixasPequenas: data.quantidadeCaixasPequenas,
            quantidadeCaixasMedias: data.quantidadeCaixasMedias,
            animais: animais
        }
        alert(JSON.stringify(obj, null, '\t'));
    };
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
        let qttCaixasPequenas = values.quantidadeCaixasPequenas
        let qttCaixasMedias = values.quantidadeCaixasMedias
        let qttCaixasGrandes = values.quantidadeCaixasGrandes
        let filaEspera = listsEspera
        filaEspera.sort((a, b) => {
            let dateA = parseDate(a.dataSolicitacao)
            let dateB = parseDate(b.dataSolicitacao)
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
    const renderCadastrarNovaCastracao = () => {
        return (
            <div className="p-3">
                <div className="flex  border-b border-gray-900/10 pb-5 mt-3">
                    <PiDog size={35} />
                    <h1 className="text-2xl inline font-bold mb-2 ml-2  poppins-semibold">Registrar nova data de castração</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <div className="border-b border-gray-900/10 pb-5 mt-5">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-4">
                                <div className="sm:col-span-2 space-y-4">

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
                                            errors={errors.quantidadeCaixasPequenas}
                                            {...register('quantidadeCaixasPequenas')}
                                        />
                                        <Input id="quantidadeCaixasMediasIdx"
                                            label="Quantidade de Caixas Médias"
                                            type="number"
                                            errors={errors.quantidadeCaixasMedias}
                                            {...register('quantidadeCaixasMedias')}
                                        />
                                        <Input id="quantidadeCaixasGrandesIdx"
                                            label="Quantidade de Caixas Grandes"
                                            type="number"
                                            errors={errors.quantidadeCaixasGrandes}
                                            {...register('quantidadeCaixasGrandes')}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 gap-3">
                                <button type="submit"
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
                        <pre className="mt-5">
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

                        </pre>
                    </div>
                </form>
                <button type="submit" onClick={() => navigate(-1)}
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
                            <p>{castracao?.data}</p>
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
                        <TableWaitingList dataProps={castracao?.animais} />
                    </div>
                </div>
                <button type="submit" onClick={() => navigate(-1)}
                    className="bg-gray-200 text-gray px-2 rounded-xl py-1 mb-5 rounded"
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
                    getWaitingList().then((data) => {
                        setListsEspera(data)
                    })
                    navigate('/gerenciar/castracoes/nova')
                }}
                    className="bg-indigo-500 mt-2 float-right text-white px-4 rounded-xl py-1  rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Nova Castração
                </button>
                <DataTable
                    columns={columns}
                    data={MOCK_CASTRACOES}
                    pagination={true}
                    defaultSortFieldId='data'
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