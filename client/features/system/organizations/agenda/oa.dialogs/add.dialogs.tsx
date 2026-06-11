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
  const showUrl = useSearchParams().get("mode");
  const router = useRouter();
  return (
    <Dialog
      open={showUrl == `create` ? true : false}
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
              <Button
                type="button"
                onClick={() => router.push("agenda")}
                variant={"destructive"}
              >
                Cancel
              </Button>
              <Button>Submit</Button>
            </div>
          </OrganizationAgendaForms>
        </div>
      </DialogContent>
    </Dialog>
  );
}
