"use client";
import Containers from "@/_shared/layouts/components/containers";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Edit2 } from "lucide-react";
import SystemRoleControllers from "./sr.controllers/sr.controllers";
import CardSystemRoleComponents from "./sr.components/sr.cards.components";
import AddSettingRoleDialogs from "./sr.dialogs/add.dialogs";
import EditSettingsRoleDialogs from "./sr.dialogs/edit.dialogs";

const role = [
  "Chairman",
  "Vice Chairman",
  "General Secretary",
  "General Treasurer",
  "Head of Department",
  "Vice Head of Department",
  "Secretary of Departmen",
  "Treasurer of Department",
  "Members",
];

// TODO: BARU BIKIN FRONTEND NYA DOANG
export default function SettingsRoleSystemTemplate() {
  return (
    <Containers
      title="Role Based Access Controls"
      description={"This page is for settings your organizations structural"}
    >
      <SystemRoleControllers />
      <div className="grid gap-x-2 gap-y-3 grid-cols-2 md:grid-cols-4">
        <CardSystemRoleComponents role={role} />
      </div>
      <AddSettingRoleDialogs />
      <EditSettingsRoleDialogs />
    </Containers>
  );
}
