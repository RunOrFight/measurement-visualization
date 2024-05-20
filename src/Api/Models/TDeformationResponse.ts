import {THttpApiResponse} from "./THttpApiResponse.ts";

type TDeformationResponse = THttpApiResponse<"getDeformation">

type TDeformationResponseData = TDeformationResponse["data"]

type TDeformationResponseDataItem = TDeformationResponseData[number]

export type {TDeformationResponse, TDeformationResponseData, TDeformationResponseDataItem}
