"use client"

import { Button } from "@radix-ui/themes"
import DashboardControllers from "./controllers/controllers"
import AddDashboardDialogs from "./dialogs/add.dialogs"
import { DashboardContextProvider } from "./da.context"
import DashboardContent from "./content/da.content"
import { useEffect } from "react"
import axios from "axios"
import { serverUrl } from "@/utils/connection"

export default function DashboardTemplate() {
    const getData = async () => {
        const response = await axios.get(`/api/dashboard`)

        const data = await response.data
        console.log(data)
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <DashboardContextProvider>
            <div>
                <div className="max-h-screen max-w-screen flex items-center justify-center p-4">
                    <DashboardControllers />
                </div>
                <DashboardContent />
            </div>
            <AddDashboardDialogs />
        </DashboardContextProvider>
    )
}