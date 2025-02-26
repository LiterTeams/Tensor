"use client";
import { createContext, ReactNode, useMemo, useRef } from "react";
import { useTensorState, useTensorTimeline, useTensorMode, useTensorPlayback, useTensorVFX, useTensorShortcuts, useTensorUI } from "../hooks";
import { TensorContextProps, TensorPlayerProps } from "../types";

export const TensorContext = createContext<TensorContextProps | null>(null);

interface TensorProviderProps extends TensorPlayerProps {
    id: string;
    children: ReactNode;
}

export const TensorProvider = ({ id, children, ...props }: TensorProviderProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const iconSize = 18;
    const player = useTensorState({...props});
    const timeline = useTensorTimeline({ videoRef });
    const mode = useTensorMode({ playerRef, setTensorState: player.setTensorState });
    const ui = useTensorUI({isPlaying: player.isPlaying, modes: player.modes});
    const playback = useTensorPlayback({ videoRef, ...player, ...timeline });
    const vfx = useTensorVFX();
    const shortcuts = useTensorShortcuts({ playerRef, ...player, ...playback, ...mode });

    const contextValue = useMemo(
        () => ({ id, iconSize, videoRef, ui, playerRef, player, timeline, mode, playback, vfx, shortcuts }),
        [id, player, timeline, mode, ui, playback, vfx, shortcuts]
    );

    return <TensorContext.Provider value={contextValue}>{children}</TensorContext.Provider>;
};
