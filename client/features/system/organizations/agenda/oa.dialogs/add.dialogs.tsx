import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import OrganizationAgendaForms from "../oa.forms/oa.forms";

export default function OrganizationAddDialogs() {
  const showUrl = useSearchParams().get("add");
  const router = useRouter();
  return (
    <Dialog
      open={showUrl == `"true"` ? true : false}
      onOpenChange={() => router.push("agenda")}
    >
      <DialogContent className="w-80 md:w-xl">
        <DialogTitle>Add Agenda</DialogTitle>
        <DialogDescription>
          Fill these field to make an agenda
        </DialogDescription>
        <div>
          <OrganizationAgendaForms>
            <div className="flex gap-2 justify-end">
              <DialogClose onClick={() => router.push("agenda")}>
                Cancel
              </DialogClose>
              <Button>Submit</Button>
            </div>
          </OrganizationAgendaForms>
        </div>
      </DialogContent>
    </Dialog>
  );
}
