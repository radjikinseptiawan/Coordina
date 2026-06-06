import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, XIcon } from "lucide-react";
import { useFindUserEmailForms } from "../am.hooks/am.hooks";
import {
  inviteAction,
  memberInvitation,
} from "@/service/organizations/members.service";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserInvitationType } from "@/_shared/custom/@types/user.type";

export default function AdmFormsMembers() {
  const params = useParams();
  const { register, handleSubmit } = useFindUserEmailForms();
  const [data, setData] = useState<UserInvitationType[]>([]);

  const submitForm = async (data: any) => {
    try {
      const res = await memberInvitation(params.slug as string, data.text);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const inviteUser = async (data: any) => {
    await inviteAction(data, params.slug as string);
  };

  return (
    <>
      <form className="flex" onSubmit={handleSubmit(submitForm)}>
        <Input
          {...register("text")}
          type="search"
          placeholder="please type the username or email"
        />
        <Button>
          <Search />
          Find
        </Button>
      </form>
      {data && (
        <div className="shadow-xl fixed p-2 rounded-md bg-white w-full justify-center overflow-y-hidden overflow-x-auto md:overflow-x-hidden md:w-[500px]">
          <table>
            <tbody>
              {data.map((item, index) => (
                <tr
                  className=" gap-5 p-2 rounded-md items-center flex w-64"
                  key={index}
                >
                  <td>
                    <Avatar>
                      <AvatarImage src={item.user_profile.image} />
                    </Avatar>
                  </td>
                  <td>
                    <p>{item?.username as string}</p>
                  </td>
                  <td>
                    <p>{item?.email as string}</p>
                  </td>
                  <td>
                    <Button
                      onClick={() => inviteUser(item.email ?? item.username)}
                    >
                      <Plus />
                      Invite
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
