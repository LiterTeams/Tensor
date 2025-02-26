import { IconProps } from "../types";
export const IcoArrowDropRight = ({ color = "currentColor", size = 64, className = "" }:IconProps) => {
    return (
        <svg fill={color} viewBox="0 0 512 512" height={size} width={size} className={className}>
            <path d="M192 128l128 128-128 128z"/>
        </svg>
    );
};