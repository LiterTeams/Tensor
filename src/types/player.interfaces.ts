import { ReactNode } from "react";
import { TensorControlsDisabledProps, TensorAllowedFullscreenControlsProps, UseTensorStateProps } from ".";

export interface TensorOverlayProps {
    className?: string;
    children?: ReactNode;
}

export interface TensorTrackProps {
    source: string;
    label?: string;
}

export interface TensorSubtitleProps {
    source: string;
    label?: string;
    srclang?: string;
}

export interface TensorVoiceProps {
    source: string;
    label?: string;
}

export interface TensorEpisodeProps {
    start: number;
    end: number;
    title: string;
    description?: string;
}

export interface IconProps {
    color?: string;
    size?: number;
    className?: string;
}

export interface TensorPlayerProps extends
    Partial<Pick<UseTensorStateProps,
    | "trackList"
    | "voiceList"
    | "poster"
    | "subtitleList"
    | "episodes"
    >> {
    className?: string;
    disableControls?: Partial<TensorControlsDisabledProps>;
    allowedFullscreenControls?: Partial<TensorAllowedFullscreenControlsProps>
}