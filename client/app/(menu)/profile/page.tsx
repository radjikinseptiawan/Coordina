import { DetailUser } from "@/_shared/custom/@types/user.type";
import { decoderToken } from "@/_shared/custom/hooks/decoder";
import MenuProfileTemplate from "@/features/menu/profile/mp.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};
export default async function Page() {
  return <MenuProfileTemplate />;
}
