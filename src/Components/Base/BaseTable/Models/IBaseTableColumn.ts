import {ReactNode} from "react";
import {TExplicitAny} from "../../../../Types/TExplicitAny.ts";

type TBaseTableColumnSorter = Exclude<Parameters<typeof Array.prototype.sort>[0], undefined>

type TBaseTableColumnFilter = Exclude<Parameters<typeof Array.prototype.filter>[0], undefined>

type TBaseTableColumnFilterType = "date-range"

type TBaseTableColumnFixationType = "top" | "top-left"

interface IBaseTableColumn {
    title: string
    dataIndex: string
    key?: string
    render?: (data: TExplicitAny) => ReactNode
    children?: IBaseTableColumn[]
    sorter?: TBaseTableColumnSorter
    filterType?: TBaseTableColumnFilterType
    fixationType?: TBaseTableColumnFixationType
}

interface IBaseTableColumnEntity extends Omit<IBaseTableColumn, "children"> {
    numberOfChildren: number
    left?: number
}


export type {
    IBaseTableColumn,
    IBaseTableColumnEntity,
    TBaseTableColumnSorter,
    TBaseTableColumnFilterType,
    TBaseTableColumnFilter,
    TBaseTableColumnFixationType
};
