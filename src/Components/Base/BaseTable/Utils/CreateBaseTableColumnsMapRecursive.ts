import {IBaseTableColumn, IBaseTableColumnEntity} from "../Models/IBaseTableColumn.ts";
import {mergeMapsOfArray} from "../../../../Utils/MergeMapsOfArray.ts";

type TColumnsMap = Record<string, IBaseTableColumnEntity[]>

const createBaseTableColumnsMapRecursive = (columns: IBaseTableColumn[], level = 0,): TColumnsMap =>
    columns.reduce<TColumnsMap>((acc, {
            children,
            ...rest
        }) => {

            acc[level].push({...rest, numberOfChildren: children?.length ?? 0})

            if (!children) {
                return acc
            }

            const mapFromChildren = createBaseTableColumnsMapRecursive(children, level + 1)

            return mergeMapsOfArray(mapFromChildren, acc)

        }, {
            [level]: []
        }
    )

export {createBaseTableColumnsMapRecursive}
