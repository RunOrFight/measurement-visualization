import type {TTermoResponseData} from "../../../Api/Models/TTermoResponse.ts";
import {IBaseTableColumn} from "../../Base/BaseTable/Models/IBaseTableColumn.ts";
import {formatDateString} from "../../../Utils/FormatDateString.ts";
import {sortDateStrings} from "../../../Utils/SortDateStrings.ts";
import {TExplicitAny} from "../../../Types/TExplicitAny.ts";

const NOOP_CELL_VALUE = "-"

const createTermoColumns = (allPossibleDepths: Record<string, string>): IBaseTableColumn[] => [
    {
        title: "Дата и время измерения",
        key: "time",
        dataIndex: "time",
        sorter: (a, b) => sortDateStrings(a.time, b.time),
        render: (dateString) => formatDateString(dateString),
        filterType: "date-range",
        fixationType: "top-left"
    },
    {
        title: "Te",
        dataIndex: "averageTemperature",
        render: (data: number) => data.toFixed(2),
        fixationType: "top-left"
    },
    {
        dataIndex: "depth",
        title: "Глубина",
        children: Object.keys(allPossibleDepths).map((it) =>
            ({
                title: it,
                fixationType: "top",
                dataIndex: it,
                render: (data: {
                    value: number,
                    isValid: boolean
                } | undefined) => data?.value.toFixed(2) ?? NOOP_CELL_VALUE
            }))
    }
]

interface ITablePropsFromTermoData {
    dataSource: TTermoResponseData
    allPossibleDepths: Record<string, TExplicitAny>
}

const getTablePropsFromTermoData = (data: TTermoResponseData) => {
    const {allPossibleDepths, dataSource} = data.reduce<ITablePropsFromTermoData>((acc, it) => {
        acc.dataSource.push({...it, ...it.data})

        acc.allPossibleDepths = {...acc.allPossibleDepths, ...it.data}

        return acc
    }, {allPossibleDepths: {}, dataSource: []})

    return {dataSource, columns: createTermoColumns(allPossibleDepths)}
}

export {getTablePropsFromTermoData}
