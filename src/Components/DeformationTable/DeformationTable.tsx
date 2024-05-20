import {memo, useCallback, useEffect, useState} from "react";
import {BaseTable} from "../Base/BaseTable/BaseTable.tsx";
import {httpApi} from "../../Api/HttpApi.ts";
import {IBaseTableColumn} from "../Base/BaseTable/Models/IBaseTableColumn.ts";
import {formatDateString} from "../../Utils/FormatDateString.ts";
import {sortDateStrings} from "../../Utils/SortDateStrings.ts";
import {TDeformationResponseData} from "../../Api/Models/TDeformationResponse.ts";
import {DeformationTrendModal} from "../DeformationTrendModal/DeformationTrendModal.tsx";


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

const Caption = memo<{ openModal: () => void }>(({openModal}) => {
    return <div>
        <span>{"Деформационная марка"}</span>

        &nbsp;

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
        return null
    }

    return <>
        <BaseTable dataSource={deformationData} columns={COLUMNS} caption={<Caption openModal={openModal}/>}/>
        {modalVisible ? <DeformationTrendModal closeModal={closeModal} deformationData={deformationData}/> : null}
    </>
});
DeformationTable.displayName = "DeformationTable";

export {DeformationTable};
