import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { agendaSpesific } from "@/service/organizations/agenda.service";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { convertDate } from "@/lib/utils";
import { Agenda } from "@/_shared/custom/@types/agenda.type";
import { Edit } from "lucide-react";

export default function DetailCardsDialog({ data }: { data: Agenda[] }) {
  const router = useRouter();
  const params = useSearchParams().get("absence");
  const id = useSearchParams().get("id");

  const result = data.find((item) => item.id === id);

  const isDialogOpen = params === `"true"` ? true : false;

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="h-80 w-72 md:w-xl overflow-y-scroll">
        <DialogTitle>Detail</DialogTitle>
        <DialogDescription>This Detail of Agenda</DialogDescription>
        <span>
          <h2 className="font-bold text-xl">{result?.agenda_name}</h2>
        </span>

        <div className="flex gap-x-12 flex-col md:flex-row">
          <div>
            <span>
              <p className="font-semibold">Type</p>
              <p>{result?.is_online}</p>
            </span>

            <span>
              <p className="font-semibold">Priority Level</p>
              <p>{result?.priority_level}</p>
            </span>

            <span className="w-72">
              <p className="font-semibold">Note</p>
              <textarea
                defaultValue={`${result?.note as string}`}
                disabled
                className="w-52 h-32 border p-2 rounded-md resize-none overflow-y-auto overflow-x-hidden"
              ></textarea>
            </span>
            <span>
              <p className="font-semibold">Date</p>
              <p>{convertDate(result?.tanggal_agenda)}</p>
            </span>

            <span>
              <p className="font-semibold">Status</p>
              <p>{result?.status_agenda}</p>
            </span>
          </div>

          <div>
            <span>
              <p className="font-semibold">Time</p>
              <p>
                {result?.start_at} - {result?.end_at}
              </p>
            </span>

            <span>
              <p className="font-semibold">Status Agenda</p>
              <p>{result?.status_agenda}</p>
            </span>

            <span>
              <p className="font-semibold">Virtual Link</p>
              <a href={result?.meetingLink as string} target="_blank">
                {result?.meetingLink ? "Click" : "-"}
              </a>
            </span>

            <span>
              <p className="font-semibold">Virtual Password</p>
              <p>{result?.room_pass !== "" ? result?.room_pass : "-"}</p>
            </span>

            <span>
              <p className="font-semibold">Location</p>
              <a href={result?.lokasi_link as string} target="_blank">
                {result?.lokasi}
              </a>
            </span>

            <span>
              <p className="font-semibold">Lampiran : </p>
              <p>{result?.lampiran !== null ? result?.lampiran : "-"}</p>
            </span>
          </div>
        </div>

        <div className="flex px-2 py-1 justify-end gap-2">
          <DialogClose asChild>
            <Button
              variant={"destructive"}
              onClick={() => {
                router.push("agenda");
              }}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            variant={"secondary"}
            onClick={() => router.push(`agenda?mode=edit&id=${id}`)}
          >
            <Edit /> Edit
          </Button>
          <Button onClick={() => router.push(`agenda/attendance?agenda=${id}`)}>
            Absence
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
