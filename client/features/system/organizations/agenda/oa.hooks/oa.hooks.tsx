import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OrganizationAgendaSchemaType } from "../oa.forms/oa.schema";

export function UseOrganizationAgendaForms() {
  const todayString = new Date().toLocaleDateString("sv-SE");
  return useForm({
    resolver: zodResolver(OrganizationAgendaSchemaType),
    defaultValues: {
      agenda_name: "",
      is_online: "offline",
      lampiran: "",
      start_at: "",
      end_at: "",
      lokasi: "",
      link_lokasi: "",
      meetingLink: "",
      password: "",
      note: "",
      tanggal_agenda: todayString,
    },
  });
}
