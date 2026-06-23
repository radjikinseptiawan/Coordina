"use client";
import Containers from "@/_shared/layouts/components/containers";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Edit2 } from "lucide-react";
import SystemRoleControllers from "./sr.controllers/sr.controllers";
import CardSystemRoleComponents from "./sr.components/sr.cards.components";
import AddSettingRoleDialogs from "./sr.dialogs/add.dialogs";
import EditSettingsRoleDialogs from "./sr.dialogs/edit.dialogs";
import { useEffect, useState } from "react";
import { getAllRole } from "@/service/organizations/members.service";
import { useParams } from "next/navigation";

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

export default function SettingsRoleSystemTemplate() {
  const [roles, setRoles] = useState();
  const params = useParams().slug as string;
  const getRole = async () => {
    const data = await getAllRole(params);
    setRoles(data.data);
  };

  useEffect(() => {
    getRole();
  }, []);

  if (!roles) return null;
  return (
    <Containers
      title="Role Based Access Controls"
      description={"This page is for settings your organizations structural"}
    >
      <SystemRoleControllers />
      <div className="grid gap-x-2 gap-y-3 grid-cols-2 md:grid-cols-4">
        <CardSystemRoleComponents role={roles} />
      </div>
      <AddSettingRoleDialogs />
      <EditSettingsRoleDialogs />
    </Containers>
  );
}
