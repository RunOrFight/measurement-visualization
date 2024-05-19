import {ComponentType, createElement, DispatchWithoutAction, memo, useReducer, useState} from "react";
import classes from "./BaseTableFilterButton.module.css";
import {FilterIconsSvg} from "../../../../Icons/FilterIconsSvg.tsx";
import {TBaseTableColumnFilter, TBaseTableColumnFilterType} from "../../Models/IBaseTableColumn.ts";
import {padZero} from "../../../../../Utils/PadZero.ts";
import {TBaseTableHandleFilter} from "../../Models/TBaseTableHandle.ts";

const getDatepickerInitialValue = () => {
    const date = new Date()

    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`
}

interface IFilterContentProps {
    handleFilter: TBaseTableHandleFilter
    dataIndex: string
    toggleFilterDropdown: DispatchWithoutAction
}

const DateRangeFilter = memo<IFilterContentProps>(({handleFilter, dataIndex, toggleFilterDropdown}) => {
    const [datepickerValue, setDatepickerValue] = useState(getDatepickerInitialValue)


    const onClick = () => {
        const filter: TBaseTableColumnFilter = (it) =>
            new Date(it[dataIndex]).toDateString() === new Date(datepickerValue).toDateString()

        toggleFilterDropdown()
        handleFilter(filter)
    }

    const onClear = () => {
        const filter = () => true
        toggleFilterDropdown()
        handleFilter(filter)
    }

    return <div>
        <input type={"date"} value={datepickerValue}
               onChange={(e) => setDatepickerValue(e.target.value)}/>
        <button onClick={onClick}>{"OK"}</button>
        <button onClick={onClear}>X</button>
    </div>
})


const FILTER_TYPE_TO_CONTENT_MAP: Record<TBaseTableColumnFilterType, ComponentType<IFilterContentProps>> = {
    "date-range": DateRangeFilter
}

interface IBaseTableFilterButtonProps {
    filterType: TBaseTableColumnFilterType
    handleFilter: TBaseTableHandleFilter
    dataIndex: string
}

const BaseTableFilterButton = memo<IBaseTableFilterButtonProps>(({filterType, handleFilter, dataIndex}) => {
    const [filterDropdownVisible, toggleFilterDropdown] = useReducer((val) => !val, false)


    return <>
        <span onClick={toggleFilterDropdown}>
            <FilterIconsSvg/></span>

        {
            filterDropdownVisible ?
                <div className={classes.filterDropdown}>
                    {createElement(FILTER_TYPE_TO_CONTENT_MAP[filterType], {
                        toggleFilterDropdown,
                        handleFilter,
                        dataIndex
                    })}
                </div> : null
        }
    </>
});
BaseTableFilterButton.displayName = "BaseTableFilterButton";

export {BaseTableFilterButton};
