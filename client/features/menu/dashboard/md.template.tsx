import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { BsPeople } from "react-icons/bs";

export default function MenuDashboardTemplate() {
  return (
    <div className="mx-4">
      {/* Ini paling atas */}
      <div className="flex px-8 justify-between py-1 border-b-2 ">
        <div>
          <h1 className="text-xl md:text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm md:text-md mb-4 text-muted-foreground">
            Welcome back! Manage your organizations with ease.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={"outline"}>Cari Organisasi</Button>
          <Button>Buat Organisasi</Button>
        </div>
      </div>

      {/* Ini desain untuk cards nya */}
      <div className="grid grid-cols-1 md:grid-cols-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="w-80 my-4 md:w-80">
            {/* Header */}
            <div className="flex">
              <Avatar className="rounded mx-4">
                <AvatarImage
                  src={
                    "https://i.pinimg.com/736x/1b/dc/15/1bdc15a3c9f86fc9493903efc945811f.jpg"
                  }
                ></AvatarImage>
              </Avatar>
              <div>
                <h3 className="font-semibold">HIMATIF UPB</h3>
                <p className="text-gray-400">Created at: 12 Mar 2026</p>
              </div>
            </div>
            {/* Content  */}
            <p className="px-3 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              ab at quo quibusdam alias fuga dolor et magnam, sed soluta
              obcaecati sequi, nihil tempore amet, saepe nam enim repellendus
              sapiente.
            </p>

            <hr className="mx-4" />
            <div className="px-1 flex justify-around">
              <p className="px-1 text-gray-500 flex gap-2 items-center">
                <BsPeople /> 16 Member
              </p>

              <Button className="w-32 cursor-pointer">Lihat</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
