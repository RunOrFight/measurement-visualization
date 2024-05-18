import {THttpApiResponse} from "./THttpApiResponse.ts";

type TTermoResponse = THttpApiResponse<"getTermo">

type TTermoResponseData = TTermoResponse["data"]

type TTermoResponseDataItem = TTermoResponseData[number]

export type {TTermoResponse, TTermoResponseData, TTermoResponseDataItem}
