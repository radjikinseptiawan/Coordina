import AdmMemberControllers from "@/features/system/administrations/members/am.controllers/am.controllers";
import AdmMembersTemplate from "@/features/system/administrations/members/am.template";
import OrganizationsTemplate from "@/features/system/organizations/agenda/oa.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members",
};

export default async function Page() {
  return <AdmMembersTemplate />;
}
