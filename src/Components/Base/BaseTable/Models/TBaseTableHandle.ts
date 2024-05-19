import {TBaseTableColumnFilter, TBaseTableColumnSorter} from "./IBaseTableColumn.ts";

type TBaseTableHandleSort = (sorter: TBaseTableColumnSorter) => void

type TBaseTableHandleFilter = (filter: TBaseTableColumnFilter) => void

export type {TBaseTableHandleSort, TBaseTableHandleFilter}
