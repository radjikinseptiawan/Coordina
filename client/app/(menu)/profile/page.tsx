import MenuProfileTemplate from "@/features/menu/profile/mp.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};
export default async function Page() {
  return <MenuProfileTemplate />;
}
