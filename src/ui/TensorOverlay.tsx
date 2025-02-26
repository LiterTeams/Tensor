import { FC } from "react";
import { TensorOverlayProps } from "../types";
import { clsx } from "../utils";

export const TensorOverlay: FC<TensorOverlayProps> = ({className,children}) => {
    return(
        <div className={clsx("absolute duration-300 left-0 top-0 p-2 size-full pointer-events-auto", className)}>
            {children}
        </div>
    )
}