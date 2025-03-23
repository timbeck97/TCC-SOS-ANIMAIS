import { TableColumn } from "./TableColumn";
import { TableData } from "./TableData";

export interface TableProps<T> {
    id: string,
    data: TableData<T>[],
    children: React.ReactElement<TableColumn<T>>[],
    enablePagination?:boolean,
    onRowClick?:(row:TableData<T>)=>void,
    columnsRowClick?:number[],
    selectable?:boolean,
    onSelectRow?:(rows:T[])=>void
}