import Containers from "@/_shared/layouts/components/containers";
import AuditLogPage from "./al.controllers/al.controllers";
import { Button } from "@/components/ui/button";

export default function AuditLogOrganizationTemplate() {
  return (
    <Containers
      title="Audit Log"
      description="Monitor all activities and changes inside your organization."
    >
      <AuditLogPage />
    </Containers>
  );
}
