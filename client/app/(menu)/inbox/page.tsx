import InboxMenuDashboardTemplate from "@/features/menu/inbox/inbox.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox",
};

export default async function Page() {
  return <InboxMenuDashboardTemplate />;
}
