import {memo, useCallback, useEffect, useState} from "react";
import {BaseTable} from "../Base/BaseTable/BaseTable.tsx";
import {httpApi} from "../../Api/HttpApi.ts";
import {IBaseTableColumn} from "../Base/BaseTable/Models/IBaseTableColumn.ts";
import {formatDateString} from "../../Utils/FormatDateString.ts";
import {sortDateStrings} from "../../Utils/SortDateStrings.ts";
import {TDeformationResponseData, TDeformationResponseDataItem} from "../../Api/Models/TDeformationResponse.ts";
import {DeformationTrendModal} from "../DeformationTrendModal/DeformationTrendModal.tsx";
import {Loader} from "../Loader/Loader.tsx";
import classes from "./DeformationTable.module.css"

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
        render: (data, dataItem: TDeformationResponseDataItem) => {
            const style = {color: dataItem.state === "Danger" ? "red" : "black"}

            return <span style={style}>{data?.delta ?? "-"}</span>
        },
        fixationType: "top"
    }
]

const Caption = memo<{ openModal: () => void }>(({openModal}) => {
    return <div className={classes.caption}>
        <span>{"Деформационная марка: дм5"}</span>

        <button onClick={openModal}>{"Tренд"}</button>
    </div>
})

const DeformationTable = memo(() => {
    const [deformationData, setDeformationData] = useState<TDeformationResponseData>([])
    const [modalVisible, setModalVisible] = useState(false)

    const closeModal = useCallback(() => setModalVisible(false), [])

    const openModal = useCallback(() => setModalVisible(true), [])

    useEffect(() => {
        httpApi.getDeformation().then((it) => {
            setDeformationData(it.data)
        })
    }, []);

    if (deformationData.length === 0) {
        return <Loader/>
    }

    return <>
        <BaseTable dataSource={deformationData} columns={COLUMNS} caption={<Caption openModal={openModal}/>}/>
        {modalVisible ? <DeformationTrendModal closeModal={closeModal} deformationData={deformationData}/> : null}
    </>
});
DeformationTable.displayName = "DeformationTable";

export {DeformationTable};
