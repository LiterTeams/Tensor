"use client";
import { useCallback, useReducer } from "react";
import { initialTensorState } from "../utils";
import { UseTensorProps, UseTensorStateProps, TensorTrackProps, TensorVoiceProps, TensorSubtitleProps,} from "../types";

const playerReducer = (state: UseTensorStateProps, action: Partial<UseTensorStateProps>) => ({...state, ...action});

export const useTensorState = (props: UseTensorProps = {}) => {
    const [state, dispatch] = useReducer(playerReducer, initialTensorState(props));
    
    const setTensorState = useCallback((action: Partial<UseTensorStateProps>) => dispatch(action), []);
    const setTrackList = useCallback((tracks: TensorTrackProps[]) => dispatch({ trackList: tracks, track: tracks[0] || null }), []);
    const setVoiceList = useCallback((voices: TensorVoiceProps[]) => dispatch({ voiceList: voices, voice: voices[0] || null }), []);
    const setSubtitleList = useCallback((subtitles: TensorSubtitleProps[]) => dispatch({ subtitleList: subtitles, subtitle: subtitles[0] || null }), []);

    return { ...state, setTensorState, setTrackList, setVoiceList, setSubtitleList };
};