"use client"

import { Button } from "@radix-ui/themes"
import DashboardControllers from "./controllers/controllers"
import AddDashboardDialogs from "./dialogs/add.dialogs"
import { DashboardContextProvider } from "./da.context"
import DashboardContent from "./content/da.content"

export default function DashboardTemplate() {
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