import {THttpApiResponse} from "./THttpApiResponse.ts";

type TTermoResponse = THttpApiResponse<"getTermo">

type TTermoResponseData = TTermoResponse["data"]

export type {TTermoResponse, TTermoResponseData}
