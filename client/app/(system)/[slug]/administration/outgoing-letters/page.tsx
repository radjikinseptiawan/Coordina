import AdmOutgoingLettersTemplate from "@/features/system/administrations/outgoing-letters/ao.template";
import OrganizationsTemplate from "@/features/system/organizations/agenda/oa.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surat Keluar",
};

export default async function Page() {
  return <AdmOutgoingLettersTemplate />;
}
