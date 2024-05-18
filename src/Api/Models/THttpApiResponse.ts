import {httpApi} from "../HttpApi.ts";

type THttpApiResponse<Key extends keyof typeof httpApi> = Awaited<ReturnType<typeof httpApi[Key]>>

export type {THttpApiResponse}
