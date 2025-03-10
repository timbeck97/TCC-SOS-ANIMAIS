import DataTable, { TableColumn } from "react-data-table-component"
import { EsperaCastracao } from "../../types/EsperaCastracao"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableWaitingListInterface } from "../../types/TableWaitingListInterface"
import { formatDate, formatFormaPagamento, formatPorteAnimal, formatTipoAnimal } from "../../services/Util"
import { WaitListModal } from "../WaitListModal/WaitListModal"
import { FcCancel, FcFolder, FcInfo, FcOk } from "react-icons/fc"
import { post, put, request } from "../../services/Axios"
import { Dropdown, Modal } from "flowbite-react"
import { InputFile } from "../input/InputFile"
import { Button } from "../button/Button"
import { openAlertSuccess } from "../../services/Alert"
import { FaDownload, FaEdit, FaTrashAlt } from "react-icons/fa"
import { FaixaValor } from "../../types/FaixaValor"
import { InputCombobox } from "../input/InputCombobox"
import { customTableStyle } from "./TableStyle"
import { LuPencil } from "react-icons/lu"
import { useNavigate } from "react-router-dom"




export const CastrationAnimals = ({ handleSelectRows,
    pagination = true,
    dataProps,
    handleRemoveAnimal,
    title,
    refresh,
}: TableWaitingListInterface) => {

    const [data, setData] = useState<EsperaCastracao[]>([])
    const [waitListSelect, setWaitListSelect] = useState<EsperaCastracao | null>(null)
    const [idWaitList, setIdWaitList] = useState<number | null>(null)
    const [file, setFile] = useState<{ fileName: string, file: File } | null>(null)
    const [showUploadPagamento, setShowUploadPagamento] = useState(false)
    const [faixaValores, setFaixaValores] = useState<FaixaValor[]>([{ descricao: 'Não Informado', valor: '0' }])
    const [tipoPagamento, setTipoPagamento] = useState<'CONFIRMAR' | 'COMPROVANTE'>('CONFIRMAR')
    const navigate = useNavigate();
    useEffect(() => {

        setData(dataProps || [])
        getFaixasPreco();
    }, [dataProps])
    const atualizarSituacaoFaixaPreco = (idSolicitacao: number, idFaixa: number) => {
        put('/faixapreco/solicitacaoCastracao/' + idSolicitacao, {}, {}, { idFaixa: idFaixa }).then(x => {
            refresh && refresh()
        })
    }
    const orderData = useCallback((a: EsperaCastracao, b: EsperaCastracao) => {
        const dateA = a.dataSolicitacao
        const dateB = b.dataSolicitacao

        if (dateA > dateB) {
            return 1
        }
        if (dateA < dateB) {
            return -1
        }
        return 0
    }, [])
    const getFaixasPreco = async () => {
        let response = await request<FaixaValor[]>('get', '/faixapreco')
        let data = response || []
        data.unshift({ id: 0, descricao: 'Não Informado', valor: '0' })
        console.log(data)
        setFaixaValores(data)
    }
    const renderAcoes = (row: any) => {
        return (
            <div className="fixed w-full">
                <Dropdown
                    placement="top"
                    inline
                    id="asdasdasdas"
                    enableTypeAhead
                    className="mt-3 fixed left-0 z-50"
                    label={
                        <span
                            className="bg-indigo-500 float-right text-white flex items-center px-2 rounded-md py-1 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <LuPencil />
                            <span>&nbsp;Ações</span>
                        </span>
                    }
                >

                    <Dropdown.Item icon={FcInfo} onClick={() => setWaitListSelect(row)}>Abrir</Dropdown.Item>
                    <Dropdown.Item icon={FcFolder} onClick={() => {
                        setShowUploadPagamento(true)
                        setIdWaitList(row.id)
                    }}>Pagamento</Dropdown.Item>
                    {row.urlComprovante && <Dropdown.Item icon={FaDownload} onClick={() => window.open(row.urlComprovante, "_target")}>Download Comprovante</Dropdown.Item>}
                    <Dropdown.Item icon={FaEdit} onClick={() => navigate('/gerenciar/filaEspera/' + row.id)}>Editar</Dropdown.Item>
                    {handleRemoveAnimal && <Dropdown.Item icon={FaTrashAlt} onClick={() => handleRemoveAnimal(row)}>Remover</Dropdown.Item>}
                </Dropdown>
            </div>
        )
    }
    const columns: TableColumn<EsperaCastracao>[] = useMemo(() => {
        let colunas: TableColumn<EsperaCastracao>[] = []
        colunas.push({ name: 'Nome do Requerente', id: 'nomeRequerente', selector: (row: EsperaCastracao) => row.nomeRequerente, sortField: 'nomeRequerente' })
        colunas.push({ name: 'Tipo do Animal', id: 'tipoAnimal', selector: (row: EsperaCastracao) => formatTipoAnimal(row.tipoAnimal), sortable: true })
        colunas.push({
            name: 'Nome/Porte', id: 'nomeAnimal', cell: (row: EsperaCastracao) => <div className="flex flex-col items-center">
                <span className="font-bold">{row.nomeAnimal}</span>
                <span>{formatPorteAnimal(row.porteAnimal)}</span>
            </div>
        })
        colunas.push({ name: 'Data da Solicitação', id: 'dataSolicitacao', selector: (row: EsperaCastracao) => formatDate(row.dataSolicitacao), sortable: true, sortFunction: orderData })
        colunas.push({ name: 'Pagamento', id: 'formaPagamento', selector: (row: EsperaCastracao) => formatFormaPagamento(row.formaPagamento) })
        colunas.push({ name: 'Faixa de preço', id: 'faixaPreco', cell: (row: EsperaCastracao) => renderPriceRange(row) })
        colunas.push({ name: 'Comprovante de Pagamento', id: 'comprovantePagamento', cell: (row: EsperaCastracao) => renderPaymentReceipt(row) })
        colunas.push({ name: 'Ações', cell: renderAcoes })
        console.log('chamou metodo colunas novamente')
        return colunas
        //}, [setWaitListSelect, orderData, handleRemoveAnimal]); // Dependências do useMemo
        // eslint-disable-next-line
    }, [faixaValores, dataProps]);

    const renderPaymentReceipt = (row: EsperaCastracao) => {
        return <div className="flex items-center space-x-2">
                {row.paga?<><FcOk size={25} /> <span>Pago</span></>:<><FcCancel size={25} /> <span>Não Pago</span></>}
            </div>
    }
    const renderPriceRange = (row: EsperaCastracao) => {
        return (
            <InputCombobox
                id="faixaValorIdx"
                comboboxValues={faixaValores}
                name="faixaValor"
                value={row.idFaixa || 0}
                valueKey="id"
                arrayKey="descricao"
                onChange={(e: any) => atualizarSituacaoFaixaPreco(row.id, e.target.value)}

            />
        )
    }

    const handleSelect = ({ selectedRows }: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: EsperaCastracao[];
    }) => {
        if (handleSelectRows) {
            handleSelectRows(selectedRows)
        }

    }

    const handleFile = (name: string, files: FileList | null) => {
        if (files) {
            setFile({ fileName: files[0].name, file: files[0] })
        }
    }
    const enviarPagamento = () => {
        let headers = {
            'Content-Type': 'multipart/form-data'
        }
        const formData = new FormData();
        if (file?.file && tipoPagamento === 'COMPROVANTE') {
            formData.append("file", file?.file);
        }
        formData.append("dto", new Blob([JSON.stringify(data)], { type: "application/json" }));
        post(`/castration/waitingList/${idWaitList}/payment`, formData, headers, (resp) => {
            openAlertSuccess('Pagamento confirmado com sucesso')
            setShowUploadPagamento(false)
            setIdWaitList(null)
            refresh && refresh()
        })
    }
    const renderModalUploadPagamento = () => {
        return (
            <Modal show={showUploadPagamento} onClose={() => setShowUploadPagamento(false)}>
                <Modal.Header >
                    Alterar situação do pagamento
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <button className={"p-2 border-t border-l border-b border-gray-300 rounded-l-md " + (tipoPagamento === 'CONFIRMAR' ? 'bg-green-500 text-white' : 'bg-gray-100')} onClick={() => setTipoPagamento('CONFIRMAR')}>Apenas Confirmar Pagamento</button>
                            <button className={"p-2 border-t border-r border-b border-gray-300 rounded-r-md " + (tipoPagamento === 'COMPROVANTE' ? 'bg-green-500 text-white' : 'bg-gray-100')} onClick={() => setTipoPagamento('COMPROVANTE')}>Enviar Comprovante</button>
                        </div>

                        {tipoPagamento === 'COMPROVANTE' && <div className="mt-4"><InputFile id="file-upload_pagamento" name="file-upload" label="Anexar Comprovante" value={file} onChange={handleFile} /></div>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full space-x-2 flex justify-end">

                        <Button text="Fechar" onClick={() => setShowUploadPagamento(false)} type="neutral" />
                        <Button text="Confirmar" onClick={enviarPagamento} type="default" />
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <div className="overflow-visible">
            {renderModalUploadPagamento()}
            <WaitListModal show={waitListSelect !== null} handleClose={() => setWaitListSelect(null)} obj={waitListSelect} />
            <DataTable
                title={title}
                columns={columns}
                data={data}
                pagination={false}
                onSelectedRowsChange={handleSelect}
                defaultSortFieldId='dataSolicitacao'
                customStyles={customTableStyle}
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