import AttendanceRecapAdmTemplate from "@/features/system/administrations/attendance-recapitulation/aar.template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attendance Recapitulation",
};

export default async function Page() {
  return <AttendanceRecapAdmTemplate />;
}
