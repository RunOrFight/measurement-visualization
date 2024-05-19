import {memo, useEffect, useState} from "react";
import {BaseTable} from "../Base/BaseTable/BaseTable.tsx";
import {httpApi} from "../../Api/HttpApi.ts";
import {IBaseTableColumn} from "../Base/BaseTable/Models/IBaseTableColumn.ts";
import {formatDateString} from "../../Utils/FormatDateString.ts";
import {sortDateStrings} from "../../Utils/SortDateStrings.ts";
import {TDeformationResponseData} from "../../Api/Models/TDeformationResponse.ts";


const COLUMNS: IBaseTableColumn[] = [
    {
        title: "Дата и веремя измерения",
        dataIndex: "time",
        render: (dateString) => formatDateString(dateString),
        sorter: (a, b) => sortDateStrings(a.time, b.time),
        filterType: "date-range",
        fixationType: "top-left"
    },
    {
        title: "Отметка, м",
        dataIndex: "data",
        render: (data: { value: number } | undefined) => data?.value?.toFixed(2) ?? "-",
        fixationType: "top"
    },
    {
        title: "D, м",
        dataIndex: "data",
        render: (data) => data?.delta ?? "-",
        fixationType: "top"
    }
]

const DeformationTable = memo(() => {
    const [dataSource, setDataSource] = useState<TDeformationResponseData>([])

    useEffect(() => {
        httpApi.getDeformation().then((it) => {
            setDataSource(it.data)
        })
    }, []);

    return dataSource.length === 0 ? null : <BaseTable dataSource={dataSource} columns={COLUMNS}/>
});
DeformationTable.displayName = "DeformationTable";

export {DeformationTable};
