import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { acceptInvite } from "@/service/organizations/members.service";
import { Check, X } from "lucide-react";

export default function CardsInvitations({ data }: { data: any }) {
  return (
    <>
      {data.map((item: any, index: any) => (
        <div
          key={index}
          className="shadow border p-2 items-end flex justify-between rounded-md"
        >
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={item.comity.comity_icon} alt="" />
            </Avatar>
            <div>
              <h1>{item.comity.comity_short_name}</h1>
              <p className="text-[12px] md:text-sm">Type: {item.type}</p>
              <p className="text-[12px] md:text-sm">
                {item.comity.comity_name}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant={"secondary"} onClick={() => acceptInvite(item.id)}>
              <Check />
            </Button>
            <Button variant={"destructive"}>
              <X />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
