import deformationResponse from "./Data/deformation_response.json"
import termoResponse from "./Data/termo_response.json"

const httpApi = {
    getDeformation: () => {
        return Promise.resolve(deformationResponse)
    },
    getTermo: () => {
        return Promise.resolve(termoResponse)
    }
}

export {httpApi}
