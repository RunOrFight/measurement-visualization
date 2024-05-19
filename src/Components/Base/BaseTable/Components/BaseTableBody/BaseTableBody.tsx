import {memo} from "react";
import {TExplicitAny} from "../../../../../Types/TExplicitAny.ts";
import {IBaseTableColumnEntity} from "../../Models/IBaseTableColumn.ts";
import classes from "./BaseTableBody.module.css"

interface IBaseTableBodyProps {
    rows: Record<string, TExplicitAny>[]
    columns: IBaseTableColumnEntity[][]
}

const BaseTableBody = memo<IBaseTableBodyProps>(({rows, columns}) => {
    if (rows.length === 0) {
        return <tbody>
        <tr>
            <td colSpan={columns.length}>{"Нет данных"}</td>
        </tr>
        </tbody>
    }

    return <tbody>
    {
        rows.map((it, index) => (
            <tr key={index}>
                {
                    columns.map((cells) =>
                        cells.map(({dataIndex, render, fixationType, left, numberOfChildren}, i) => {
                            if (numberOfChildren > 0) {
                                return null
                            }

                            return (
                                <td key={i} className={fixationType === "top-left" ? classes.fixationLeft : undefined}
                                    style={left ? {left: `${left}px`} : {}}>
                                    {render ? render(it[dataIndex]) : it[dataIndex]}
                                </td>
                            )
                        }))
                }
            </tr>
        ))
    }
    </tbody>
});
BaseTableBody.displayName = "BaseTableBody";

export {BaseTableBody};
