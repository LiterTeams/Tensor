"use client";
import { useTensor } from "../hooks";

export const TensorVideo = () => {
    const { 
        videoRef,
        player: { track, scale, preload },
        playback: { handleTogglePlay, handleTimeUpdate, handleLoadedMetadata, handleError },
        mode: { handleToggleMode }
    } = useTensor();
    
    return(
        <video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleError}
            preload={preload}
            onDoubleClick={() => handleToggleMode("fullscreen")}
            onClick={handleTogglePlay}
            className={`absolute z-[2] pointer-events-auto ${scale == "auto" ? "size-full object-cover aspect-video" : (scale == "vertical" ? "w-auto h-full" : "w-full h-auto")}`}
        >
            {track && <source src={track.source} />}
        </video>
    )
}