"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { IContext } from "./interfaces/da.interfaces";


const DashboardContext = createContext<IContext | null>(null)

export const DashboardContextProvider = ({ children }: { children: ReactNode }) => {
    const [open, setIsOpen] = useState<boolean>(false)
    return (
        <DashboardContext.Provider value={{ open, setIsOpen }}>
            {children}
        </DashboardContext.Provider>
    )
}


export const useDashboardContext = () => {
    const context = useContext(DashboardContext)

    if (!context) {
        throw new Error("useDashboardContext must be used within DashboardContextProvider")
    }

    return context
}