import {padZero} from "./PadZero.ts";

const formatDateString = (dateString: string) => {
    const date = new Date(dateString)

    return `${padZero(date.getDate())}.${padZero(date.getMonth() + 1)}.${date.getFullYear()}`
}

export {formatDateString}
