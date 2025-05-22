import { TableColumn } from "../../types/TableColumn"

const Column =<T,> (props:TableColumn<T>)=>{
    return(
        <td></td>
    )
}
Column.displayName = 'Column';
export default Column;