import {THttpApiResponse} from "./THttpApiResponse.ts";

type TDeformationTrendResponse = THttpApiResponse<"getDeformationTrend">

type TDeformationTrendResponseData = TDeformationTrendResponse["data"]

export type {TDeformationTrendResponseData}
