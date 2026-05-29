"use client";
import Containers from "@/_shared/layouts/components/containers";
import { OrganizationsAgendaControllers } from "./oa.controllers/oa.controllers";
import OrganizationAddDialogs from "./oa.dialogs/add.dialogs";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrganizationAgendaCards } from "./oa.components/oa.cards";
import DataTableOrganizationsAgenda from "./oa.tables/data-tables";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function OrganizationsTemplate() {
  return (
    <Containers title="Agenda" description={"Organization Agenda"}>
      <OrganizationsAgendaControllers />
      <DataTableOrganizationsAgenda />
      <OrganizationAddDialogs />
    </Containers>
  );
}
