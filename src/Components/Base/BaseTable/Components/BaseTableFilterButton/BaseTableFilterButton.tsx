import {
    ComponentType,
    createElement,
    Dispatch,
    DispatchWithoutAction,
    FC,
    memo,
    SetStateAction,
    useReducer,
    useState
} from "react";
import classes from "./BaseTableFilterButton.module.css";
import {FilterIconsSvg} from "../../../../Icons/FilterIconsSvg.tsx";
import {TBaseTableColumnFilter, TBaseTableColumnFilterType} from "../../Models/IBaseTableColumn.ts";
import {padZero} from "../../../../../Utils/PadZero.ts";
import {TBaseTableHandleFilter} from "../../Models/TBaseTableHandle.ts";
import {CloseIconSvg} from "../../../../Icons/CloseIconSvg.tsx";

const getDatepickerValue = (date: Date) => {
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`
}

const getFromValue = () => getDatepickerValue(new Date())

const getToValue = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)

    return getDatepickerValue(today)
}

interface IFilterContentProps {
    handleFilter: TBaseTableHandleFilter
    dataIndex: string
    toggleFilterDropdown: DispatchWithoutAction,
    setIsFiltered: Dispatch<SetStateAction<boolean>>
}

const DateRangeFilter = memo<IFilterContentProps>(({handleFilter, dataIndex, toggleFilterDropdown, setIsFiltered}) => {
    const [fromValue, setFromValue] = useState(getFromValue)
    const [toValue, setToValue] = useState(getToValue)


    const onFilter = () => {
        const filter: TBaseTableColumnFilter = (it) => {
            const timestamp = new Date(it[dataIndex]).getTime()
            const from = new Date(fromValue).getTime()
            const to = new Date(toValue).getTime()

            return from < timestamp && to > timestamp
        }

        setIsFiltered(true)
        toggleFilterDropdown()
        handleFilter(filter)
    }

    const onClear = () => {
        const filter = () => true
        handleFilter(filter)
        setFromValue(getFromValue)
        setToValue(getToValue)
        setIsFiltered(false)
        toggleFilterDropdown()
    }

    return <>
        {"С "}
        <input type={"date"} value={fromValue}
               onChange={(e) => setFromValue(e.target.value)}/>

        {" По "}
        <input type={"date"} value={toValue} min={fromValue}
               onChange={(e) => setToValue(e.target.value)}/>
        {" "}
        <button onClick={onClear}>{"Сбросить"}</button>
        {" "}
        <button onClick={onFilter}>{"Применить"}</button>

    </>
})


const FILTER_TYPE_TO_CONTENT_MAP: Record<TBaseTableColumnFilterType, ComponentType<IFilterContentProps>> = {
    "date-range": DateRangeFilter
}

interface ICloseButtonProps {
    toggleFilterDropdown: DispatchWithoutAction
}

const CloseButton: FC<ICloseButtonProps> = ({toggleFilterDropdown}) => {
    return <span className={classes.closeButton} onClick={toggleFilterDropdown}>
        <CloseIconSvg/>
    </span>
}

interface IBaseTableFilterButtonProps {
    filterType: TBaseTableColumnFilterType
    handleFilter: TBaseTableHandleFilter
    dataIndex: string
    className?: string
}

const BaseTableFilterButton = memo<IBaseTableFilterButtonProps>(({filterType, handleFilter, dataIndex, className}) => {
    const [filterDropdownVisible, toggleFilterDropdown] = useReducer((val) => !val, false)
    const [isFiltered, setIsFiltered] = useState(false)

    const style = isFiltered ? {color: "blue"} : {}

    return <>
        <span onClick={toggleFilterDropdown} className={className} style={style}>
            <FilterIconsSvg/></span>

        <div
            className={filterDropdownVisible ? `${classes.filterDropdown} ${classes.visible}` : classes.filterDropdown}>
            {createElement(FILTER_TYPE_TO_CONTENT_MAP[filterType], {
                toggleFilterDropdown,
                handleFilter,
                dataIndex,
                setIsFiltered
            })}
            <CloseButton toggleFilterDropdown={toggleFilterDropdown}/>
        </div>
    </>
});
BaseTableFilterButton.displayName = "BaseTableFilterButton";

export {BaseTableFilterButton};
