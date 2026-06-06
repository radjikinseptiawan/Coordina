import { Agenda } from "@/_shared/custom/@types/agenda.type";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const columns: ColumnDef<Agenda>[] = [
  {
    accessorKey: "agenda_name",
    header: "Agenda Name",
  },
  {
    accessorKey: "potential_level",
    header: "Prioriy Level",
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
