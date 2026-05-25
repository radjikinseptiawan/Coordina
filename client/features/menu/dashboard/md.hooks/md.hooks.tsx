"use client";
import { useForm } from "react-hook-form";
import { MenuDashboardAddSchemaType } from "../md.forms/md.schema";
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
