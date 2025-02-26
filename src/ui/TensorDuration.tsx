"use client";
import { useMemo } from "react";
import { useTensor } from "../hooks";
import { durationFormat } from "../utils";
export const TensorDuration = () => {
    const { currentTime, totalTime } = useTensor().player;
    const currentDuration = useMemo(() => durationFormat(currentTime), [currentTime]);
    const totalDuration = durationFormat(totalTime);
    return <p className="ml-3 pointer-events-none">{currentDuration} / {totalDuration}</p>;
};