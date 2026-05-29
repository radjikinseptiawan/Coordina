import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
export type AgendaStatus = "COMING_SOON" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
export type AgendaType = "online" | "offline";

export type Agenda = {
  agenda_name: string;
  tanggal_agenda: string;
  status_agenda: AgendaStatus;
  is_online: AgendaType;
  lokasi: string;
  lokasi_link: string | null;
  meetingLink?: string;
  room_pass?: string;
  note?: string;
  lampiran?: string;
  start_at: string;
  end_at: string;
  created_by_id: string;
};

// Kalo berhasil warna hijau
// Kalo gagal warna merah
// Kalo In progress warna biru
// Kalo Cooming Soon warna Kuning

const statusColor = (value: string) => {
  if (value === "COMING_SOON") {
    return <span className="text-yellow-400">{value}</span>;
  }

  if (value === "IN_PROGRESS") {
    return <span className="text-blue-500">{value}</span>;
  }

  if (value === "FAILED") {
    return <span className="text-red-500">{value}</span>;
  }

  if (value === "SUCCESS") {
    return <span className="text-green-500">{value}</span>;
  }
};

export const columns: ColumnDef<Agenda>[] = [
  {
    accessorKey: "agenda_name",
    header: "Agenda Name",
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
    accessorKey: "lokasi_link",
    header: "Location Link",
    cell: ({ row }) => {
      return (
        <a href={`${row.getValue("lokasi_link")}`} target="_blank">
          {row.getValue("lokasi_link") ? row.getValue("lokasi_link") : "-"}
        </a>
      );
    },
  },
  {
    accessorKey: "meetingLink",
    header: "Online Link",
    cell: ({ row }) => {
      return (
        <a href={`${row.getValue("meetingLink")}`} target="_blank">
          {row.getValue("meetingLink") ? row.getValue("meetingLink") : "-"}
        </a>
      );
    },
  },
  {
    accessorKey: "room_pass",
    header: "Password Room",
    cell: ({ row }) => {
      const [show, setShow] = useState<boolean>(false);
      return (
        <div>
          <input
            onChange={() => setShow(!show)}
            disabled
            type={show ? "text" : "password"}
            value={`${row.getValue("room_pass")}`}
          />
          <Button
            variant={"ghost"}
            className="text-gray-300"
            onClick={() => setShow(!show)}
          >
            {show ? <EyeOff /> : <EyeIcon />}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "status_agenda",
    header: "Status",
    cell: ({ row }) => {
      const value: string = row.getValue("status_agenda");
      return statusColor(value);
    },
  },
  {
    accessorFn: () => console.log("test"),
    header: "Detail",
    cell: ({ row }) => {
      return <Button>Detail</Button>;
    },
  },
];
