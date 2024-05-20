import {type FC, type PropsWithChildren, useLayoutEffect} from "react";
import classes from "./BaseModal.module.css";
import {BasePortal} from "../BasePortal/BasePortal.tsx";
import {CloseIconSvg} from "../../Icons/CloseIconSvg.tsx";

type TBaseModalProps = PropsWithChildren & {
    closeModal?: () => void;
};

const BaseModal: FC<TBaseModalProps> = ({children, closeModal,}) => {
    useLayoutEffect(
        () => {
            document.body.style.overflow = "hidden";

            return () => {

                document.body.style.overflow = "";
            };
        },
        [],
    );

    return (
        <BasePortal>
            <div className={classes.fullScreenContainer}>
                <div className={classes.overlay}/>

                {
                    closeModal ? <span className={classes.closeButton} onClick={closeModal}>
                         <CloseIconSvg/>
                    </span> : null
                }

                {children}
            </div>
        </BasePortal>
    );
};
BaseModal.displayName = "BaseModalComponent";

export {BaseModal};
export type {TBaseModalProps}
