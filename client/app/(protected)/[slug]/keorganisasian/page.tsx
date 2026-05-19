import DashboardKeorganisasianTemplate from "@/app/features/keorganisasian/dashboard/kd.template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Keorganisasian",
    description: "Dashboard utama organisasi"
}

export default async function Page() {
    return <DashboardKeorganisasianTemplate />
}