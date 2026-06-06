import AuditLogOrganizationTemplate from "@/features/system/organizations/audit-log/oal.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Log",
};
export default async function Page() {
  return <AuditLogOrganizationTemplate />;
}
