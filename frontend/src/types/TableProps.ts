import { TableColumn } from "./TableColumn";

export interface TableProps<T> {
    id: string,
    data: T[],
    children: React.ReactElement<TableColumn<T>>[],
    enablePagination?:boolean,
    onRowClick?:(row:T)=>void,
    columnsRowClick?:number[]
}