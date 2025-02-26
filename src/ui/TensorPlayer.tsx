import { FC } from "react";
import { TensorProvider, TensorPlayerContent } from "../ui";
import { TensorPlayerProps } from "../types";

export const TensorPlayer: FC<TensorPlayerProps & { id: string }> = ({ id, className = "", ...props }) => {
    return (
        <TensorProvider id={id} {...props}>
            <TensorPlayerContent className={className} />
        </TensorProvider>
    );
};

