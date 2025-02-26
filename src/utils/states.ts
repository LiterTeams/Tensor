import { 
    TensorModesProps, TensorControlsDisabledProps, TensorAllowedFullscreenControlsProps,
    UseTensorProps, UseTensorStateProps, UseTensorVFXProps,
} from "../types";

const _initialStateModes: TensorModesProps = {
    isFullscreen: false,
    isMiniPlayer: false,
    isTheatre: false,
}

const _initialStateDisables: TensorControlsDisabledProps = {
    all: false,
    settings: true,
    fullscreen: false,
    controls: false,
    theatre: true,
    miniPlayer: true,
    vfx: false,
    quality: false,
    voice: false,
    subtitle: false,
    shortcuts: false,
}

const _initialStateAllowed: TensorAllowedFullscreenControlsProps = {
    settings: true,
    controls: true,
    vfx: true,
    quality: true,
    voice: true,
    subtitle: true,
    shortcuts: true,
}

export const initialTensorState = (props: UseTensorProps): UseTensorStateProps => ({
    trackList: props.trackList ?? [],
    voiceList: props.voiceList ?? [],
    subtitleList: props.subtitleList ?? [],
    episodes: props.episodes ?? null,
    poster: props.poster ?? "https://avatars.mds.yandex.net/i?id=b3c3bafc6c58a82e762abe184fcc2333_l-5263029-images-thumbs&n=13",
    scale: "auto",
    track: props.trackList?.[0] ?? null,
    voice: props.voiceList?.[0] ?? null,
    subtitle: props.subtitleList?.[0] ?? null,
    isFirstStart: true,
    isError: false,
    isPlaying: false,
    isLoading: true,
    isEnded: false,
    isLooped: !!props.loop,
    isMuted: !!props.mute,
    modes: _initialStateModes,
    disableControls: { ..._initialStateDisables, ...props.disableControls ?? {} },
    allowedFullscreenControls: { ..._initialStateAllowed,  ...props.allowedFullscreenControls ?? {}},
    volume: props.volume ?? 0.25,
    speed: props.speed ?? 1,
    preload: props.preload ?? "auto",
    error: null,
    currentTime: 0,
    totalTime: 0,
    timeSkip: props.timeSkip ?? "15s",
});

export const initialTensorVFX = (props: Partial<UseTensorVFXProps> = {}): UseTensorVFXProps => ({
    useMovieMode: !!props.useMovieMode,
    useAberrationEffect: !!props.useAberrationEffect,
    useBlackoutEffect: !!props.useBlackoutEffect,
    useLightingEffect: !!props.useLightingEffect,
});

export const btnVariants = {
    "primary": "flex items-center justify-center size-12",
    "secondary": "duration-300 flex justify-start p-2 hover:bg-white/25",
    "additional": "btn-additional",
    "none": null,
}

export const btnActiveVariants = {
    "primary": "bg-orange-500",
    "secondary": "bg-white/25",
    "additional": "",
    "none": null,
}