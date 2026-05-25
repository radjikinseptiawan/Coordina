import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MenuDashboardFormAddDialog from "../md.forms/md.forms";
import { useOpenContext } from "../md.context";

export default function MenuDashboardAddDialogs({
  onClose,
}: {
  onClose: (open: boolean) => void;
}) {
  const { isOpen } = useOpenContext();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-auto">
        <DialogTitle className="font-bold text-xl">
          Create Organization
        </DialogTitle>
        <DialogDescription>
          Registered your organization to our system!
        </DialogDescription>
        <MenuDashboardFormAddDialog />
      </DialogContent>
    </Dialog>
  );
}
