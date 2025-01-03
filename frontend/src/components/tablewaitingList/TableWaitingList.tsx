import DataTable, { TableColumn } from "react-data-table-component"
import { EsperaCastracao } from "../../types/EsperaCastracao"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableWaitingListInterface } from "../../types/TableWaitingListInterface"
import { formatDate, formatPorteAnimal, formatTipoAnimal} from "../../services/Util"
import { WaitListModal } from "../WaitListModal/WaitListModal"
import { FcInfo } from "react-icons/fc"
import { get } from "../../services/Axios"




export const TableWaitingList = ({handleSelectRows, selectAnimals=false, pagination=true, dataProps,remote=true}:TableWaitingListInterface) => {

    const [data, setData] = useState<EsperaCastracao[]>([])
    const [waitListSelect, setWaitListSelect] = useState<EsperaCastracao | null>(null)

  
    useEffect(()=>{
        console.log('chamou dataprops: ',dataProps);
        if(dataProps){
            setData(dataProps)
        }
        if(!dataProps && remote){
            get<EsperaCastracao[]>('/castration/waitingList',{},{},(response) => {
                setData(response)
            })
        }
    },[dataProps, remote])

      const orderData = useCallback((a:EsperaCastracao, b:EsperaCastracao)=>{
        const dateA = a.dataSolicitacao
        const dateB = b.dataSolicitacao
    
        if(dateA > dateB){
            return 1
        }
        if(dateA < dateB){
            return -1
        }
        return 0
    },[])
    const columns: TableColumn<EsperaCastracao>[] = useMemo(() => [
        { name: 'Nome do Requerente', id: 'nomeRequerente', selector: (row: EsperaCastracao) => row.nomeRequerente, sortField: 'nomeRequerente' },
        { name: 'Tipo do Animal', id: 'tipoAnimal', selector: (row: EsperaCastracao) => formatTipoAnimal(row.tipoAnimal), sortable: true },
        { name: 'Nome do Animal', id: 'nomeAnimal', selector: (row: EsperaCastracao) => row.nomeAnimal },
        { name: 'Porte do Animal', id: 'porteAnimal', selector: (row: EsperaCastracao) => formatPorteAnimal(row.porteAnimal), sortable: true },
        { name: 'Data da Solicitação', id: 'dataSolicitacao', selector: (row: EsperaCastracao) => formatDate(row.dataSolicitacao), sortable: true, sortFunction: orderData },
        { name: 'Ações', cell: (row: EsperaCastracao) => (
            <button type="button" onClick={() => setWaitListSelect(row)}>
                <FcInfo title="Abri detalhes da solicitação" size={30} />
            </button>
        )}
    ], [setWaitListSelect, orderData]); // Dependências do useMemo
    
    const handleSelect = useCallback(({selectedRows}: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: EsperaCastracao[];
    }) => {
        if(handleSelectRows){
            handleSelectRows(selectedRows)
        }
        
    } ,[handleSelectRows])

    const rowSelectCritera =useCallback( (row: EsperaCastracao) => {
        return row.selected===true
    },[])

    return (
        <div>
     
            <WaitListModal show={waitListSelect!==null} handleClose={()=>setWaitListSelect(null)} obj={waitListSelect}/>
            <DataTable
                columns={columns}
                data={data}
                pagination={pagination}
                selectableRows={selectAnimals}
                onSelectedRowsChange={handleSelect}
                defaultSortFieldId='dataSolicitacao'
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