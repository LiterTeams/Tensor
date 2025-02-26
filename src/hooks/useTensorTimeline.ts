"use client";
import { useRef, useEffect, MouseEvent, useState } from "react";
import { UseTensoreTimeline } from "../types";

export const useTensorTimeline = ({ videoRef }: UseTensoreTimeline) => {
    const [progress, setProgress] = useState(0);
    const [hoverWidth, setHoverWidth] = useState(0);
    const animationRef = useRef<number | null>(null);
    const timelineRef = useRef<HTMLDivElement | null>(null);

    const withVideoRef = <T extends (this: HTMLVideoElement, ...args: Parameters<T>) => ReturnType<T>>(fn: T) => {
        return function (...args: Parameters<T>): ReturnType<T> | undefined {
            const video = videoRef.current;
            if (!video || video.duration <= 0) return;
            return fn.apply(video, args);
        };
    };

    const withAnimationRef = <T extends (this: number, ...args: Parameters<T>) => ReturnType<T>>(fn: T) => {
        return function (...args: Parameters<T>): ReturnType<T> | undefined {
            const animation = animationRef.current;
            if (!animation) return;
            return fn.apply(animation, args);
        };
    };

    const updateProgress = withVideoRef(function () {
        setProgress((this.currentTime / this.duration) * 100);
        animationRef.current = requestAnimationFrame(updateProgress);
    });

    const startAnimation = withVideoRef(function () {
        animationRef.current = requestAnimationFrame(updateProgress);
    });

    const stopAnimation = withAnimationRef(function () {
        cancelAnimationFrame(this);
    });

    const handleManualRewind = withVideoRef(function (event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        this.currentTime = (offsetX / rect.width) * this.duration;
        updateProgress();
    });

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        setHoverWidth(offsetX);
    }

    const handleMouseLeave = () => setHoverWidth(0);

    useEffect(() => {
        return () => stopAnimation();
    }, []);

    return { timelineRef, progress, hoverWidth, startAnimation, stopAnimation, updateProgress, handleManualRewind, handleMouseMove, handleMouseLeave };
};