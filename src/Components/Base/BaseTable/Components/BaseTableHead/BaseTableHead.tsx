import {Dispatch, memo, SetStateAction, useCallback, useEffect, useRef,} from "react";
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
    handleRender: (rowIndex: number, cellIndex: number, left: number,) => void
    cellIndex: number
    isLast: boolean
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
      isLast
  }) => {
    const rowSpan = numberOfChildren > 0 ? 1 : numberOfRows - rowIndex
    const colSpan = numberOfChildren > 0 ? numberOfChildren : 1
    const className = fixationType ? FIXATION_TYPE_TO_CLASSNAME_MAP[fixationType] : undefined


    const callbackRef = (node: HTMLTableHeaderCellElement) => {
        if (!node) {
            return
        }

        if (fixationType === "top-left") {
            const lastLeftFixation = node.getRootNode().lastLeftFixation ?? 0
            const left = lastLeftFixation - BORDER_WIDTH

            node.style.left = `${left}px`
            node.getRootNode().lastLeftFixation = node.offsetWidth + lastLeftFixation
            handleRender(rowIndex, cellIndex, left)


        }

        if (isLast) {
            node.getRootNode().lastLeftFixation = 0
        }
    }

    return <th rowSpan={rowSpan} colSpan={colSpan} className={className} ref={callbackRef}>
        {title}

        {sorter ? <BaseTableSortButton sorter={sorter} handleSort={handleSort}/> : null}

        {
            filterType ?
                <BaseTableFilterButton handleFilter={handleFilter} dataIndex={dataIndex} filterType={filterType}/>
                : null
        }

    </th>
})
Th.displayName = "Th"


interface IBaseTableHeadProps {
    columnsToRender: IBaseTableColumnEntity[][],
    handleSort: TBaseTableHandleSort
    handleFilter: TBaseTableHandleFilter
    setColumnsToUse: Dispatch<SetStateAction<IBaseTableColumnEntity[]>>
}

const BaseTableHead = memo<IBaseTableHeadProps>(({columnsToRender, setColumnsToUse, handleSort, handleFilter}) => {
    const mutableColumns = useRef(columnsToRender)
    
    const handleRender = useCallback((rowIndex: number, cellIndex: number, left: number,) => {
        mutableColumns.current[rowIndex][cellIndex].left = left
    }, [])

    useEffect(() => {
        setColumnsToUse(mutableColumns.current.flat())
    }, [setColumnsToUse]);

    return <thead>
    {
        columnsToRender.map((ths, rowIndex, array) => {
            return <tr key={rowIndex}>
                {
                    ths.map(({key, ...column}, cellIndex) => (
                        <Th key={`cell_${key ?? cellIndex}`} {...column} rowIndex={rowIndex}
                            numberOfRows={array.length} handleSort={handleSort} handleFilter={handleFilter}
                            handleRender={handleRender}
                            cellIndex={cellIndex} isLast={cellIndex + 1 === ths.length}/>)
                    )
                }
            </tr>
        })
    }
    </thead>
});
BaseTableHead.displayName = "BaseTableHead";

export {BaseTableHead};
