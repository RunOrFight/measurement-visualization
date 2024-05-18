import type {TTermoResponseData} from "../../../Api/Models/TTermoResponse.ts";

const createTermoColumns = (allPossibleDepths: Record<string, string>) => [
    {
        title: "Дата и время измерения",
        key: "time",
        dataIndex: "time",
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

    console.log(dataSource)

    return {dataSource, columns: createTermoColumns(allPossibleDepths)}
}

export {getTablePropsFromTermoData}
