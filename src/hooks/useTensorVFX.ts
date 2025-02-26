"use client";
import { useCallback, useReducer } from "react";
import { initialTensorVFX } from "../utils";
import { UseTensorVFXProps } from "../types";

const VFXReducer = (state: UseTensorVFXProps, action: Partial<UseTensorVFXProps>) => ({
    ...state,
    ...action,
});

export const useTensorVFX = (props: Partial<UseTensorVFXProps> = {}) => {
    const [state, dispatch] = useReducer(VFXReducer, initialTensorVFX(props));

    const setTensorVFX = useCallback((action: Partial<UseTensorVFXProps>) => dispatch(action), []);

    return { ...state, setTensorVFX };
};
