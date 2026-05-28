"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMemoComity, useOpenContext } from "../md.context";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { getOrganizationsDetail } from "@/service/menu.service";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/service/profile.service";
import { getUserInformation } from "../md.hooks/md.utils";

export default function MenuDashboardShowDialogs() {
  const router = useRouter();
  const isShow = useSearchParams().get("show");
  const { setIsOpen } = useOpenContext();
  const { comityLoad } = useMemoComity();
  const slugs = useSearchParams().get("comity");
  return (
    <>
      <Dialog
        open={isShow === "true" ? true : false}
        onOpenChange={() => router.replace("/dashboard")}
      >
        <DialogContent className="w-80 md:w-xl h-[500px] overflow-y-auto">
          <DialogTitle className="font-bold">
            {comityLoad?.data.comity_short_name}
          </DialogTitle>
          <DialogDescription>{comityLoad?.data.comity_name}</DialogDescription>
          <hr />
          <div className="mx-auto">
            <Image
              src={comityLoad?.data.comity_icon as string}
              width={200}
              height={200}
              alt="icon_organisasi"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-lg md:text-xl font-semibold">Info</p>
            <p className="px-2 py-1">
              City/Regency : {comityLoad?.data.comity_city_of_operational}
            </p>
            <p className="px-2 py-1">
              Province : {comityLoad?.data.comity_area_of_operational}
            </p>
            <p className="px-2 py-1">
              Birth Date : {comityLoad?.data.comity_created_date}
            </p>
          </div>

          <div>
            <h1 className="font-bold text-lg md:text-xl">
              Organization Background
            </h1>
            <p className="px-2 py-1">{comityLoad?.data.comity_background}</p>
          </div>

          <div>
            <h1 className="font-bold text-lg md:text-xl">
              Organization Vision
            </h1>
            <p className="px-2 py-1">{comityLoad?.vision.vision}</p>
          </div>

          <div>
            <h1 className="font-bold text-lg md:text-xl">
              Organization Mission
            </h1>
            <div className="overflow-y-auto h-80">
              {comityLoad?.mission.map((item: any, index: number) => (
                <p
                  className="px-2 py-1 bg-gray-300 rounded-md my-2"
                  key={index}
                >
                  {" "}
                  {index + 1}. {item.mission}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose onClick={() => router.replace("/dashboard")}>
              Close
            </DialogClose>
            <Button
              onClick={() => getUserInformation({ toast, router, slugs })}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
