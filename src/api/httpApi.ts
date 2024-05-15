import deformationResponse from "./deformation_response.json"

const httpApi = {
    getDeformation: ()=>{
       return  Promise.resolve(deformationResponse)
    }
}

export {httpApi}
