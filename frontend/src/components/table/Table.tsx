import React, { useEffect, useState } from "react";
import { TableProps } from "../../types/TableProps";
import { TableColumn } from "../../types/TableColumn";
import { TypesFormatter } from "../../types/TypesFormatter";
import { formatDate, formatDateWithHour, formatFormaPagamento, formatPorteAnimal, formatSituacao, formatTipoAnimal, formatValorMoeda } from "../../services/Util";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Pagination } from "../../types/Pagination";
import { TableData } from "../../types/TableData";

const formatter: TypesFormatter = {
    tipoAnimal: formatTipoAnimal,
    porteAnimal: formatPorteAnimal,
    data: formatDate,
    dataHora: formatDateWithHour,
    formaPagamento: formatFormaPagamento,
    situacaoCastracao: formatSituacao,
    moeda:(value)=>formatValorMoeda(parseFloat(value), false),
    moedaCifrao:(value)=>formatValorMoeda(parseFloat(value), true),
    boolean:(value)=> Boolean(value)===true?'Sim':'Não'
}

const Table = <T,>({ id, data, children, enablePagination = false, onRowClick, columnsRowClick, selectable, onSelectRow }: TableProps<T>) => {
    const [originalData, setOriginalData] = useState<TableData<T>[]>([])
    const [listData, setListData] = useState<TableData<T>[]>([])
    const [pagination, setPagination] = useState<Pagination>({ pageNumber: 1, pageSize: 10, totalPages: 1 })
    useEffect(() => {
        if (enablePagination) {
            setOriginalData(data)
            initPaginationConfig(data)
        } else {
            setListData(data)
        }

        // eslint-disable-next-line
    }, [data, enablePagination])
    useEffect(() => {
        if (onSelectRow) {
            onSelectRow(originalData.filter(d => d.selected).map(x => ({ ...x } as T)))
        }
     // eslint-disable-next-line
    },[listData])
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
        setListData(data.slice(0, (pagination.pageSize)))

    }
    const handleChangePagination = (page: number) => {
        setPagination({ ...pagination, pageNumber: page });
        let start = pagination.pageSize * (page - 1);
        let end = start + pagination.pageSize;
        setListData(originalData.slice(start, end))
    }
    const handleRowClick = (row: TableData<T>, c: number) => {
        if (onRowClick) {
            if (columnsRowClick) {
                if (columnsRowClick.includes(c)) {
                    onRowClick(row)
                }
            } else {
                onRowClick(row)
            }
        }
    }
    const isChecked = (rowIndex: number | undefined): boolean => {
        return rowIndex !== undefined ? listData[rowIndex].selected || false : listData.every(d => d.selected === true);
    }
    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number | string) => {
        let value = e.target.checked;
        setListData((prev) => {
            let newData = setListChecked(prev, rowIndex, value)
            return newData
        })
        setOriginalData((prev) => {
            if(rowIndex !== 'all'){
                rowIndex = Number(rowIndex)
                rowIndex = rowIndex + (pagination.pageSize * (pagination.pageNumber - 1))
            }
            let newData = setListChecked(prev, rowIndex, value)
            return newData
        })

    }
    const setListChecked = (prev:TableData<T>[],  rowIndex: number | string, value:boolean)=>{
        return prev.map((data, idx) => {
            if (rowIndex === 'all') {
                return { ...data, selected: value }
            } else {
                if (rowIndex === idx) {
                    return { ...data, selected: value }
                } else {
                    return data
                }
            }
        })
    }
    return (
        <div className="overflow-x-auto flex flex-col flex-1">
            <table id={id} className="min-w-full table-auto border-collapse border border-gray-200 shadow-sm">
                <thead>
                    <tr className="bg-indigo-500">
                        {selectable && <th className="px-6 py-3 border-b text-left text-xs  text-gray-700 poppins-semibold">
                            <input type="checkbox" checked={isChecked(undefined)} onChange={e => handleCheckbox(e, 'all')} />
                        </th>}
                        {children.map((column: React.ReactElement, index) => (
                            <th key={index} className={`px-6 py-3 border-b text-left text-xs  text-white poppins-semibold ${column.props.align?'text-'+column.props.align:''}`}>
                                {column.props.label}
                            </th>
                        ))}


                    </tr>
                </thead>
                <tbody>

                    {listData.map((row, rowIndex) => (
                        <tr key={rowIndex} className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`} >
                            {selectable && <td className="px-6 py-1.5 border-b text-sm text-gray-900 text-xs">
                                <input type="checkbox" checked={isChecked(rowIndex)} onChange={e => handleCheckbox(e, rowIndex)} />
                            </td>}
                            {children.map((column: React.ReactElement<TableColumn<T>>, colIndex) =>
                                <td key={colIndex} className={`px-2 py-1.5 border-b text-sm text-gray-900 text-xs ${column.props.align?'text-'+column.props.align:''}`} onClick={() => handleRowClick(row, colIndex)}>
                                    {renderColumn(column, row, rowIndex)}
                                </td>)}
                        </tr>
                    ))}
                    {listData.length===0 && <tr><td className="text-center text-gray-600" colSpan={children.length}>Nenhum registro</td></tr>}
                </tbody>
            </table>
            {enablePagination && <div className="flex justify-end">
                <div className="flex items-center">
                    <span className="px-3 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleChangePagination(1)}>
                        <MdKeyboardDoubleArrowLeft size={18} />
                    </span>
                    {Array.apply(null, Array(pagination.totalPages)).map((x, y) => y + 1).map((x, idx) => (
                        <span key={idx} className={`py-2 px-5  poppins-regular hover:bg-gray-200 cursor-pointer ${pagination.pageNumber === x ? 'bg-gray-300' : ''}`} onClick={() => handleChangePagination(x)}>{x}</span>
                    ))}
                    <span className="px-3 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleChangePagination(pagination.totalPages)} >
                        <MdKeyboardDoubleArrowRight />
                    </span>
                </div>
            </div>}

        </div>
    );
};
Table.displayName = 'Table';
export default Table;