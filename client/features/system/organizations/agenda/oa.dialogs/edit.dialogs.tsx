import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import OrganizationAddDialogs from "./add.dialogs";
import OrganizationAgendaForms from "../oa.forms/oa.forms";
import { Button } from "@/components/ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { agendaSpesific } from "@/service/organizations/agenda.service";
import { Agenda } from "@/_shared/custom/@types/agenda.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function OrganizationEditdialogs() {
  const [initialValue, setInitialValue] = useState<Agenda>();
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const id = useSearchParams().get("id");
  const query = useSearchParams().get("mode");
  const close = () => {
    router.push("agenda");
  };

  const getAgendaSpesific = async () => {
    if (!params) return;
    const response = await agendaSpesific(params.slug as string, id as string);
    const result = response.response.agenda;
    setInitialValue(result);
  };

  useEffect(() => {
    getAgendaSpesific();
  }, [query]);
  return (
    <>
      <Dialog onOpenChange={close} open={query == "edit" ? true : false}>
        <DialogContent>
          <DialogTitle>Edit</DialogTitle>
          <OrganizationAgendaForms initialData={initialValue}>
            <div className="flex gap-2 my-2 justify-end">
              <Button type="submit" variant={"outline"}>
                <Edit /> Edit
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => router.push(`agenda?delete=${initialValue?.id}`)}
              >
                <Trash /> Delete
              </Button>
            </div>
          </OrganizationAgendaForms>
        </DialogContent>
      </Dialog>
    </>
  );
}
