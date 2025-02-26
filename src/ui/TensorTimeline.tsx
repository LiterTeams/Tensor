"use client";
import { FC } from "react";
import { useTensor } from "../hooks";

import { TensorTinelineProgressbar, TensorTimelineEpisodes } from "./";

export const TensorTimeline: FC = () => {

    const { timelineRef, handleManualRewind, handleMouseMove, handleMouseLeave } = useTensor().timeline;

    return(
        <div
            ref={timelineRef}
            onClick={handleManualRewind}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative duration-300 w-full h-1.5 cursor-pointer bg-neutral-800"
        >
            <TensorTinelineProgressbar />
            <TensorTimelineEpisodes />
        </div>
    )
}