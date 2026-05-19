import AuditLogKeorganisasianTemplate from "@/app/features/keorganisasian/audit log/kau.template";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Keorganisasian | Audit Log",
    description: "Dashboard utama organisasi"
}

export default async function Page() {
    return <AuditLogKeorganisasianTemplate />
}