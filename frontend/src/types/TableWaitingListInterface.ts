import { EsperaCastracao } from "./EsperaCastracao"

export interface TableWaitingListInterface {
    dataProps?: EsperaCastracao[]
    selectAnimals?: boolean
    handleSelectRows?: (selectedRows: EsperaCastracao[]) => void,
    pagination?: boolean
}