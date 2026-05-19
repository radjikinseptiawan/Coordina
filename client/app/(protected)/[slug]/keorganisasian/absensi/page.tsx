import AbsensiKeorganisasianTemplate from "@/app/features/keorganisasian/absensi/kab.template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Keorganisasian | Absensi",
    description: "Menampilkan Absensi Organisasi"
}

export default async function Page() {
    return <AbsensiKeorganisasianTemplate />
}