import AgendaKeorganisasianTemplate from "@/app/features/keorganisasian/agenda/kag.template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Keorganisasian | Agenda",
    description: "Menampilkan Agenda Organisasi"
}

export default async function Page() {
    return <AgendaKeorganisasianTemplate />
}