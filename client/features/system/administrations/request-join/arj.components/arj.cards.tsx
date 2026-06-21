import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { convertDate } from "@/lib/utils";
import { acceptComityApplication } from "@/service/organizations/members.service";
import { Check, X, XIcon } from "lucide-react";
import { useParams } from "next/navigation";

export function CardsAdmRequest({ data }: { data: any }) {
  const slugs = useParams();
  return (
    <div className="flex flex-col gap-2">
      {data &&
        data.map((item: any, index: any) => (
          <div
            key={index}
            className="shadow border p-2 items-end flex justify-between rounded-md"
          >
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={item.account.user_profile.image} alt="" />
              </Avatar>
              <div>
                <h1>{item.account.user_profile.fullname}</h1>
                <p className="text-[12px] md:text-sm">Type: {item.status}</p>
                <p className="text-[4px] text-gray-500 md:text-sm">
                  {convertDate(item.created_at)}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    window.location.reload();
                    acceptComityApplication(slugs.slug as string, item.id);
                  }}
                >
                  <Check />
                </Button>
                <Button variant={"destructive"}>
                  <X />
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
