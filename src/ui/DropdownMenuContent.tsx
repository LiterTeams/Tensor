import { ReactNode } from "react";
export const DropdownMenuContent = ({ show = false, children }: {show?: boolean; children?: ReactNode}) => {
    return show ? (
        <div className="flex flex-col">
            {children}
        </div>
    ) : null;
};