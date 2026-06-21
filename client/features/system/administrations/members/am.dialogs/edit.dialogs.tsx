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
import {
  getAllRole,
  updateRoles,
} from "@/service/organizations/members.service";
import { Edit2, Save, Trash, XIcon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiKickLine } from "react-icons/ri";
import { SiKick } from "react-icons/si";

export function EditDialogsMember({
  initialValue,
}: {
  initialValue: { data: Member[] };
}) {
  const router = useRouter();
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const params = useParams();
  const edit = useSearchParams().get("edit");
  const userData = initialValue.data.find((item) => item.member.id == edit);

  const roleData = async () => {
    const data = await getAllRole(params.slug as string);
    setRoles(data.data);
    if (!data.data.role) return null;
    setSelectedRole(data.data.role.name);
  };

  console.log({
    edit,
    selectedRole,
  });

  const updateRole = async () => {
    const payload = {
      id: edit,
      role: selectedRole,
    };
    await updateRoles(params.slug as string, payload);
  };

  useEffect(() => {
    roleData();
  }, [router]);
  return (
    <Dialog
      open={edit ? true : false}
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

            <span className="flex gap-x-3">
              <p className="font-semibold">Role:</p>
              <select
                name=""
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border p-1 rounded-md"
                defaultValue={userData?.role.id}
                id=""
              >
                {roles.map((item: any, index: number) => (
                  <option value={item.role_id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </span>

            <span className="flex gap-x-2">
              <p className="font-semibold">Joined at:</p>
              <p>{convertDate(userData?.member.created_at)}</p>
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant={"default"} onClick={updateRole}>
            <Save />
            Save
          </Button>
          <Button variant={"secondary"}>
            <Trash />
            Kick Member
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
