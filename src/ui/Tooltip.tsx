import { FC } from "react";
import { clsx } from "../utils";

interface TooltipProps {
    className?: string;
    isVisible?: boolean;
    content: string | null;
}

export const Tooltip: FC<TooltipProps> = ({className = "", isVisible, content}) => {
    if (!content) return;
    return(
        <div className={clsx("absolute pointer-events-none min-w-max duration-300 -top-10 text-xs text-white px-2 py-1 bg-neutral-900 rounded-md opacity-0", isVisible && "opacity-100", className)}>
            {content}
        </div>
    )
}