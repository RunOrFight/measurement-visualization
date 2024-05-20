import {memo, useEffect, useState} from "react";
import {httpApi} from "../../Api/HttpApi.ts";
import {BaseModal} from "../Base/BaseModal/BaseModal.tsx";
import Plot from "react-plotly.js";
import {TDeformationResponseData} from "../../Api/Models/TDeformationResponse.ts";
import {analyzeDeformationData} from "./Utils/AnalyzeDeformationData.ts";
import {analyzeDeformationTrend, IDeformationTrendAnalysis} from "./Utils/AnalyzeDeformationTrend.ts";
import {Loader} from "../Loader/Loader.tsx";

interface IDeformationTrendModalProps {
    closeModal: () => void
    deformationData: TDeformationResponseData
}

const DeformationTrendModal = memo<IDeformationTrendModalProps>(({closeModal, deformationData}) => {
    const [trendAnalysis, setTrendAnalysis] = useState<IDeformationTrendAnalysis | null>(null)

    useEffect(() => {
        httpApi.getDeformationTrend().then((response) => setTrendAnalysis(analyzeDeformationTrend(response.data)))
    }, []);

    if (trendAnalysis === null) {
        return <Loader/>
    }

    const {deltas, maxDelta, minDelta, dates} = analyzeDeformationData(deformationData)

    const firstTrendDate = trendAnalysis.trendDates[0]
    const lastTrendDate = trendAnalysis.trendDates[trendAnalysis.trendDates.length - 1]

    return <BaseModal closeModal={closeModal}>
        <Plot
            data={[
                {
                    x: trendAnalysis.trendDates,
                    y: trendAnalysis.trendPoints,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                    name: "Тренд"
                },
                {
                    x: dates,
                    y: deltas,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                    name: "Дельта",

                },
                {
                    x: [firstTrendDate, lastTrendDate],
                    y: [maxDelta, maxDelta],
                    type: 'scatter',
                    mode: 'lines',
                    line: {
                        dash: "dash",
                        color: "orange"
                    },
                    name: "Макс. Дельта"
                },
                {
                    x: [firstTrendDate, lastTrendDate],
                    y: [minDelta, minDelta],
                    type: 'scatter',
                    mode: 'lines',
                    line: {
                        dash: "dash",
                        color: "green"
                    },
                    name: "Мин. Дельта"
                },
            ]}
            layout={{
                width: 800,
                height: 500,
                title: 'Смещение по деформационной марке: dm5',
                xaxis: {title: "Дата"},
                yaxis: {title: "Смещение, м"}
            }}
        />
    </BaseModal>
});
DeformationTrendModal.displayName = "DeformationTrendModal";

export {DeformationTrendModal};
