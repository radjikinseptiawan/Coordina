"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getOrganizations } from "@/service/menu.service";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { useLoadingContext } from "../md.context";

export interface MenuDasboardCardsTypes {
  comity: {
    comity_name: string;
    comity_short_name: string;
    comity_background: string;
    created_at: string;
  };
}

export function MenuDashboardCards() {
  const [data, setData] = useState<MenuDasboardCardsTypes[]>([]);
  const { isLoading, setIsLoading } = useLoadingContext();
  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      const response = await getOrganizations();
      setData(response);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };
  useEffect(() => {
    fetchOrganizations();
  }, []);

  const organizations = useMemo(() => {
    if (!data) return;
    return data;
  }, [data]);

  const convertDate = (date: Date) => {
    return Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  console.log(data);
  return (
    <>
      {organizations && isLoading === false
        ? organizations.map((item, index) => (
            <Card key={index} className="w-80 my-4 md:w-80">
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
                  <h3 className="font-semibold">
                    {item.comity.comity_short_name}
                  </h3>
                  <p className="text-gray-400">
                    Created at: {convertDate(new Date(item.comity.created_at))}
                  </p>
                </div>
              </div>
              <div className="h-24 overflow-y-auto">
                <p className="px-3 text-gray-500">
                  {item.comity.comity_background}
                </p>
              </div>

              <hr className="mx-4" />
              <div className="px-1 flex justify-around">
                <p className="px-1 text-gray-500 flex gap-2 items-center">
                  <BsPeople /> 16 Member
                </p>

                <Button className="w-32 cursor-pointer">Show</Button>
              </div>
            </Card>
          ))
        : Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="w-80 my-4 md:w-80">
              {/* Header */}
              <div className="flex">
                <Avatar className="rounded mx-4">
                  <AvatarImage></AvatarImage>
                </Avatar>
                <div>
                  <h3 className="font-semibold w-28 bg-gray-200 animate-pulse p-2"></h3>
                  <p className="text-gray-400 w-24 my-1 p-2 animate-pulse bg-gray-200"></p>
                </div>
              </div>
              <div className="h-24 overflow-y-auto bg-gray-200 animate-pulse p-2 mx-2 rounded-md">
                <p className="px-3 text-gray-500"></p>
              </div>

              <hr className="mx-4" />
              <div className="px-1 flex justify-around">
                <div className="px-1 text-gray-500 flex gap-2 items-center">
                  ...
                </div>

                <Button className="w-32 cursor-pointer" disabled>
                  Show
                </Button>
              </div>
            </Card>
          ))}
    </>
  );
}
