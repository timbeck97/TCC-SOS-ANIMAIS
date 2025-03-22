import { Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FcFolder, FcInfo } from "react-icons/fc";
import { LuPencil } from "react-icons/lu";
import { TableProps } from "../../types/TableProps";
import { TableColumn } from "../../types/TableColumn";
import { TypesFormatter } from "../../types/TypesFormatter";
import { formatDate, formatFormaPagamento, formatSituacao, formatTipoAnimal } from "../../services/Util";

const formatter: TypesFormatter = {
    tipoAnimal: formatTipoAnimal,
    data: formatDate,
    formaPagamento: formatFormaPagamento,
    situacaoCastracao: formatSituacao
}

export const Table = <T,>({ id, data, children }: TableProps<T>) => {

    const [listData, setListData] = useState<T[]>([])
    useEffect(() => {
        setListData(data)
    }, [data])

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
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {children.map((column: React.ReactElement, colIndex) =>
                                <td key={colIndex} className="px-6 py-1.5 border-b text-sm text-gray-900 text-xs ">
                                    {renderColumn(column, row, rowIndex)}
                                </td>)}
                        </tr>
                    ))}

                </tbody>
            </table>
            
        </div>
    );
};