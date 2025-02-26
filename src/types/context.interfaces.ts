import { RefObject } from "react";
import { useTensorState, useTensorTimeline, useTensorPlayback, useTensorMode, useTensorUI, useTensorShortcuts, useTensorVFX } from "../hooks";

export interface TensorContextProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    playerRef: RefObject<HTMLDivElement | null>;
    iconSize: number;
    player: ReturnType<typeof useTensorState>;
    timeline: ReturnType<typeof useTensorTimeline>;
    playback: ReturnType<typeof useTensorPlayback>;
    shortcuts: ReturnType<typeof useTensorShortcuts>;
    mode: ReturnType<typeof useTensorMode>;
    ui: ReturnType<typeof useTensorUI>;
    vfx: ReturnType<typeof useTensorVFX>;
}