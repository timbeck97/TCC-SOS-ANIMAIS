import DataTable, { TableColumn } from "react-data-table-component"
import { EsperaCastracao } from "../../types/EsperaCastracao"
import { useCallback, useEffect, useState } from "react"
import { TableWaitingListInterface } from "../../types/TableWaitingListInterface"
import { parseDate } from "../../services/Util"
import { MOCK_FILA_ESPERA } from "../../services/Constantes"
import { ExpandableRowsComponent } from "react-data-table-component/dist/DataTable/types"
import { WaitListModal } from "../WaitListModal/WaitListModal"
import { FcInfo } from "react-icons/fc"




export const TableWaitingList = ({handleSelectRows, selectAnimals=false, pagination=true, dataProps}:TableWaitingListInterface) => {

    const [data, setData] = useState<EsperaCastracao[]>([])
    const [showWaitListDetail, setShowWaitListDetail] = useState(false)

    useEffect(() => {
        setData(MOCK_FILA_ESPERA)
    }, [])
    useEffect(()=>{
        if(dataProps){
            setData(dataProps)
        }
    },[dataProps])

      const orderData = useCallback((a:EsperaCastracao, b:EsperaCastracao)=>{
        const dateA = parseDate(a.dataSolicitacao)
        const dateB = parseDate(b.dataSolicitacao)
        
        if(dateA > dateB){
            return 1
        }
        if(dateA < dateB){
            return -1
        }
        return 0
    },[])
    const columns: TableColumn<EsperaCastracao>[] = [
        { name: 'Nome do Requerente',id:'nomeRequerente',  selector: (row: EsperaCastracao) => row.nomeRequerente, sortField: 'nomeRequerente', },
        { name: 'Tipo do Animal', id:'tipoAnimal', selector: (row: EsperaCastracao) => row.tipoAnimal, sortable: true },
        { name: 'Nome do Animal',id:'nomeAnimal', selector: (row: EsperaCastracao) => row.nomeAnimal },
        { name: 'Porte do Animal', id:'porteAnimal', selector: (row: EsperaCastracao) => row.porteAnimal, sortable: true },
        { name: 'Data da Solicitação', id:'dataSolicitacao', selector: (row: EsperaCastracao) => row.dataSolicitacao, sortable: true, sortFunction: orderData},
        { name: 'Ações', cell: (row: EsperaCastracao) => <button type="button" onClick={()=>setShowWaitListDetail(true)}><FcInfo title="Abri detalhes da solicitação" size={30} /></button> }
    ]
    
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
        return row.selected==true
    },[])

    return (
        <div>
     
            <WaitListModal show={showWaitListDetail} handleClose={()=>setShowWaitListDetail(false)}/>
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