import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteAgenda } from "@/service/organizations/agenda.service";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AlertDeleteDialog() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const deleteId = useSearchParams().get("delete");

  const handlerDeleteAgenda = async () => {
    try {
      setIsLoading(true);
      const response = await deleteAgenda(
        params.slug as string,
        deleteId as string,
      );

      if (!response) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      return;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <AlertDialog open={deleteId ? true : false}>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            It`ll be delete your agenda.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel onClick={() => router.push("agenda")}>
              Cancel
            </AlertDialogCancel>
            <Button onClick={handlerDeleteAgenda} disabled={isLoading}>
              {isLoading ? "Loading.." : "Delete"}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
