"use client"
import LoadingProvider from "@/app/_shared/common/context/loading.context";
import { ReactNode } from "react";

export default function GeneralProvider({ children }: { children: ReactNode }) {
    return (
        <LoadingProvider>
            {children}
        </LoadingProvider>
    )
}