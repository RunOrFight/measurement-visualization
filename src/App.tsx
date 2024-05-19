import classes from './App.module.css'
import {TermoTable} from './Components/TermoTable/TermoTable.tsx';
import {DeformationTable} from "./Components/DeformationTable/DeformationTable.tsx";

function App() {
    return <div className={classes.app}>
        <TermoTable/>
        <DeformationTable/>
    </div>
}

export default App
