"use client";
import { useTensor } from "../hooks";

export const TensorTinelineProgressbar = () => {
    const { hoverWidth, progress } = useTensor().timeline;
    
    return(
        <>
            <div className="absolute z-[1] left-0 top-0 h-full bg-gray-500 opacity-50" style={{ width: `${hoverWidth}px` }} />
            <div style={{ width: `${progress}%` }} className="absolute left-0 top-0 h-full bg-orange-500"/>
        </>
    )
}