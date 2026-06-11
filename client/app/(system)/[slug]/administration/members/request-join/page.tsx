import AdmRequestJoinTemplate from "@/features/system/administrations/request-join/arj.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Join",
};

export default async function Page() {
  return <AdmRequestJoinTemplate />;
}
