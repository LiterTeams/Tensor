"use client";
import { useEffect, useRef, useState } from "react";
import { UseTensorUIProps } from "../types";

export const useTensorUI = ({isPlaying,modes}: UseTensorUIProps) => {
    const [isHiddenControls, setIsHiddenControls] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handelMouseMove = () => {
        setIsHiddenControls(false);
        if (!isPlaying || !modes.isFullscreen) return;
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {setIsHiddenControls(true)}, 5000);
    }

    useEffect(() => {
        return () => {if (timeoutRef.current) {clearTimeout(timeoutRef.current)}};
    }, []);

    return { isHiddenControls, handelMouseMove };
};