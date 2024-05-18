import {FC} from "react";
import {createBaseTableColumnsMapRecursive} from "./Utils/CreateBaseTableColumnsMapRecursive.ts";
import {IBaseTableColumn} from "./Models/IBaseTableColumn.ts";

interface IBaseTableProps {
    dataSource: Record<string, unknown>[]
    columns: IBaseTableColumn[]
}

const BaseTable: FC<IBaseTableProps> = ({columns, dataSource}) => {
    const columnsToRender = Object.values(createBaseTableColumnsMapRecursive(columns))

    const columnsWithChildren = columnsToRender.flat().filter((it) => !it.hasChildren)

    return <table>
        <thead>
        {columnsToRender.map((ths, rowIndex, array) => {
            return <tr key={rowIndex}>
                {ths.map(({title, hasChildren, key}, index) =>
                    <th key={key ?? index} rowSpan={hasChildren ? 1 : array.length - rowIndex}>{title}</th>)}
            </tr>
        })}
        </thead>

        <tbody>
        {dataSource.map((it, index) => <tr key={index}>
            {columnsWithChildren.map(({dataIndex, key, render}) => <td key={it[key]}>
                {render ? render(it[dataIndex]) : it[dataIndex]}
            </td>)}
        </tr>)}
        </tbody>
    </table>
}
BaseTable.displayName = "BaseTable"

export {BaseTable}
