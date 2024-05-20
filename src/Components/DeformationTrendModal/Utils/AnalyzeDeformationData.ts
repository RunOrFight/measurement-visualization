import {TDeformationResponseData} from "../../../Api/Models/TDeformationResponse.ts";

interface IDeformationDataAnalysis {
    minDelta: number | null
    maxDelta: number | null
    dates: string[]
    deltas: number[]
}

const analyzeDeformationData = (deformationData: TDeformationResponseData) =>
    deformationData.reduce<IDeformationDataAnalysis>((acc, it) => {
        const delta = it.data.delta

        if (!delta) {
            return acc
        }

        acc.deltas.push(delta)
        acc.dates.push(it.time)

        if (!acc.minDelta) {
            acc.minDelta = delta
        } else {
            acc.minDelta = Math.min(delta, acc.minDelta)
        }

        if (!acc.maxDelta) {
            acc.maxDelta = delta
        } else {
            acc.maxDelta = Math.max(delta, acc.maxDelta)
        }

        return acc

    }, {minDelta: null, maxDelta: null, dates: [], deltas: []})

export {analyzeDeformationData}
