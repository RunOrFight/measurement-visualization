import {IBaseTableColumn, IBaseTableColumnEntity} from "../Models/IBaseTableColumn.ts";
import {mergeMapsOfArray} from "../../../../Utils/MergeMapsOfArray.ts";

type TColumnsMap = Record<string, IBaseTableColumnEntity[]>

const createBaseTableColumnsMapRecursive = (columns: IBaseTableColumn[], level = 0,): TColumnsMap =>
    columns.reduce<TColumnsMap>((acc, {
            children,
            ...rest
        }) => {
            const hasChildren = children !== undefined

            acc[level].push({...rest, hasChildren})

            if (!hasChildren) {
                return acc
            }

            const mapFromChildren = createBaseTableColumnsMapRecursive(children, level + 1)

            return mergeMapsOfArray(mapFromChildren, acc)

        }, {
            [level]: []
        }
    )

export {createBaseTableColumnsMapRecursive}
