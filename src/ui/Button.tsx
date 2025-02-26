"use client";
import { FC } from "react";
import { useToolTip } from "../hooks";
import { Tooltip } from "./";
import { clsx, btnVariants, btnActiveVariants } from "../utils";
import { ButtonProps } from "../types";

export const Button: FC<ButtonProps> = ({className, toolTipClassName = "", tooltip = "", children, label, variant = "primary", active = false, ...props}) => {
    const { isVisible, showToolTip, hideToolTip } = useToolTip();
    const { disabled } = props;
    const btnClassName = clsx(btnVariants[variant], tooltip && "relative", active && btnActiveVariants[variant], disabled && "opacity-50", "outline-none", className);

    return(
        <button onMouseEnter={showToolTip} onMouseLeave={hideToolTip}  className={btnClassName} {...props}>
            {children ?? label}
            <Tooltip isVisible={isVisible} className={toolTipClassName} content={tooltip} />
        </button>
    )
}