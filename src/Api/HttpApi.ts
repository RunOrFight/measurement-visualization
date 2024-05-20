import deformationTrendResponse from "./Data/deformation_trend_response.json"
import deformationResponse from "./Data/deformation_response.json"
import termoResponse from "./Data/termo_response.json"

const httpApi = {
    getDeformation: () => {
        return Promise.resolve(deformationResponse)
    },
    getDeformationTrend: () => {
        return Promise.resolve(deformationTrendResponse)
    },
    getTermo: () => {
        return Promise.resolve(termoResponse)
    }
}

export {httpApi}
