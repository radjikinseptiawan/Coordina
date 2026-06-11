import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { SettingsRoleForm } from "../sr.form/sr.form";

export default function EditSettingsRoleDialogs() {
  const router = useRouter();
  const action = useSearchParams().get("action");
  return (
    <Dialog
      open={action === "edit" ? true : false}
      onOpenChange={() => router.push("role")}
    >
      <DialogContent>
        <DialogTitle>Edit Role Access</DialogTitle>
        <DialogDescription>
          this action will edit role structural for your organizations
        </DialogDescription>
        <SettingsRoleForm />
      </DialogContent>
    </Dialog>
  );
}
