import Containers from "@/_shared/layouts/components/containers";
import AdmMemberControllers from "./am.controllers/am.controllers";
import DataTableAdmMembers from "./am.table/table";
import InviteDialogsAdmMembers from "./am.dialogs/invite.dialogs";

export default function AdmMembersTemplate() {
  return (
    <Containers
      title="Members"
      description={"This section containt the list yours organizations members"}
    >
      <div className="flex gap-4 flex-col">
        <AdmMemberControllers />
        <DataTableAdmMembers />
      </div>
      <InviteDialogsAdmMembers />
    </Containers>
  );
}
