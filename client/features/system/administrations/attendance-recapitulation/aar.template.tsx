"use client";
import Containers from "@/_shared/layouts/components/containers";
import AttendanceRecapAdmControllers from "./aar.controllers/aar.controllers";
import { AttendanceListTable } from "./aar.components/aar.table";
import { AttendanceCrossTable } from "./aar.components/aar.all-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import TableRecapAdministrations from "./table/table";

export default function AttendanceRecapAdmTemplate() {
  const router = useRouter();
  const part = useSearchParams().get("part");
  useEffect(() => {
    router.push("?part=all");
  }, []);
  return (
    <Containers
      title="Attendance Recapitulation"
      description={
        "This is the page for you see the recapitulation data of your agenda"
      }
    >
      <div className="flex flex-col gap-y-3">
        <TableRecapAdministrations />
      </div>
    </Containers>
  );
}
