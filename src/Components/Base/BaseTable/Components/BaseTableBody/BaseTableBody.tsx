import {memo} from "react";
import {TExplicitAny} from "../../../../../Types/TExplicitAny.ts";
import {IBaseTableColumn} from "../../Models/IBaseTableColumn.ts";
import classes from "./BaseTableBody.module.css"

interface IBaseTableBodyProps {
    rows: Record<string, TExplicitAny>[]
    columns: IBaseTableColumn[]
}

const BaseTableBody = memo<IBaseTableBodyProps>(({rows, columns}) => {

    return <tbody>
    {
        rows.map((it, index) =>
            <tr key={index}>
                {
                    columns.map(({dataIndex, render, fixationType, left}, i) =>
                        <td key={i} className={fixationType === "top-left" ? classes.fixationLeft : undefined}
                            style={left ? {left: `${left}px`} : {}}>
                            {render ? render(it[dataIndex]) : it[dataIndex]}
                        </td>)
                }
            </tr>)
    }
    </tbody>
});
BaseTableBody.displayName = "BaseTableBody";

export {BaseTableBody};
