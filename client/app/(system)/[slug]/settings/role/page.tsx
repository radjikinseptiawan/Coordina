import SettingsRoleSystemTemplate from "@/features/system/settings/role/sr.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | RBAC",
};

export default async function Page() {
  return await (<SettingsRoleSystemTemplate />);
}
