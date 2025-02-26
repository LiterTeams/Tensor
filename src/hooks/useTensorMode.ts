"use client";
import { UseTensorModeProps } from "../types";

export const useTensorMode = ({playerRef, setTensorState}:UseTensorModeProps) => {
    
    const withPlayerRef = <T extends (this: HTMLDivElement, ...args: Parameters<T>) => ReturnType<T>>(fn: T) => {
        return function (...args: Parameters<T>): ReturnType<T> | undefined {
            const player = playerRef.current;
            if (!player) return;
            return fn.apply(player, args);
        };
    };
    
    const _toggleFullscreenMode = withPlayerRef(async function () {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await this.requestFullscreen();
            }
            setTensorState({modes: {isFullscreen: !!document.fullscreenElement, isMiniPlayer: false, isTheatre: false}})
        } catch (error) {
            console.log(error);
        }
    });

    const _toggleTheaterMode = () => {}
    const _toggleMiniPlayerMode = () => {

    }
    const handleToggleMode = (mode: "theater" | "mini" | "fullscreen") => {
        switch(mode){
            case "theater": _toggleTheaterMode(); break;
            case "mini": _toggleMiniPlayerMode(); break;
            case "fullscreen": _toggleFullscreenMode(); break;
            default: console.warn("Error Mode Change");
        }
    }



    return {
        handleToggleMode
    }
}