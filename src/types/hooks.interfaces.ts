import { TensorContextProps, TensorTrackProps, TensorVoiceProps, TensorSubtitleProps, TensorEpisodeProps } from ".";

export interface TensorModesProps {
    isFullscreen: boolean;
    isMiniPlayer: boolean;
    isTheatre: boolean;
}

export interface TensorControlsDisabledProps {
    all: boolean;
    fullscreen: boolean;
    miniPlayer: boolean;
    theatre: boolean;
    settings: boolean;
    quality: boolean;
    voice: boolean;
    subtitle: boolean;
    vfx: boolean;
    shortcuts: boolean;
    controls: boolean;
}

export type TensorAllowedFullscreenControlsProps = Partial<Omit<TensorControlsDisabledProps, "all"|"fullscreen"|"miniPlayer"|"theatre">>;

// Основное состояние
export interface UseTensorStateProps {
    trackList: TensorTrackProps[] | null;
    voiceList: TensorVoiceProps[] | null;
    subtitleList: TensorSubtitleProps[] | null;
    episodes: TensorEpisodeProps[] | null;
    track: TensorTrackProps | null;
    voice: TensorVoiceProps | null;
    subtitle: TensorSubtitleProps | null;
    poster: string;
    scale: "auto" | "vertical" | "horizontal";
    modes: TensorModesProps;
    disableControls: TensorControlsDisabledProps;
    allowedFullscreenControls: TensorAllowedFullscreenControlsProps;
    isFirstStart: boolean;
    isError: boolean;
    isPlaying: boolean;
    isLoading: boolean;
    isEnded: boolean;
    isLooped: boolean;
    isMuted: boolean;
    volume: number;
    speed: number;
    error: { message: string; code: number } | null;
    preload: "none" | "metadata" | "auto";
    currentTime: number;
    totalTime: number;
    timeSkip: string;
}

// Основные функции управления
export interface TensorControlsProps {
    setTensorState: (state: Partial<UseTensorStateProps>) => void;
    handleVolumeChange: (newVolume: number) => void;
    handleTimeSkip: (direction: "forward" | "backward") => void;
    handleTimeNumberSkip: (targetTime: number) => void;
    handleSpeedChange: (type: "increase" | "decrease") => void;
    handleToggleMode: (mode: "theater" | "mini" | "fullscreen") => void;
    handleScaleChange: (scale: "auto" | "vertical" | "horizontal") => void;
    handleIncreaseSpeed: () => void;
    handleDecreaseSpeed: () => void;
    startAnimation: () => void;
    stopAnimation: () => void;
    updateProgress: () => void;
    toggleMute: () => void;
    toggleLoop: () => void;
    handleTogglePlay: () => void;
    handleRepeat: () => void;
    toggleCaptions: () => void;
}

export interface UseTensorVFXProps {
    useMovieMode?: boolean;
    useAberrationEffect?: boolean;
    useBlackoutEffect?: boolean;
    useLightingEffect?: boolean;
}

export interface UseTensorProps extends Partial<Pick<UseTensorStateProps,
    | "volume"
    | "speed"
    | "preload"
    | "timeSkip"
    | "trackList"
    | "voiceList"
    | "subtitleList"
    | "episodes"
    | "poster"
>> {
    loop?: boolean;
    mute?: boolean;
    disableControls?: Partial<TensorControlsDisabledProps>;
    allowedFullscreenControls?: Partial<TensorAllowedFullscreenControlsProps>;
}

export type UseTensorPlaybackProps = Pick<UseTensorStateProps,
    | "isError"
    | "isFirstStart"
    | "timeSkip"
    | "speed"
    | "track"
    | "voice"
    | "subtitle"
    | "trackList"
    | "voiceList"
    | "subtitleList"
    | "volume"
    | "currentTime"
    | "totalTime"
    | "isLooped"
    | "isMuted"
> & Pick<TensorContextProps, "videoRef"> & Pick<TensorControlsProps,
    | "setTensorState"
    | "startAnimation"
    | "stopAnimation"
    | "updateProgress"
>;

export type UseTensorShortcutsProps = Pick<UseTensorStateProps,
    | "volume"
    | "speed"
    | "totalTime"
    | "disableControls"
> & Pick<TensorContextProps, "playerRef"> & Pick<TensorControlsProps,
    | "toggleLoop"
    | "toggleMute"
    | "handleTogglePlay"
    | "handleRepeat"
    | "toggleCaptions"
    | "handleVolumeChange"
    | "handleTimeSkip"
    | "handleIncreaseSpeed"
    | "handleDecreaseSpeed"
    | "handleToggleMode"
    | "handleTimeNumberSkip"
>;
export type UseTensoreTimeline =  Pick<TensorContextProps, "videoRef">;

export type UseTensorModeProps = Pick<TensorContextProps, "playerRef"> & Pick<TensorControlsProps, "setTensorState">;

export type UseTensorUIProps = Pick<UseTensorStateProps, "isPlaying"|"modes">;