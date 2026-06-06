import { DetailAgenda } from "@/_shared/custom/@types/agenda.type";
import { Button } from "@/components/ui/button";
import { convertDate } from "@/lib/utils";
import { historyAbsence } from "@/service/organizations/attendance.service";
import { Download } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function BoxLeftComponent({
  data,
  children,
}: {
  children: ReactNode;
  data: DetailAgenda;
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <div>
        <div className="flex my-2 mx-1 gap-1">
          <p className="font-semibold">Date :</p>
          <p>{convertDate(data?.tanggal_agenda)}</p>
        </div>

        <div className="flex my-2 mx-1 gap-1">
          <p className="font-semibold">Time : </p>
          <p>
            {data?.start_at} - {data?.end_at}
          </p>
        </div>

        <div className="flex my-2 mx-1 gap-1">
          <p className="font-semibold">Status Agenda :</p>
          <p>{data?.status_agenda}</p>
        </div>

        <div className="flex my-2 mx-1 gap-1">
          <p className="font-semibold">Type :</p>
          <p>{data?.is_online}</p>
        </div>

        <div className="flex my-2 mx-1 gap-1">
          <p className="font-semibold">Location :</p>
          <p className="flex items-center gap-1">
            <a
              className="text-blue-600 underline"
              href={data?.lokasi_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data?.lokasi || "-"}
            </a>
          </p>
        </div>

        <div className="flex my-2 mx-1 gap-1">
          <p className="font-semibold">Virtual Link :</p>
          <p className="flex items-center gap-1">
            {data?.meetingLink ? (
              <a
                className="text-blue-600 underline"
                href={data.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join
              </a>
            ) : (
              "-"
            )}
          </p>
        </div>

        <div className="flex flex-col my-2 mx-1 gap-1">
          <p className="font-semibold">Note :</p>
          <div className="border rounded-md h-32 w-64 p-2 overflow-y-auto">
            <textarea
              className="text-sm resize-none w-full h-full"
              defaultValue={data?.note ?? "-"}
              disabled={data?.note ? true : false}
            />
          </div>
        </div>

        <div className="flex gap-2 items-center my-2 mx-1">
          <p className="font-semibold">Lampiran :</p>
          {data?.lampiran ? (
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          ) : (
            "-"
          )}
        </div>
      </div>
      <div>
        <div className="flex my-2 mx-1 gap-1">
          <p className="font-semibold">Status:</p>
          <p>{data?.result?.status ?? "-"}</p>
        </div>
        <div className="flex my-2 mx-1 gap-1">
          <p className="font-semibold">Checkin At :</p>
          <p>{data?.result?.checkin_at ?? "-"}</p>
        </div>
        <div className="flex my-2 mx-1 gap-1">{children}</div>
      </div>
    </div>
  );
}
