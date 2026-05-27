"use client";
import { useForm } from "react-hook-form";
import {
  MenuDashboardAddSchemaType,
  MenuDashboardAddType,
} from "../md.forms/md.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useMenuDashboardAddForms = () => {
  return useForm({
    resolver: zodResolver(MenuDashboardAddSchemaType),
    defaultValues: {
      area_operational: "",
      city_operational: "",
      created_date: "",
      organization_mission: [],
      organization_background: "",
      organization_icon: undefined,
      organization_vision: "",
      organization_name: "",
      short_name: "",
    },
  });
};

export const fieldAddCards: MenuDashboardAddType[] = [
  {
    name: "organization_name",
    label: "Organization Name",
    type: "text",
  },
  {
    name: "short_name",
    label: "Organization Short Name",
    type: "text",
  },
  {
    name: "created_date",
    label: "Organization Birth",
    type: "date",
  },
];

export const fieldTextareaAddCards: MenuDashboardAddType[] = [
  {
    name: "organization_background",
    label: "Organization Background",
  },
  {
    name: "organization_vision",
    label: "Organization Vision",
  },
];
