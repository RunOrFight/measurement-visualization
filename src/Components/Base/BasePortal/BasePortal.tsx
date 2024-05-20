import {createPortal} from "react-dom";
import {type FC, type PropsWithChildren, useLayoutEffect, useState} from "react";
import {createDivWithIdAndAppendToBody} from "../../../Utils/CreateDivWithIdAndAppendToBoddy.ts";

const MODALS_ROOT_ID = "modals-root";

type TPortalProps = PropsWithChildren<{ rootId?: string; }>

const BasePortal: FC<TPortalProps> = ({children, rootId = MODALS_ROOT_ID}) => {
    const [modalsRootElement, setWrapperElement] = useState<null | HTMLElement>(null);

    useLayoutEffect(
        () => {
            let domElement = document.getElementById(rootId);
            let isCreated = false;
            if (domElement === undefined) {
                domElement = createDivWithIdAndAppendToBody(rootId);
                isCreated = true;

            }

            setWrapperElement(domElement);

            return () => {
                if (isCreated && domElement) {
                    domElement.remove();
                }
            };
        },
        [rootId],
    );

    const isRootNotNil = modalsRootElement !== undefined && modalsRootElement !== null

    return isRootNotNil ? createPortal(children, modalsRootElement) : <>{children}</>;
};
BasePortal.displayName = "Portal";

export {BasePortal,};
