import SettingsOrganizationsTemplate from "@/features/system/settings/organizations/so.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Organizations",
};

export default function Page() {
  return <SettingsOrganizationsTemplate />;
}
