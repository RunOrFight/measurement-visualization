import {Dispatch, memo, SetStateAction, useCallback, useRef,} from "react";
import {IBaseTableColumnEntity, TBaseTableColumnFixationType} from "../../Models/IBaseTableColumn.ts";
import {BaseTableSortButton} from "../BaseTableSortButton/BaseTableSortButton.tsx";
import {BaseTableFilterButton} from "../BaseTableFilterButton/BaseTableFilterButton.tsx";
import {TBaseTableHandleFilter, TBaseTableHandleSort} from "../../Models/TBaseTableHandle.ts";
import classes from "./BaseTableHead.module.css"

const BORDER_WIDTH = 1

const FIXATION_TYPE_TO_CLASSNAME_MAP: Record<TBaseTableColumnFixationType, string> = {
    "top": classes.fixationTop,
    "top-left": `${classes.fixationTop} ${classes.fixationLeft}`
}

interface IThProps extends IBaseTableColumnEntity {
    handleSort: TBaseTableHandleSort
    handleFilter: TBaseTableHandleFilter
    rowIndex: number
    numberOfRows: number
    handleRender: (rowIndex: number, cellIndex: number, fixationType?: TBaseTableColumnFixationType) =>
        (node: HTMLTableHeaderCellElement | null) => void
    cellIndex: number
}

const Th = memo<IThProps>
(({
      title,
      numberOfRows,
      numberOfChildren,
      rowIndex,
      sorter,
      handleFilter,
      handleSort,
      filterType,
      dataIndex,
      fixationType,
      handleRender,
      cellIndex,
  }) => {
    const rowSpan = numberOfChildren > 0 ? 1 : numberOfRows - rowIndex
    const colSpan = numberOfChildren > 0 ? numberOfChildren : 1
    const className = fixationType ? FIXATION_TYPE_TO_CLASSNAME_MAP[fixationType] : ""

    return <th rowSpan={rowSpan} colSpan={colSpan}
               className={filterType ? `${className} ${classes.withFilter}` : className}
               ref={handleRender(rowIndex, cellIndex, fixationType)}>
        {title}

        {sorter ? <BaseTableSortButton sorter={sorter} handleSort={handleSort} className={classes.sortButton}/> : null}

        {
            filterType ?
                <BaseTableFilterButton handleFilter={handleFilter} dataIndex={dataIndex} filterType={filterType}
                                       className={classes.filterButton}/>
                : null
        }

    </th>
})
Th.displayName = "Th"


interface IBaseTableHeadProps {
    columnsToRender: IBaseTableColumnEntity[][],
    handleSort: TBaseTableHandleSort
    handleFilter: TBaseTableHandleFilter
    setColumnsToUse: Dispatch<SetStateAction<IBaseTableColumnEntity[][]>>
}

const BaseTableHead = memo<IBaseTableHeadProps>(({columnsToRender, setColumnsToUse, handleSort, handleFilter}) => {
    const mutableColumns = useRef(columnsToRender)
    const lastLeftFixation = useRef(0)

    const handleRender = useCallback((rowIndex: number, cellIndex: number, fixationType?: TBaseTableColumnFixationType,) =>
        (node: HTMLTableHeaderCellElement | null) => {
            if (node === null) {
                return
            }

            if (fixationType === "top-left") {
                const left = lastLeftFixation.current - BORDER_WIDTH

                node.style.left = `${left}px`

                lastLeftFixation.current += node.offsetWidth

                mutableColumns.current[rowIndex][cellIndex].left = left
            }

            const isLast = rowIndex + 1 === mutableColumns.current.length &&
                cellIndex + 1 === mutableColumns.current[rowIndex].length

            if (isLast) {
                lastLeftFixation.current = 0
                setColumnsToUse(mutableColumns.current)
            }
        }, [setColumnsToUse])

    return <thead>
    {
        columnsToRender.map((ths, rowIndex, array) => {
            return <tr key={rowIndex}>
                {
                    ths.map(({key, ...column}, cellIndex) => (
                        <Th key={`cell_${key ?? cellIndex}`} {...column} rowIndex={rowIndex}
                            numberOfRows={array.length} handleSort={handleSort} handleFilter={handleFilter}
                            handleRender={handleRender}
                            cellIndex={cellIndex}/>)
                    )
                }
            </tr>
        })
    }
    </thead>
});
BaseTableHead.displayName = "BaseTableHead";

export {BaseTableHead};
