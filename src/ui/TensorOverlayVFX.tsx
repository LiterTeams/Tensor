"use client";
import { useTensor } from "../hooks";
import { TensorOverlay } from ".";
import { clsx } from "../utils";

export const TensorOverlayVFX = () => {
    const { vfx: { useAberrationEffect, useBlackoutEffect, useMovieMode }, player: { disableControls, allowedFullscreenControls, modes } } = useTensor();
    
    const movieModeStyle = clsx("duration-300 absolute opacity-0 left-0 top-0 flex size-full before:absolute before:top-0 before:w-full before:h-[10%] before:-top-24 before:bg-black before:content-[''] before:duration-300 after:absolute after:-bottom-24 after:w-full after:h-[10%] after:bg-black after:content-[''] after:duration-300", useMovieMode && "opacity-100 before:top-0 after:bottom-0");
    const aberrationEffectStyle = clsx("duration-300 absolute inset-0 before:absolute before:inset-0 before:content-[''] before:opacity-50 before:bg-black/50 before:drop-shadow-[0px_0px_2px_rgba(255,255,255,0.5)] opacity-0", useAberrationEffect && "opacity-100");
    const blackoutEffectStyle = clsx("duration-300 absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,0.7)_100%)] opacity-0", useBlackoutEffect && "opacity-100");
    const gradientStyle = "absolute left-0 bottom-0 h-64 w-full bg-gradient-to-t from-black/50 to-transparent";

    return(
        <TensorOverlay className="pointer-events-none z-[2]">
            {(!disableControls.vfx || (allowedFullscreenControls.vfx && modes.isFullscreen)) && <div className={movieModeStyle} />}
            {(!disableControls.vfx || (allowedFullscreenControls.vfx && modes.isFullscreen)) && <div className={blackoutEffectStyle} />}
            {(!disableControls.vfx || (allowedFullscreenControls.vfx && modes.isFullscreen)) && <div className={aberrationEffectStyle} />}
            <div className={gradientStyle} />
        </TensorOverlay>
    )
}