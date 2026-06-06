"use client";
import Containers from "@/_shared/layouts/components/containers";
import AttendanceOrgCards from "./oat.components/oat.cards";

export default function AttendanceOrganizationTemplate() {
  return (
    <Containers
      title="Attendance"
      description={"Attendance page for fill your absency"}
    >
      <AttendanceOrgCards />
    </Containers>
  );
}
