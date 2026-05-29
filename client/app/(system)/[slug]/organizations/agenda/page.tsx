import OrganizationsTemplate from "@/features/system/organizations/agenda/oa.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda",
};

export default async function Page() {
  return <OrganizationsTemplate />;
}
