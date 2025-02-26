"use client";
import { useContext } from "react";
import { TensorContext } from "../ui";
export const useTensor = () => {
    const context = useContext(TensorContext);
    if (!context) throw new Error("useTensor must be used within a <TensorProvider>");
    return context;
};
