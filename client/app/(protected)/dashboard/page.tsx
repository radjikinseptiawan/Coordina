import DashboardTemplate from "@/app/features/dashboard/da.template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: " Coordina - Dashboard"
}

export default async function Page() {
    return <DashboardTemplate />
}