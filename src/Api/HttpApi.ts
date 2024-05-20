import deformationTrendResponse from "./Data/deformation_trend_response.json"
import deformationResponse from "./Data/deformation_response.json"
import termoResponse from "./Data/termo_response.json"
import {withDelay} from "../Utils/WithDelay.ts";

const API_RESPONSE_DELAY = 1000

const httpApi = {
    getDeformation: () => withDelay(deformationResponse, API_RESPONSE_DELAY),
    getDeformationTrend: () => withDelay(deformationTrendResponse, API_RESPONSE_DELAY),
    getTermo: () => withDelay(termoResponse, API_RESPONSE_DELAY)
}

export {httpApi}
