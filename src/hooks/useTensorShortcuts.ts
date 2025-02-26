"use client";
import { useEffect, useCallback } from "react";
import { UseTensorShortcutsProps } from "../types";

export const useTensorShortcuts = ({
    playerRef, volume, speed, totalTime, disableControls,
    toggleLoop, handleTogglePlay, handleRepeat, toggleCaptions, toggleMute,
    handleVolumeChange, handleIncreaseSpeed, handleDecreaseSpeed, handleTimeSkip, handleToggleMode,
    handleTimeNumberSkip,
}: UseTensorShortcutsProps) => {

    const isActive = useCallback(() => {
        return playerRef.current && document.activeElement === playerRef.current;
    }, [playerRef]);

    const handleTS = useCallback((event: KeyboardEvent) => {
        if (!isActive()) return;
        if (!event.shiftKey && event.code === "ArrowRight") handleTimeSkip("forward");
        else if (!event.shiftKey && event.code === "ArrowLeft") handleTimeSkip("backward");
    }, [handleTimeSkip,isActive]);

    const handleTSByNumber = useCallback((event: KeyboardEvent) => {
        if (!isActive() || !/^[0-9]$/.test(event.key)) return;
    
        const targetPercent = Number(event.key) * 10;
        const targetTime = (targetPercent / 100) * totalTime;
        handleTimeNumberSkip(targetTime);
    },[totalTime, handleTimeNumberSkip, isActive]);

    const handleVolumeAndSpeed = useCallback((event: KeyboardEvent) => {
        if (!isActive()) return;
        if (!event.shiftKey && event.code === "ArrowUp" && volume < 1) {
            handleVolumeChange(Math.min(1, volume + 0.05));
        } else if (!event.shiftKey && event.code === "ArrowDown" && volume > 0) {
            handleVolumeChange(Math.max(0, volume - 0.05));
        } else if (event.shiftKey && event.code === "ArrowRight" && speed < 2) {
            handleIncreaseSpeed();
        } else if (event.shiftKey && event.code === "ArrowLeft" && speed > 0.25) {
            handleDecreaseSpeed();
        }
    }, [volume, speed, handleVolumeChange, handleIncreaseSpeed, handleDecreaseSpeed, isActive]);

    const handlePlaybackControls = useCallback((event: KeyboardEvent) => {
        if (!isActive()) return;
        const actions: Record<string, () => void> = {
            Space: handleTogglePlay,
            KeyM: toggleMute,
            KeyL: toggleLoop,
            KeyR: handleRepeat,
            KeyC: toggleCaptions,
            KeyT: () => handleToggleMode("theater"),
            KeyI: () => handleToggleMode("mini"),
            KeyF: () => handleToggleMode("fullscreen"),
            Escape: () => handleToggleMode("fullscreen"),
        };
        const action = actions[event.code];
        if (action) action();
    }, [handleTogglePlay, toggleMute, toggleLoop, handleRepeat, toggleCaptions, handleToggleMode,isActive]);

    useEffect(() => {
        if (disableControls.shortcuts) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.repeat) return;
            handleTS(event);
            handleTSByNumber(event);
            handleVolumeAndSpeed(event);
            handlePlaybackControls(event);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleTS, handleTSByNumber, handleVolumeAndSpeed, handlePlaybackControls, disableControls.shortcuts]);
};