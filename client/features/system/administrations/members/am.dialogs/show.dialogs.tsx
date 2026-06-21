import { Member } from "@/_shared/custom/@types/member.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { convertDate } from "@/lib/utils";
import { Edit2, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function ShowDialogsMember({
  initialValue,
  params,
}: {
  params: string;
  initialValue: { data: Member[] };
}) {
  const router = useRouter();
  const userData = initialValue.data.find((item) => item.member.id == params);
  const show = useSearchParams().get("show");
  return (
    <Dialog
      open={show ? true : false}
      onOpenChange={() => router.push("members")}
    >
      <DialogContent>
        <DialogTitle>Detail Member</DialogTitle>
        <DialogDescription>Yours member detail</DialogDescription>

        <div className="flex gap-4">
          <div>
            <Avatar size="xl">
              <AvatarImage src={userData?.member.image}></AvatarImage>
            </Avatar>
          </div>
          <div>
            <span className="flex gap-x-2">
              <p className="font-semibold">FullName :</p>
              <p>{userData?.member.fullname}</p>
            </span>

            <span className="flex gap-x-2">
              <p className="font-semibold">Username :</p>
              <p>{userData?.account.username}</p>
            </span>

            <span className="flex gap-x-2">
              <p className="font-semibold">Number Phone:</p>
              <p>{userData?.member.number_phone}</p>
            </span>

            <span className="flex gap-x-2">
              <p className="font-semibold">Role:</p>
              <p>{userData?.role.name}</p>
            </span>

            <span className="flex gap-x-2">
              <p className="font-semibold">Joined at:</p>
              <p>{convertDate(userData?.member.created_at)}</p>
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => router.push("members")}
            variant={"destructive"}
          >
            <XIcon />
            Close
          </Button>
          <Button
            variant={"outline"}
            onClick={() => router.push(`?edit=${params}`)}
          >
            <Edit2 />
            Edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
