"use client";
import { useTensor } from "../hooks";
import { Button } from "./Button";

export const TensorTimelineEpisodes = () => {

    const { player: { totalTime, episodes } } = useTensor();

    if (!episodes) return null;

    return(
        <>
            {episodes.map((episode, index) => (
                <Button
                    key={index}
                    tooltip={episode.title}
                    variant="none"
                    className="absolute w-1 h-1.5 bg-neutral-200 top-0 cursor-pointer"
                    toolTipClassName="-left-5"
                    style={{ left: `${(episode.start / (totalTime || 1)) * 100}%` }}
                />
            ))}
        </>
    )
}