import {useEffect, useState} from "react";
import {BaseTable} from "../Base/BaseTable/BaseTable.tsx";
import type {TTermoResponseData} from "../../Api/Models/TTermoResponse.ts";
import {httpApi} from "../../Api/HttpApi.ts";
import {IBaseTableColumn} from "../Base/BaseTable/Models/IBaseTableColumn.ts";
import {getTablePropsFromTermoData} from "./Utils/GetTablePropsFromTermoData.ts";

const TermoTable = () => {
    const [dataSource, setDataSource] = useState<TTermoResponseData>([])
    const [columns, setColumns] = useState<IBaseTableColumn[]>([])

    useEffect(() => {

        httpApi.getTermo().then((it) => {
            const {columns, dataSource} = getTablePropsFromTermoData(it.data)

            setColumns(columns)
            setDataSource(dataSource)
        })
    }, []);

    return dataSource.length === 0 ? null : <BaseTable dataSource={dataSource} columns={columns}/>
}
TermoTable.displayName = "TermoTable";

export {TermoTable};
