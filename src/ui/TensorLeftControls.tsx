"use client";
import { useMemo } from "react";
import { useTensor } from "../hooks";
import { IcoRepeat, IcoPlay, IcoPause, IcoVolumeMute, IcoVolume } from "../icons";
import { Button, VolumeSlider, TensorDuration } from ".";

export const TensorLeftControls = () => {
    const { iconSize, player: { volume, isPlaying, isEnded, isMuted },  playback: { handleTogglePlay, handleRepeat, toggleMute }} = useTensor();

    const volumeIcon = useMemo(() => (isMuted || volume <= 0 ? <IcoVolumeMute size={iconSize} /> : <IcoVolume size={iconSize} />),[isMuted, volume, iconSize]);
    const plaingIcon = useMemo(() => (isEnded ? <IcoRepeat size={iconSize} /> : isPlaying ? <IcoPause size={iconSize} /> : <IcoPlay size={iconSize} />),[iconSize, isEnded, isPlaying]);

    return(
        <div className="flex items-center">
            <Button tooltip="воспроизведение" toolTipClassName="left-0" onClick={isEnded ? handleRepeat : handleTogglePlay}>
                {plaingIcon}
            </Button>
            <div className="flex items-center group">
                <Button tooltip="громкость" onClick={toggleMute}>{volumeIcon}</Button>
                <VolumeSlider />
            </div>
            <TensorDuration />
        </div>
    )
}