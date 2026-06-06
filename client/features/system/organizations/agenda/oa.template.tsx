"use client";
import Containers from "@/_shared/layouts/components/containers";
import { OrganizationsAgendaControllers } from "./oa.controllers/oa.controllers";
import OrganizationAddDialogs from "./oa.dialogs/add.dialogs";
import DataTableOrganizationsAgenda from "./oa.tables/data-tables";
import DetailCardsDialog from "./oa.dialogs/detail-cards.dialogs";

export default function OrganizationsTemplate() {
  return (
    <Containers title="Agenda" description={"Organization Agenda"}>
      <OrganizationsAgendaControllers />
      <DataTableOrganizationsAgenda />
      <OrganizationAddDialogs />
    </Containers>
  );
}
