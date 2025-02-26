import { IconProps } from "../types";
export const IcoMonitor = ({ color = "currentColor", size = 64, className = "" }:IconProps) => {
    return (
        <svg fill={color} viewBox="0 0 256 256" height={size} width={size} className={className}>
            <path d="M232,64V176a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V64A24,24,0,0,1,48,40H208A24,24,0,0,1,232,64ZM160,216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Z"/>
        </svg>
    );
};