import {useEffect, useState} from "react";
import {BaseTable} from "../Base/BaseTable/BaseTable.tsx";
import {httpApi} from "../../Api/HttpApi.ts";
import {getTablePropsFromTermoData, ITablePropsFromTermoData} from "./Utils/GetTablePropsFromTermoData.ts";
import {Loader} from "../Loader/Loader.tsx";

const TermoTable = () => {
    const [props, setProps] = useState<ITablePropsFromTermoData | null>(null)

    useEffect(() => {
        httpApi.getTermo().then((it) => {
            setProps(getTablePropsFromTermoData(it.data))
        })
    }, []);

    return props === null ? <Loader/> :
        <BaseTable dataSource={props.dataSource} columns={props.columns} caption={"Термометрическая скважина: ts3"}/>
}
TermoTable.displayName = "TermoTable";

export {TermoTable};
