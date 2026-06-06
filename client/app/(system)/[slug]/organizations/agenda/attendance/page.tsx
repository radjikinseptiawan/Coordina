import AttendanceOrganizationTemplate from "@/features/system/organizations/attendance/oat.template";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Agenda | Attendance",
};

export default async function Page() {
  return <AttendanceOrganizationTemplate />;
}
