import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    children?: ReactNode;
    toolTipClassName?: string;
    label?: string;
    tooltip?: string;
    variant?: "primary" | "secondary" | "additional" | "none";
}