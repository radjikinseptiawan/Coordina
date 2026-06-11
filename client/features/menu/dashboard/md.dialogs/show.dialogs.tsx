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
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import {
  getOrganizations,
  getOrganizationsDetail,
} from "@/service/dashboard/menu.service";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/service/dashboard/profile.service";
import { getUserInformation, joinOrganizations } from "../md.hooks/md.utils";
import { ComityData } from "@/_shared/custom/@types/comity.type";
import { ComityRelevant } from "../md.components/md.cards";
import { Eye, SquareX, StepForward, Users2 } from "lucide-react";
import { joinComity } from "@/service/organizations/members.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MenuDashboardShowDialogs({
  initialData,
}: {
  initialData: ComityData[];
}) {
  const router = useRouter();
  const isShow = useSearchParams().get("show");
  const slugs = useSearchParams().get("comity");

  const comity = initialData?.find((item) => item.urlLink == slugs);
  return (
    <>
      <Dialog
        open={isShow === `true` ? true : false}
        onOpenChange={() => router.replace("/dashboard")}
      >
        <DialogContent className="w-70 md:w-xl h-[500px] overflow-y-auto overflow-x-hidden">
          <DialogTitle className="font-bold">
            {comity?.comity_short_name}
          </DialogTitle>
          <DialogDescription>{comity?.comity_name}</DialogDescription>
          <hr />
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col items-center gap-3 py-4">
              <img
                src={
                  comity?.comity_icon || process.env.NEXT_PUBLIC_DEFAULT_PROFILE
                }
                width={120}
                height={120}
                alt="organization"
                className="rounded-3xl border shadow-md object-cover"
              />

              <div className="text-center">
                <h1 className="text-2xl font-bold">
                  {comity?.comity_short_name}
                </h1>

                <p className="text-muted-foreground">{comity?.comity_name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted-foreground">City / Regency</p>
                <p className="font-semibold">
                  {comity?.comity_city_of_operational}
                </p>
              </div>

              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted-foreground">Province</p>
                <p className="font-semibold">
                  {comity?.comity_area_of_operational}
                </p>
              </div>

              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted-foreground">Established</p>
                <p className="font-semibold">{comity?.comity_created_date}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Background</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-relaxed text-sm">
                  {comity?.comity_background}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vision</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-relaxed text-sm">
                  {comity?.visions.map((item) => item.vision)}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {comity?.missions.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div
                    className="
        h-8
        w-8
        rounded-full
        bg-primary
        text-white
        flex
        items-center
        justify-center
        text-sm
        font-bold
      "
                  >
                    {index + 1}
                  </div>

                  <div className="flex-1 rounded-xl border p-3">
                    {item.mission}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => router.push("dashboard")}
                variant={"destructive"}
              >
                <SquareX />
                Close
              </Button>
              {comity?.is_joined == true ? (
                <Button
                  onClick={() => getUserInformation({ toast, router, slugs })}
                >
                  <StepForward />
                  Continue
                </Button>
              ) : (
                <Button onClick={() => joinOrganizations({ slugs, router })}>
                  <Users2 />
                  Join
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
