import {THttpApiResponse} from "./THttpApiResponse.ts";

type TDeformationResponse = THttpApiResponse<"getDeformation">

type TDeformationResponseData = TDeformationResponse["data"]

export type {TDeformationResponse, TDeformationResponseData}
