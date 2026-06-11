import { Agenda } from "@/_shared/custom/@types/agenda.type";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const changeColorStatus = (value: string) => {
  if (value === "COMING_SOON") {
    return <p className="text-yellow-500">Coming Soon</p>;
  }

  if (value === "ON_GOING") {
    return <p className="text-blue-500">On Going</p>;
  }

  if (value === "SUCCESS") {
    return <p className="text-green-500">Success</p>;
  }

  if (value === "FAILED") {
    return <p className="text-red-500">Failed</p>;
  }
};

export const columns: ColumnDef<Agenda>[] = [
  {
    accessorKey: "agenda_name",
    header: "Agenda Name",
  },
  {
    accessorKey: "priority_level",
    header: "Priority Level",
  },
  {
    accessorKey: "tanggal_agenda",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tanggal_agenda"));
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    id: "time_range",
    header: "Time",
    cell: ({ row }) => {
      const start = row.original.start_at;
      const end = row.original.end_at;
      return <p>{`${start} - ${end}`}</p>;
    },
  },
  {
    accessorKey: "is_online",
    header: "Type",
    cell: ({ row }) => {
      const valueText: string = row.getValue("is_online");
      return (
        <span
          className={`${valueText === "offline" ? "text-blue-400" : "text-green-400"}`}
        >
          {valueText}
        </span>
      );
    },
  },
  {
    accessorKey: "lokasi",
    header: "Location",
    cell: ({ row }) => {
      return (
        <span>{row.getValue("lokasi") ? row.getValue("lokasi") : "-"}</span>
      );
    },
  },
  {
    accessorKey: "status_agenda",
    header: "Status Agenda",
    cell: ({ row }) => {
      return changeColorStatus(row.original.status_agenda);
    },
  },
  {
    header: "Detail",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <Button
          onClick={() => router.push(`?absence="true"&id=${row.original.id}`)}
        >
          Detail
        </Button>
      );
    },
  },
];
