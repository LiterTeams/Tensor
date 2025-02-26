"use client";
import { SyntheticEvent } from "react";
import { TensorTrackProps, TensorVoiceProps, TensorSubtitleProps, UseTensorPlaybackProps } from "../types";
import { errorFormat, parseTime } from "../utils";

export const useTensorPlayback = ({
    videoRef, currentTime, totalTime, volume,
    isMuted, isLooped, speed, isError, timeSkip,
    track, voice, subtitle, trackList, voiceList, subtitleList,
    setTensorState, startAnimation, stopAnimation,
    updateProgress,
}:UseTensorPlaybackProps) => {
    
    // General
    const withVideoRef = <T extends (this: HTMLVideoElement, ...args: Parameters<T>) => ReturnType<T>>(fn: T) => {
        return function (...args: Parameters<T>): ReturnType<T> | undefined {
            const video = videoRef.current;
            if (!video || isError) return;
            return fn.apply(video, args);
        };
    };

    // Play && Pause
    const _handlePlay = withVideoRef(function () {
        this.play();
        setTensorState({ isPlaying: true });
        startAnimation();
    });
    const _handlePause = withVideoRef(function () {
        this.pause();
        setTensorState({ isPlaying: false });
        stopAnimation();
    });
    const setVideoSrc = withVideoRef(async function (track: TensorTrackProps): Promise<void> {
        if (!track.source) return;
        
        this.src = track.source;
        this.load();
        this.volume = volume;
            
        setTensorState({ track, isLoading: true});
        
        this.addEventListener("loadedmetadata", () => {
            setTensorState({ totalTime: this.duration, isLoading: false });
        }, { once: true });
    });
    const handleTogglePlay = withVideoRef(function () {
        if (this.readyState < 2) return;
        try {
            if (this.paused){
                _handlePlay();
                return;
            }
            _handlePause();
        } catch (error) {
            console.error("Playback error:", error);
        }
    });
    const handleFirstStart = () => {
        setTensorState({isFirstStart: false});
        if (trackList?.length == 0){
            const error = {
                message: "Отсутствуют медиа треки",
                code: 404,
            }
            setTensorState({error, isError: true})
        }
    }

    const handleTimeUpdate = withVideoRef(function () {
        const currentTime = this.currentTime;
        setTensorState({ currentTime });
        if (this.ended || Math.abs(currentTime - totalTime) < 0.1){ handleEnded(); return}
        setTensorState({ isEnded: false })
    });
    const handleLoadedMetadata = withVideoRef(function () {
        setTensorState({ totalTime: this.duration, isLoading: false });
        _handlePlay();
    });

    // Time Skip Change
    const _handleForwardSkip = withVideoRef(function () {
        const newTime = Math.max(0, Math.min(totalTime, currentTime + parseTime(timeSkip)));
        this.currentTime = newTime;
        updateProgress();
    });
    const _handleBackwardSkip = withVideoRef(function () {
        const newTime = Math.max(0, Math.min(totalTime, currentTime - parseTime(timeSkip)));
        this.currentTime = newTime;
        updateProgress();
    });
    const handleTimeNumberSkip = withVideoRef(function (targetTime: number) {
        this.currentTime = targetTime;
        updateProgress();
    });
    const handleTimeSkip = withVideoRef(function (direction: "forward" | "backward") {
        switch(direction){
            case "backward": _handleBackwardSkip(); break;
            case "forward": _handleForwardSkip(); break;
            default: console.warn("Error Time Skip Change");
        }
    });

    // Speed Change
    const handleIncreaseSpeed = withVideoRef(function () {
        const newSpeed = Math.min(2, speed + 0.25);
        setTensorState({speed: newSpeed});
        this.playbackRate = newSpeed;
    });
    const handleDecreaseSpeed = withVideoRef(function () {
        const newSpeed = Math.max(0.25, speed - 0.25);
        setTensorState({speed: newSpeed});
        this.playbackRate = newSpeed;
    });
    const handleSpeedChange = withVideoRef(function (newSpeed: number) {
        setTensorState({speed: newSpeed});
        this.playbackRate = newSpeed;
    });

    // Quality`s && Voices && Subtitles
    const handleChangeQuality = (newTrack: TensorTrackProps) => {
        if (trackList?.length == 1 || newTrack == track) return;
        setVideoSrc(newTrack);
    }
    const handleChangeVoice = (newVoice: TensorVoiceProps) => {
        if (voiceList?.length == 1 || newVoice == voice) return;
    }
    const handleChangeSubtitle = (newSubtitle: TensorSubtitleProps) => {
        if (subtitleList?.length == 1 || newSubtitle == subtitle) return;
    }

    // Scale
    const handleScaleChange = withVideoRef(function (newScale: "auto" | "vertical" | "horizontal") {
        setTensorState({scale: newScale});
    });

    // Additional
    const handleEnded = withVideoRef(function () {
        setTensorState({ isPlaying: false, isEnded: true });
        stopAnimation();
    });
    const handleRepeat = withVideoRef(function () {
        this.currentTime = 0;
        _handlePlay();
    });
    const handleVolumeChange = withVideoRef(function (newVolume: number) {
        setTensorState({volume: newVolume});
        this.volume = newVolume;
    });
    const toggleMute = withVideoRef(function () {
        setTensorState({isMuted: !isMuted});
        this.muted = !isMuted;
    });
    const toggleLoop = withVideoRef(function () {
        setTensorState({isLooped: !isLooped});
        this.loop = !isLooped;
    });
    const toggleCaptions = () => {}

    const handleError = (event: SyntheticEvent<HTMLVideoElement>) => {
        const videoError = event.currentTarget.error;
    
        if (videoError) {
            const error = {
                code: videoError.code, 
                message: errorFormat(videoError.code)
            };
            setTensorState({ error });
            _handlePause();
        }
    };

    return {
        handleTimeUpdate,
        handleLoadedMetadata,
        setVideoSrc,
        handleTogglePlay,
        handleTimeSkip,
        handleTimeNumberSkip,
        handleIncreaseSpeed,
        handleDecreaseSpeed,
        handleSpeedChange,
        handleEnded,
        handleRepeat,
        handleError,
        handleScaleChange,
        handleVolumeChange,
        handleChangeQuality,
        handleChangeVoice,
        handleChangeSubtitle,
        handleFirstStart,
        toggleMute,
        toggleLoop,
        toggleCaptions,
    }
}