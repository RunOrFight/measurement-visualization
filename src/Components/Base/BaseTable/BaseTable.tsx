import {FC, ReactNode, useCallback, useMemo, useState} from "react";
import {createBaseTableColumnsMapRecursive} from "./Utils/CreateBaseTableColumnsMapRecursive.ts";
import {IBaseTableColumn, IBaseTableColumnEntity, TBaseTableColumnSorter} from "./Models/IBaseTableColumn.ts";
import classes from "./BaseTable.module.css"
import {BaseTableHead} from "./Components/BaseTableHead/BaseTableHead.tsx";
import {TBaseTableHandleFilter, TBaseTableHandleSort} from "./Models/TBaseTableHandle.ts";
import {TExplicitAny} from "../../../Types/TExplicitAny.ts";
import {BaseTableBody} from "./Components/BaseTableBody/BaseTableBody.tsx";

interface IBaseTableProps {
    dataSource: Record<string, TExplicitAny>[]
    columns: IBaseTableColumn[]
    caption?: ReactNode
}

const BaseTable: FC<IBaseTableProps> = ({columns, dataSource, caption}) => {
    const [stateData, setStateData] = useState(dataSource)
    const [columnsToUse, setColumnsToUse] = useState<IBaseTableColumnEntity[][]>([])

    const columnsToRender = useMemo(() => Object.values(createBaseTableColumnsMapRecursive(columns)), [columns])

    const handleSort: TBaseTableHandleSort = useCallback((sorter: TBaseTableColumnSorter) => {
        setStateData((data) => [...data].sort(sorter))
    }, [setStateData])

    const handleFilter: TBaseTableHandleFilter = useCallback((filter) => {
        setStateData(dataSource.filter(filter))
    }, [dataSource, setStateData])

    return <table className={classes.baseTable}>
        {caption ? <caption>{caption}</caption> : null}

        <BaseTableHead
            columnsToRender={columnsToRender}
            handleSort={handleSort}
            handleFilter={handleFilter}
            setColumnsToUse={setColumnsToUse}
        />

        {columnsToUse.length === 0 ? null : <BaseTableBody rows={stateData} columns={columnsToUse}/>}
    </table>
}
BaseTable.displayName = "BaseTable"

export {BaseTable}
