import { ReactNode } from "react";
export const DropdownMenu = ({children}:{children?: ReactNode}) => (
    <div className="absolute pointer-events-auto z-[3] right-2 bottom-16 bg-black/50 w-1/4 rounded">{children}</div>
);