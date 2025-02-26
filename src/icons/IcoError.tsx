import { IconProps } from "../types";
export const IcoError = ({ color = "currentColor", size = 64, className = "" }:IconProps) => {
    return (
        <svg stroke={color} fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} className={className}>
            <path d="M3 7v4a1 1 0 0 0 1 1h3"/>
            <path d="M7 7v10"/>
            <path d="M10 10v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2m0 -4v-2a1 1 0 0 0 -1 -1h-2"/>
            <path d="M17 7v4a1 1 0 0 0 1 1h3"/>
            <path d="M21 7v10"/>
            <path d="M3 3l18 18"/>
        </svg>
    );
};