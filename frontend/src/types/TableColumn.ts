import { TypesFormatter } from "./TypesFormatter"

export interface TableColumn <T>{
    label: string
    field?: keyof T
    component?:(rowIndex:number,row:T)=>React.ReactElement
    format?:keyof TypesFormatter
}