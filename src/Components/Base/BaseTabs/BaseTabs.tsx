import {Dispatch, SetStateAction} from "react";
import classes from "./BaseTabs.module.css";

interface IBaseTabsItem<Value> {
    title: string,
    value: Value
}

interface IBaseTabsProps<Value> {
    onChange: Dispatch<SetStateAction<Value>>;
    currentValue: Value;
    items: IBaseTabsItem<Value>[]
}


const BaseTabs = <T, >({items, onChange, currentValue}: IBaseTabsProps<T>) => {
    return <div className={classes.baseTabs}>
        {
            items.map(({value, title}, index) =>
                <button key={`${index}-${value}`}
                        onClick={() => onChange(value)}
                        className={value === currentValue ? classes.active : undefined}>
                    {title}
                </button>)
        }
    </div>;
}

BaseTabs.displayName = "BaseTabs";

export {BaseTabs};
