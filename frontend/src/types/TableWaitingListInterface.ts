import { EsperaCastracao } from "./EsperaCastracao"

export interface TableWaitingListInterface {
    dataProps?: EsperaCastracao[],
    remote?: boolean
    selectAnimals?: boolean
    handleSelectRows?: (selectedRows: EsperaCastracao[]) => void,
    pagination?: boolean
}