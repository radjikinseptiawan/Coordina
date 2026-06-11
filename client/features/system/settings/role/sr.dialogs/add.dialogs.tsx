import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { SettingsRoleForm } from "../sr.form/sr.form";

export default function AddSettingRoleDialogs() {
  const router = useRouter();
  const actions = useSearchParams().get("action");
  return (
    <Dialog
      open={actions == "add" ? true : false}
      onOpenChange={() => router.push("role")}
    >
      <DialogContent>
        <DialogTitle>Add Dialog</DialogTitle>
        <DialogDescription>
          It ill make new structural role for your organizations!
        </DialogDescription>
        <SettingsRoleForm></SettingsRoleForm>
      </DialogContent>
    </Dialog>
  );
}
