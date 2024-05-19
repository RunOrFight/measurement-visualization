import {memo, useState} from "react";
import {ArrowDownIconSvg} from "../../../../Icons/ArrowDownIconSvg.tsx";
import {TBaseTableColumnSorter} from "../../Models/IBaseTableColumn.ts";
import {TBaseTableHandleSort} from "../../Models/TBaseTableHandle.ts";
import {ESortDirection} from "../../../../../Enums/ESortDirection.ts";

interface IBaseTableSortButtonProps {
    sorter: TBaseTableColumnSorter,
    handleSort: TBaseTableHandleSort
}

const BaseTableSortButton = memo<IBaseTableSortButtonProps>(({handleSort, sorter}) => {
    const [sortDirection, setSortDirection] = useState(ESortDirection.ASCENDING)


    const onClick = () => {
        const sort: TBaseTableColumnSorter = (a, b) => {
            const sortResult = sorter(a, b)
            return sortDirection === ESortDirection.ASCENDING ? sortResult : sortResult * -1
        }

        handleSort(sort)

        setSortDirection(sortDirection === ESortDirection.ASCENDING ? ESortDirection.DESCENDING : ESortDirection.ASCENDING)
    }

    return <span onClick={onClick}>
                            <ArrowDownIconSvg/>
                                </span>
});
BaseTableSortButton.displayName = "BaseTableSortButton";

export {BaseTableSortButton};
