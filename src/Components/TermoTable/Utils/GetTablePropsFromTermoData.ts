import type {TTermoResponseData} from "../../../Api/Models/TTermoResponse.ts";
import {IBaseTableColumn} from "../../Base/BaseTable/Models/IBaseTableColumn.ts";
import {formatDateString} from "../../../Utils/FormatDateString.ts";
import {sortDateStrings} from "../../../Utils/SortDateStrings.ts";

const createTermoColumns = (allPossibleDepths: Record<string, string>): IBaseTableColumn[] => [
    {
        title: "Дата и время измерения",
        key: "time",
        dataIndex: "time",
        sorter: (a, b) => {
            console.log(sortDateStrings(a.time, b.time))
            return sortDateStrings(a.time, b.time)
        },
        render: (dateString) => formatDateString(dateString)
    },
    {
        title: "Te",
        dataIndex: "averageTemperature"
    },
    {
        title: "Глубина",
        children: Object.keys(allPossibleDepths).map((it) =>
            ({title: it, dataIndex: it, render: (data) => data?.value ?? "-"}))
    }
]


const getTablePropsFromTermoData = (data: TTermoResponseData) => {
    const {allPossibleDepths, dataSource} = data.reduce((acc, it) => {
        acc.dataSource.push({...it, ...it.data})

        acc.allPossibleDepths = {...acc.allPossibleDepths, ...it.data}

        return acc
    }, {allPossibleDepths: {}, dataSource: []})

    return {dataSource, columns: createTermoColumns(allPossibleDepths)}
}

export {getTablePropsFromTermoData}
