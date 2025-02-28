import { TableColumn, TableStyles } from "react-data-table-component"
import { EsperaCastracao } from "./EsperaCastracao"
import React from "react"

export interface TableWaitingListInterface {
    dataProps?: EsperaCastracao[],
    remote?: boolean
    selectAnimals?: boolean
    handleSelectRows?: (selectedRows: EsperaCastracao[]) => void,
    pagination?: boolean
    handleRemoveAnimal?: (animal: EsperaCastracao) => void,
    customTableStyle?:TableStyles,
    title?:string|React.ReactNode,
    permiteUploadPagamento?:boolean,
    permiteAlterarFaixaPreco?:boolean,
    refresh?:()=>void

}