import { decoderToken } from "@/_shared/custom/hooks/decoder";
import SystemNavigation from "@/_shared/layouts/navigation/SystemNavigation";
import TableProviders from "@/providers/tableProviders";
import { ReactNode } from "react";

export default async function SystemLayout({
  children,
}: {
  children: ReactNode;
}) {
  await decoderToken();
  return (
    <SystemNavigation>
      <TableProviders>{children}</TableProviders>
    </SystemNavigation>
  );
}
