import AdmIngcomingLettersTemplate from "@/features/system/administrations/incoming-letters/ai.template";
import OrganizationsTemplate from "@/features/system/organizations/agenda/oa.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surat Masuk",
};

export default async function Page() {
  return <AdmIngcomingLettersTemplate />;
}
