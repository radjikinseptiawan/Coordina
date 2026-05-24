import MenuDashboardTemplate from "@/features/menu/dashboard/md.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function Page() {
  return <MenuDashboardTemplate />;
}
