import { ComityData } from "@/_shared/custom/@types/comity.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getDataFind } from "@/service/dashboard/menu.service";
import axios from "axios";
import { Eye, Search, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import MenuDashboardShowDialogs from "./show.dialogs";

export default function MenuDashboardSearchDialogs() {
  const [name, setName] = useState("");
  const [data, setData] = useState<ComityData[]>([]);
  const mode = useSearchParams().get("mode");
  const router = useRouter();

  const close = () => {
    router.push("dashboard");
  };

  const fetchData = async (e: any) => {
    e.preventDefault();
    const response = await getDataFind(name);
    setData(response);
  };
  return (
    <>
      <Dialog open={mode == "search" ? true : false} onOpenChange={close}>
        <DialogContent className="w-80 md:w-2xl">
          <DialogTitle>Search organization</DialogTitle>
          <DialogDescription>
            Find and join organization here!
          </DialogDescription>
          <form onSubmit={fetchData}>
            <div className="flex gap-2">
              <Input onChange={(e) => setName(e.target.value)} value={name} />
              <Button>
                <Search /> Search
              </Button>
            </div>
          </form>
          <div className="overflow-x-auto md:overflow-x-hidden overflow-y-auto h-32">
            {data.length > 0 ? (
              data.map((item, index) => (
                <div
                  onClick={() =>
                    router.push(`?show=true&comity=${item.urlLink}`)
                  }
                  key={index}
                  className="flex w-80 md:w-full hover:shadow py-1 items-center"
                >
                  <div className="flex gap-2 my-2 w-full cursor-pointer px-2">
                    <Avatar>
                      <AvatarImage
                        src={item.comity_icon as string}
                      ></AvatarImage>
                    </Avatar>
                    <div>
                      <h1>{item.comity_short_name}</h1>
                      <p>{item.comity_name}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() =>
                      router.push(`?show=true&comity=${item.urlLink}`)
                    }
                  >
                    <Eye />
                    Show
                  </Button>
                </div>
              ))
            ) : (
              <p>Organization Cant found!</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
