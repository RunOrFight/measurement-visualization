import {TDeformationTrendResponseData} from "../../../Api/Models/TDeformationTrendResponse.ts";

interface IDeformationTrendAnalysis {
    trendDates: string[]
    trendPoints: number[]
}


const analyzeDeformationTrend = (deformationTrend: TDeformationTrendResponseData) => {
    const criticalEndDateTimestamp = new Date(deformationTrend.endDate).getTime()

    return Object.entries(deformationTrend.points).reduce<IDeformationTrendAnalysis>((acc, [date, point]) => {

        if (new Date(date).getTime() < criticalEndDateTimestamp) {
            acc.trendDates.push(date)
            acc.trendPoints.push(point)
        }

        return acc
    }, {trendDates: [], trendPoints: [],})
}

export {analyzeDeformationTrend}
export type {IDeformationTrendAnalysis}
