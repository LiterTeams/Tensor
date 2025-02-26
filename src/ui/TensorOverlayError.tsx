"use client";
import { useTensor } from "../hooks";
import { IcoError } from "src/icons";
import { TensorOverlay } from ".";

export const TensorOverlayError = () => {
    const { player: { error, isError } } = useTensor();
    if (!isError) return null;

    return(
        <TensorOverlay className="flex flex-col gap-2 flex-center pointer-events-none animate-pulse">
            <IcoError className="text-orange-500 duration-300" size={64} />
            <h2 className="text-orange-500 duration-300 font-bold">{error?.message || "Неизвестная ошибка"} | {error?.code || 404}</h2>
        </TensorOverlay>
    )
}