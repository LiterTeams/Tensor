"use client";
import { useTensor } from "../hooks";
import { CustomImage } from ".";
export const TensorOverlayPoster = () => {
    const { player: { isFirstStart, poster }, playback: { handleFirstStart } } = useTensor();
    if (!isFirstStart) return null;
    return <CustomImage className="z-[2] object-cover pointer-events-auto"  loading="lazy" quality={75} onClick={handleFirstStart} fill src={poster} alt="Видео постер" />;
}