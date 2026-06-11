"use client";
import Containers from "@/_shared/layouts/components/containers";
import { OrganizationsAgendaControllers } from "./oa.controllers/oa.controllers";
import OrganizationAddDialogs from "./oa.dialogs/add.dialogs";
import DataTableOrganizationsAgenda from "./oa.tables/data-tables";
import DetailCardsDialog from "./oa.dialogs/detail-cards.dialogs";
import OrganizationEditdialogs from "./oa.dialogs/edit.dialogs";
import AlertDeleteDialog from "./oa.components/oa.alert";

export default function OrganizationsTemplate() {
  return (
    <Containers title="Agenda" description={"Organization Agenda"}>
      <OrganizationsAgendaControllers />
      <DataTableOrganizationsAgenda />
      <OrganizationAddDialogs />
      <OrganizationEditdialogs />
      <AlertDeleteDialog />
    </Containers>
  );
}
