import {memo, useEffect, useState} from "react";
import {BaseTable} from "../Base/BaseTable/BaseTable.tsx";
import {httpApi} from "../../Api/HttpApi.ts";
import {IBaseTableColumn} from "../Base/BaseTable/Models/IBaseTableColumn.ts";


const COLUMNS: IBaseTableColumn[] = [
    {
        title: "Дата и веремя измерения",
        dataIndex: "time"
    },
    {
        title: "Отметка, м",
        dataIndex: "data",
        render: (data) => data?.value ?? "-"
    },
    {
        title: "D, м",
        dataIndex: "data",
        render: (data) => data?.delta ?? "-"
    }
]

const DeformationTable = memo(() => {
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {

        httpApi.getDeformation().then((it) => {
            setDataSource(it.data)
        })
    }, []);

    return dataSource.length === 0 ? null : <BaseTable dataSource={dataSource} columns={COLUMNS}/>
});
DeformationTable.displayName = "DeformationTable";

export {DeformationTable};
