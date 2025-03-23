import React, { useEffect, useState } from "react";
import { TableProps } from "../../types/TableProps";
import { TableColumn } from "../../types/TableColumn";
import { TypesFormatter } from "../../types/TypesFormatter";
import { formatDate, formatDateWithHour, formatFormaPagamento, formatSituacao, formatTipoAnimal } from "../../services/Util";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Pagination } from "../../types/Pagination";

const formatter: TypesFormatter = {
    tipoAnimal: formatTipoAnimal,
    data: formatDate,
    dataHora:formatDateWithHour,
    formaPagamento: formatFormaPagamento,
    situacaoCastracao: formatSituacao
}

export const Table = <T,>({ id, data, children, enablePagination = false, onRowClick, columnsRowClick }: TableProps<T>) => {
    const [originalData, setOriginalData] = useState<T[]>([])
    const [listData, setListData] = useState<T[]>([])
    const [pagination, setPagination] = useState<Pagination>({ pageNumber: 1, pageSize: 10, totalPages: 1 })
    useEffect(() => {
        if (enablePagination) {
            setOriginalData(data)
            initPaginationConfig(data)
        } else {
            setListData(data)
        }
        
    }, [data, enablePagination])

    const renderColumn = <T,>(column: React.ReactElement<TableColumn<T>>, row: any, rowIndex: number) => {
        if (column.props.component) {
            return column.props.component(rowIndex, row);
        } else {
            if (column.props.field) {
                if (column.props.format) {
                    return formatter[column.props.format as keyof TypesFormatter](row[column.props.field])
                } else {
                    return row[column.props.field]
                }
            } else {
                return ''
            }

        }
    }
    const initPaginationConfig = (data: any[]) => {
        let total = data.length;
        let pages = Math.ceil(total / pagination.pageSize);
        setPagination({ ...pagination, totalPages: pages })
        console.log(data)
        setListData(data.slice(0, (pagination.pageSize + 1)))

    }
    const handleChangePagination = (page: number) => {
        setPagination({ ...pagination, pageNumber: page });
        let start = pagination.pageSize * (page - 1);
        let end = start + pagination.pageSize;
        console.log(originalData)
        let sliced = originalData.slice(start, end);
        console.log(sliced)
        setListData(originalData.slice(start, end))
    }
    const handleRowClick = (row:T, c:number)=>{
        if(onRowClick){
            if(columnsRowClick){
                if(columnsRowClick.includes(c)){
                    onRowClick(row)
                }
            }else{
                onRowClick(row)
            }
        }
    }
    return (
        <div className="overflow-x-auto">
            <table id={id} className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        {children.map((column: React.ReactElement, index) => (
                            <th key={index} className="px-6 py-3 border-b text-left text-xs  text-gray-700 poppins-semibold">
                                {column.props.label}
                            </th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {listData.map((row, rowIndex) => (
                        <tr key={rowIndex} className={`hover:bg-gray-50 ${onRowClick?'cursor-pointer':''}`} >
                            {children.map((column: React.ReactElement, colIndex) =>
                                <td key={colIndex} className="px-6 py-1.5 border-b text-sm text-gray-900 text-xs " onClick={()=>handleRowClick(row, colIndex)}>
                                    {renderColumn(column, row, rowIndex)}
                                </td>)}
                        </tr>
                    ))}

                </tbody>
            </table>
            {enablePagination && <div className="flex justify-end">
                <div className="flex items-center">
                    <span className="px-3 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleChangePagination(1)}>
                        <MdKeyboardDoubleArrowLeft size={18} />
                    </span>
                    {Array.apply(null, Array(pagination.totalPages)).map((x, y) => y + 1).map(x => (
                        <span className={`py-2 px-5  poppins-regular hover:bg-gray-200 cursor-pointer ${pagination.pageNumber === x ? 'bg-gray-300' : ''}`} onClick={() => handleChangePagination(x)}>{x}</span>
                    ))}
                    <span className="px-3 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleChangePagination(pagination.totalPages)} >
                        <MdKeyboardDoubleArrowRight />
                    </span>
                </div>
            </div>}

        </div>
    );
};