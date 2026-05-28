import { decoderToken } from "@/_shared/custom/hooks/decoder";
import SystemNavigation from "@/_shared/layouts/navigation/SystemNavigation";
import { ReactNode } from "react";

export default async function SystemLayout({
  children,
}: {
  children: ReactNode;
}) {
  await decoderToken();
  return <SystemNavigation>{children}</SystemNavigation>;
}
