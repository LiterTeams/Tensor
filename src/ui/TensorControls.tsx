"use client";
import { useTensor } from "../hooks";
import { TensorTimeline, TensorLeftControls, TensorRightControls } from ".";
import { clsx } from "../utils";

export const TensorControls = () => {

    const { isHiddenControls } = useTensor().ui;

    return(
        <div className={clsx("absolute duration-500 px-2 z-[3] left-0 bottom-0 w-full pointer-events-auto opacity-100 cursor-auto", isHiddenControls && "opacity-0 cursor-none translate-y-24")}>
            <TensorTimeline />
            <div className="flex items-center justify-between">
                <TensorLeftControls />
                <TensorRightControls />
            </div>
        </div>
    )
}