import TopNavigation from "@/_shared/layouts/navigation/TopNavigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import jwt from "jsonwebtoken";
import { decoderToken } from "@/_shared/custom/hooks/decoder";
import { SpesificUsersType } from "@/_shared/custom/@types/user.type";
export default async function MenuLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user: SpesificUsersType | any = await decoderToken();
  return (
    <div>
      <TopNavigation email={user?.email} username={user?.username} />
      <div className="mt-20">{children}</div>
    </div>
  );
}
