import SystemAgendaTemplate from "@/features/system/agenda/sa.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda",
};

export default async function Page() {
  return <SystemAgendaTemplate />;
}
