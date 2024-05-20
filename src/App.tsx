import classes from './App.module.css'
import {TermoTable} from './Components/TermoTable/TermoTable.tsx';
import {DeformationTable} from "./Components/DeformationTable/DeformationTable.tsx";
import {ComponentType, createElement, useState} from "react";
import {BaseTabs} from "./Components/Base/BaseTabs/BaseTabs.tsx";
import {EActiveTable} from "./Enums/EActiveTable.ts";

const ACTIVE_TABLE_TO_COMPONENT_MAP: Record<EActiveTable, ComponentType> = {
    [EActiveTable.TERMO]: TermoTable,
    [EActiveTable.DEFORMATION]: DeformationTable
}

const TABS_ITEMS = [
    {
        title: "Термокоса",
        value: EActiveTable.TERMO
    },
    {
        title: "Деформационная марка",
        value: EActiveTable.DEFORMATION
    }
]

function App() {
    const [activeTable, setActiveTable] = useState(EActiveTable.TERMO)

    return <div className={classes.app}>
        <BaseTabs onChange={setActiveTable} items={TABS_ITEMS} currentValue={activeTable}/>

        {createElement(ACTIVE_TABLE_TO_COMPONENT_MAP[activeTable])}
    </div>
}

export default App
