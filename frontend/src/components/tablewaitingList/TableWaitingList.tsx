import DataTable, { TableColumn } from "react-data-table-component"
import { EsperaCastracao } from "../../types/EsperaCastracao"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableWaitingListInterface } from "../../types/TableWaitingListInterface"
import { formatDate, formatFormaPagamento, formatPorteAnimal, formatTipoAnimal } from "../../services/Util"
import { WaitListModal } from "../WaitListModal/WaitListModal"
import { FcCancel, FcFolder, FcInfo, FcOk } from "react-icons/fc"
import { get, post } from "../../services/Axios"
import { Modal } from "flowbite-react"
import { InputFile } from "../input/InputFile"
import { Button } from "../button/Button"
import { openAlertSuccess } from "../../services/Alert"
import { FaTrashAlt } from "react-icons/fa"




export const TableWaitingList = ({ handleSelectRows, selectAnimals = false,
    pagination = true,
    dataProps,
    remote = true,
    handleRemoveAnimal,
    customTableStyle,
    title,
    permiteUploadPagamento,
    refresh
}: TableWaitingListInterface) => {

    const [data, setData] = useState<EsperaCastracao[]>([])
    const [waitListSelect, setWaitListSelect] = useState<EsperaCastracao | null>(null)
    const [idWaitList, setIdWaitList] = useState<number | null>(null)
    const [file, setFile] = useState<{ fileName: string, file: File } | null>(null)
    const [showUploadPagamento, setShowUploadPagamento] = useState(false)

    useEffect(() => {
        console.log('chamou dataprops: ', dataProps);
        if (dataProps) {
            setData(dataProps)
        }
        if (!dataProps && remote) {
            get<EsperaCastracao[]>('/castration/waitingList', {}, {}, (response) => {
                setData(response)
            })
        }
    }, [dataProps, remote])

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
    const columns: TableColumn<EsperaCastracao>[] = useMemo(() => {
        let colunas: TableColumn<EsperaCastracao>[] = []
        colunas.push({ name: 'Nome do Requerente', id: 'nomeRequerente', selector: (row: EsperaCastracao) => row.nomeRequerente, sortField: 'nomeRequerente' })
        colunas.push({ name: 'Tipo do Animal', id: 'tipoAnimal', selector: (row: EsperaCastracao) => formatTipoAnimal(row.tipoAnimal), sortable: true })
        colunas.push({ name: 'Nome do Animal', id: 'nomeAnimal', selector: (row: EsperaCastracao) => row.nomeAnimal })
        colunas.push({ name: 'Porte do Animal', id: 'porteAnimal', selector: (row: EsperaCastracao) => formatPorteAnimal(row.porteAnimal), sortable: true })
        colunas.push({ name: 'Data da Solicitação', id: 'dataSolicitacao', selector: (row: EsperaCastracao) => formatDate(row.dataSolicitacao), sortable: true, sortFunction: orderData })
        colunas.push({ name: 'Pagamento', id: 'formaPagamento', selector: (row: EsperaCastracao) => formatFormaPagamento(row.formaPagamento) })
        if(permiteUploadPagamento){
            colunas.push({ name: 'Comprovante de Pagamento', id: 'comprovantePagamento', cell: (row:EsperaCastracao)=>renderPaymentReceipt(row) })
        }
        colunas.push( {
            name: 'Ações', cell: (row: EsperaCastracao) => (
                <div>
                    <button type="button" onClick={() => setWaitListSelect(row)}>
                        <FcInfo title="Abri detalhes da solicitação" size={30} />
                    </button>
                    {handleRemoveAnimal && <button type="button" onClick={() => handleRemoveAnimal(row)}>
                    
                        <FaTrashAlt title="Remover animal da lista de castração" size={30} color="red"/>
                    </button>}
                    {permiteUploadPagamento && <button type="button" onClick={() => {
                        setShowUploadPagamento(true)
                        setIdWaitList(row.id)
                    }}>
                        <FcFolder title="Enviar comporvante de pagamento" size={30} />
                    </button>}
                </div>
            )
        })
        return colunas
    }, [setWaitListSelect, orderData]); // Dependências do useMemo
    const renderPaymentReceipt = (row: EsperaCastracao) => {
        if (row.urlComprovante) {
            return <a href={row.urlComprovante} target="_blank" rel="noreferrer" className="flex items-center space-x-2">
                <FcOk size={25} /> <span>Pago</span>
            </a>
        } else {
            return <div className="flex items-center space-x-2">
                <FcCancel size={25} /> <span>Não Pago</span>
            </div>
        }
    }
    const handleSelect = useCallback(({ selectedRows }: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: EsperaCastracao[];
    }) => {
        if (handleSelectRows) {
            handleSelectRows(selectedRows)
        }

    }, [handleSelectRows])

    const rowSelectCritera = useCallback((row: EsperaCastracao) => {
        return row.selected === true
    }, [])
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
        if (file?.file) {
            formData.append("file", file?.file);
        }
        formData.append("dto", new Blob([JSON.stringify(data)], { type: "application/json" }));
        post(`/castration/waitingList/${idWaitList}/paymentReceipt`, formData, headers, (resp) => {
            openAlertSuccess('Comprovante de pagamento enviado com sucesso')
            setShowUploadPagamento(false)
            setIdWaitList(null)
            refresh && refresh()
        })
    }
    const renderModalUploadPagamento = () => {
        return (
            <Modal show={showUploadPagamento}  onClose={()=>setShowUploadPagamento(false)}>
                <Modal.Header >
                    Enviar Comprovante de Pagamento
                </Modal.Header>
                <Modal.Body>
                    <div>
                    <InputFile id="file-upload_pagamento" name="file-upload" label="Anexar Comprovante"  value={file} onChange={handleFile} />

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full space-x-2 flex justify-end">

                        <Button text="Fechar"  onClick={() => setShowUploadPagamento(false)} type="neutral" />
                        <Button text="Enviar"  onClick={enviarPagamento} type="default" />
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <div>
            {renderModalUploadPagamento()}
            <WaitListModal show={waitListSelect !== null} handleClose={() => setWaitListSelect(null)} obj={waitListSelect} />
            <DataTable
                title={title}
                columns={columns}
                data={data}
                pagination={pagination}
                selectableRows={selectAnimals}
                onSelectedRowsChange={handleSelect}
                defaultSortFieldId='dataSolicitacao'
                customStyles={customTableStyle}
                selectableRowSelected={rowSelectCritera}
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