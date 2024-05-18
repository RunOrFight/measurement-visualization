import {FC, MouseEventHandler, useState} from "react";
import {createBaseTableColumnsMapRecursive} from "./Utils/CreateBaseTableColumnsMapRecursive.ts";
import {IBaseTableColumn} from "./Models/IBaseTableColumn.ts";
import {ESortDirection} from "../../../Enums/ESortDirection.ts";

interface IBaseTableProps {
    dataSource: Record<string, unknown>[]
    columns: IBaseTableColumn[]
}

const BaseTable: FC<IBaseTableProps> = ({columns, dataSource}) => {
    const [stateData, setStateData] = useState(dataSource)
    const [sortDirection, setSortDirection] = useState(ESortDirection.ASCENDING)

    const columnsToRender = Object.values(createBaseTableColumnsMapRecursive(columns))

    const columnsWithChildren = columnsToRender.flat().filter((it) => !it.hasChildren)

    const handleClick = (sorter: IBaseTableColumn["sorter"]): MouseEventHandler<HTMLTableHeaderCellElement> =>
        (event) => {
            if (sorter) {

                setStateData([...stateData].sort((a, b) => {
                    const sortResult = sorter(a, b)
                    return sortDirection === ESortDirection.ASCENDING ? sortResult : sortResult * -1
                }))

                setSortDirection(sortDirection === ESortDirection.ASCENDING ? ESortDirection.DESCENDING : ESortDirection.ASCENDING)
            }
        }

    return <table>
        <thead>
        {columnsToRender.map((ths, rowIndex, array) => {
            return <tr key={rowIndex}>
                {ths.map(({title, hasChildren, key, sorter}, index) =>
                    <th key={key ?? index} onClick={handleClick(sorter)}
                        rowSpan={hasChildren ? 1 : array.length - rowIndex}>{title}</th>)}
            </tr>
        })}
        </thead>

        <tbody>
        {stateData.map((it, index) => <tr key={index}>
            {columnsWithChildren.map(({dataIndex, key, render}) => <td key={it[key]}>
                {render ? render(it[dataIndex]) : it[dataIndex]}
            </td>)}
        </tr>)}
        </tbody>
    </table>
}
BaseTable.displayName = "BaseTable"

export {BaseTable}
