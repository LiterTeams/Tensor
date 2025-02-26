"use client";
import { FC, useMemo } from "react";
import { useTensor } from "../hooks";
import { TensorVideo, TensorControls, TensorOverlays } from "./";

export const TensorPlayerContent: FC<{className?: string}> = ({className = "" }) => {
    const { playerRef, player: { trackList, isFirstStart, disableControls }, ui: { handelMouseMove } } = useTensor();

    const isTrackListEmpty = useMemo(() => trackList?.length === 0, [trackList]);

    return (
        <div ref={playerRef} tabIndex={0} onMouseMove={handelMouseMove} className={`absolute inset-0 size-full outline-none ${className}`}>
            {isTrackListEmpty || isFirstStart ? null : <TensorVideo /> }
            {!disableControls.controls && <TensorControls />}
            <TensorOverlays />
        </div>
    );
};
