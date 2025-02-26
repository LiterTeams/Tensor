import { TensorOverlayError, TensorOverlayVFX, TensorOverlayPoster } from "./";

export const TensorOverlays = () => {
    return(
        <>
            <TensorOverlayPoster />
            <TensorOverlayError />
            <TensorOverlayVFX />
        </>
    )
}