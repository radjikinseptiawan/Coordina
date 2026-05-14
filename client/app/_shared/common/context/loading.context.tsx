"use client"
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

interface ContextType { isLoading: boolean, setLoading: (val: boolean) => void }

const LoadingContext = createContext<ContextType | undefined>(undefined)

export default function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setLoading] = useState<boolean>(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext)
    if (!context) {
        throw new Error("Context gagal dijalankan!")
    }

    return context
}