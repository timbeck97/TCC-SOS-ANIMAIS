import { EsperaCastracao } from "../../types/EsperaCastracao"
import { useEffect, useState } from "react"
import { TableWaitingListInterface } from "../../types/TableWaitingListInterface"
import { formatPorteAnimal, formatTipoAnimal, isEmpty } from "../../services/Util"
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
import { LuPencil } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { useDevice } from "../../context/DeviceContext"
import { CardAnimal } from "../cards/CardAnimal"
import { CardEsperaCastracao } from "../../types/CardEsperaCastracao"
import { CardButton } from "../../types/CardButton"
import { Subtitle } from "../title/Subtitle"
import { Table } from "../table/Table"
import { Column } from "../table/Column"




export const CastrationAnimals = ({ dataProps,
    handleRemoveAnimal,
    refresh,
}: TableWaitingListInterface) => {

    const [data, setData] = useState<EsperaCastracao[]>([])
    const [waitListSelect, setWaitListSelect] = useState<EsperaCastracao | null>(null)
    const [idWaitList, setIdWaitList] = useState<number | null>(null)
    const [file, setFile] = useState<{ fileName: string, file: File } | null>(null)
    const [showUploadPagamento, setShowUploadPagamento] = useState(false)
    const [faixaValores, setFaixaValores] = useState<FaixaValor[]>([{ descricao: 'Não Informado', valor: '0' }])
    const [tipoPagamento, setTipoPagamento] = useState<'CONFIRMAR' | 'COMPROVANTE'>('CONFIRMAR')
    const { isMobile } = useDevice();
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
   
  
    const getFaixasPreco = async () => {
        let response = await request<FaixaValor[]>('get', '/faixapreco')
        let data = response || []
        data.unshift({ id: 0, descricao: 'Não Informado', valor: '0' })
        setFaixaValores(data)
    }
    const renderAcoes = (row: any) => {
        return (
            <div className="">
                <Dropdown
                    placement="top"
                    inline
                    id={row.id}
                    itemID={row.id}

                    className="mt-3 w-100"
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
                    <Dropdown.Item icon={FcFolder} className="w-40" onClick={() => {
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


    const renderPaymentReceipt = (row: EsperaCastracao) => {
        if(row.formaPagamento==='CASTRACAO_SOLIDARIA'){
            return(
                <div className="flex justify-center items-center gap-x-2">
                    <span className="text-md">Isento</span>
                </div>
            )
        }
        return <div className="flex items-center space-x-2 justify-center">
            {row.paga ? <><FcOk size={25} /> <span>Pago</span></> : <><FcCancel size={25} /> <span>Não Pago</span></>}
        </div>
    }
    const renderPriceRange = (row: EsperaCastracao) => {
        return (
            <InputCombobox
                id="faixaValorIdx"
                comboboxValues={faixaValores}
                name="faixaValor"
                className="text-xs"
                value={row.idFaixa || 0}
                valueKey="id"
                arrayKey="descricao"
                onChange={(e: any) => atualizarSituacaoFaixaPreco(row.id, e.target.value)}

            />
        )
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


    const handleFile = (name: string, files: FileList | null) => {
        if (files) {
            setFile({ fileName: files[0].name, file: files[0] })
        }
    }
   
    const buttonsOptionsCard = (): CardButton[] => {
        let buttons: CardButton[] = []
        buttons.push({
            buttonType: 'button', icon: <FcFolder />, text: 'Pagamento', type: 'neutral', onClick: (row: CardEsperaCastracao) => {
                setShowUploadPagamento(true)
                setIdWaitList(row.id)
            }
        })
        buttons.push({ buttonType: 'button', icon: <FaDownload />, text: 'Download Comprovante', isRender: (row: CardEsperaCastracao) => !isEmpty(row.urlComprovante), type: 'neutral', onClick: (row: CardEsperaCastracao) => window.open(row.urlComprovante, "_target") })

        buttons.push({ buttonType: 'button', icon: <FaEdit />, text: 'Editar', type: 'neutral', onClick: (row: CardEsperaCastracao) => navigate('/gerenciar/filaEspera/' + row.id) })
        buttons.push({ buttonType: 'button', icon: <FaTrashAlt />, text: 'Remover', type: 'neutral', onClick: handleRemoveAnimal ? (row: CardEsperaCastracao) => handleRemoveAnimal(row) : undefined })

        return buttons
    }
    const renderModalUploadPagamento = () => {
        return (
            <Modal show={showUploadPagamento} onClose={() => setShowUploadPagamento(false)}>
                <Modal.Header >
                    <Subtitle text="Alterar situação do pagamento" />
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <button className={"p-2 border-t border-l border-b border-gray-300 rounded-l-md md:text-md text-sm " + (tipoPagamento === 'CONFIRMAR' ? 'bg-green-500 text-white' : 'bg-gray-100')} onClick={() => setTipoPagamento('CONFIRMAR')}>Apenas Confirmar Pagamento</button>
                            <button className={"p-2 border-t border-r border-b border-gray-300 rounded-r-md md:text-md text-sm " + (tipoPagamento === 'COMPROVANTE' ? 'bg-green-500 text-white' : 'bg-gray-100')} onClick={() => setTipoPagamento('COMPROVANTE')}>Enviar Comprovante</button>
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
            {isMobile ? <div className="mt-6">
                {data.map(x => <CardAnimal castracao={x} options={buttonsOptionsCard()} />)}
            </div>
                :
                <Table id='tableAnimaisIdx' data={data}>
                    <Column field="nomeRequerente" align="center" label="Nome do Requerente" />
                    <Column label="Animal" align="center" component={(idx, row: EsperaCastracao) => renderDadosAnimal(row)} />
                    <Column field="dataSolicitacao" align="center" label="Data da Solicitação" format="data" />
                    <Column field="formaPagamento" align="center" label="Forma de Pagamento" format="formaPagamento" />
                    <Column label="Faixa de preço" align="center" component={(idx, row: EsperaCastracao) => renderPriceRange(row)} />
                    <Column label="Comprovante de pagamento" align="center" component={(idx, row: EsperaCastracao) => renderPaymentReceipt(row)} />
                    <Column label="Ações" component={(idx, row: EsperaCastracao) => renderAcoes(row)} />

                </Table>
            }

        </div>
    )
}