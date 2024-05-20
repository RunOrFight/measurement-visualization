import classes from "./Loader.module.css";
import {BaseModal} from "../Base/BaseModal/BaseModal.tsx";

const Loader = () => (
    <BaseModal>
        <div className={classes.loader}/>
    </BaseModal>
);
Loader.displayName = "Loader";

export {Loader};
