import {ReactNode} from "react";

interface IBaseTableColumn {
    title: string
    dataIndex?: string
    key?: string
    render?: (data: string) => ReactNode
    children?: IBaseTableColumn[]
}

interface IBaseTableColumnEntity extends Omit<IBaseTableColumn, "children"> {
    hasChildren: boolean
}

export type {IBaseTableColumn, IBaseTableColumnEntity};
