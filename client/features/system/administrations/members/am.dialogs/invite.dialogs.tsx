"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import AdmFormsMembers from "../am.forms/am.forms";

export default function InviteDialogsAdmMembers() {
  const router = useRouter();
  const invite = useSearchParams().get("invite");
  const onClose = () => {
    router.push("members");
  };
  return (
    <Dialog open={invite == `${true}` ? true : false} onOpenChange={onClose}>
      <DialogContent className="w-72 h-60 md:w-xl">
        <DialogTitle>Invite People</DialogTitle>
        <DialogDescription>
          Invite people to your organizations!
        </DialogDescription>

        <div>
          <AdmFormsMembers />
        </div>

        <div className="flex justify-end">
          <DialogClose asChild>
            <Button variant={"outline"} onClick={() => router.push("members")}>
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
