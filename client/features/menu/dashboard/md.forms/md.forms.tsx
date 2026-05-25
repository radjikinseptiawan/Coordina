"use client";
import { Input } from "@/components/ui/input";
import { useMenuDashboardAddForms } from "../md.hooks/md.hooks";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, MenuIcon, Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { createOrganizations } from "@/service/menu.service";
import { useRouter } from "next/navigation";
import { useOpenContext } from "../md.context";

export default function MenuDashboardFormAddDialog() {
  const router = useRouter();
  const { setIsOpen } = useOpenContext();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useMenuDashboardAddForms();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "organization_mission",
  });

  const selectedProvince = watch("area_operational");
  const selectedCityRegency = watch("city_operational");

  const onSubmit = async (data: any) => {
    console.log("payload: ", data);
    const response = await createOrganizations(data);
    console.log("response", response);
    if (response) {
      setIsOpen(false);
      window.location.reload();
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)} className="w-xl h-96">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <Label>Organizational Name</Label>
          <Input id="organization_name" {...register("organization_name")} />
          {errors.organization_name && (
            <p className="text-sm text-red-500">
              {errors.organization_name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label>Short Organization Name</Label>
          <Input {...register("short_name")} />
          {errors.short_name && (
            <p className="text-sm text-red-500">{errors.short_name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="created_date">Organization Birth</label>
          <Input {...register("created_date")} type="date" />
          {errors.created_date && (
            <p className="text-sm text-red-500">
              {errors.created_date.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="area_operational">Province Operational</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <ChevronDown />
                {selectedProvince ? selectedProvince : "Province Operational"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setValue("area_operational", "DKI Jakarta")}
                >
                  DKI Jakarta
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("area_operational", "Banten")}
                >
                  Banten
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("area_operational", "DI Yogyakarta")}
                >
                  DI Yogyakarta
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("area_operational", "Jawa Tengah")}
                >
                  Jawa Tengah
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("area_operational", "Jawa Timur")}
                >
                  Jawa Timur
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("area_operational", "Jawa Barat")}
                >
                  Jawa Barat
                </DropdownMenuItem>{" "}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {errors.area_operational && (
            <p className="text-sm text-red-500">
              {errors.area_operational.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="city_operational">City/Regency Operational</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <ChevronDown />{" "}
                {selectedCityRegency
                  ? selectedCityRegency
                  : "Select City/Regency"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setValue("city_operational", "Jakarta Pusat")}
                >
                  Jakarta Pusat
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("city_operational", "Serang")}
                >
                  Serang
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("city_operational", "Sleman")}
                >
                  Sleman
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("city_operational", "Semarang")}
                >
                  Semarang
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("city_operational", "Surabaya")}
                >
                  Surabaya
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setValue("city_operational", "Bandung")}
                >
                  Bandung
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {errors.city_operational && (
            <p className="text-sm text-red-500">
              {errors.city_operational.message}
            </p>
          )}
        </div>

        <div className="flex gap-1 flex-col">
          <label htmlFor="organization_background">
            Organization Background
          </label>
          <Textarea
            {...register("organization_background")}
            className="resize-none h-24 overflow-y-auto"
            name="organization_background"
            id="organization_background"
          />
          {errors.organization_background && (
            <p className="text-sm text-red-500">
              {errors.organization_background.message}
            </p>
          )}
        </div>

        <div className="flex gap-1 flex-col">
          <label htmlFor="organization_vision">Organization Vision</label>
          <Textarea
            className="resize-none h-32 overflow-y-auto"
            {...register("organization_vision")}
            name="organization_vision"
            id="organization_vision"
          />
          {errors.organization_vision && (
            <p className="text-sm text-red-500">
              {errors.organization_vision.message}
            </p>
          )}
        </div>

        <div className="flex gap-1 flex-col">
          <Label>Organization Icon</Label>
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage></AvatarImage>
            </Avatar>
            <Input {...register("organization_icon")} type="file" />
          </div>
          {errors.organization_icon && (
            <p className="text-sm text-red-500">
              {errors.organization_icon.message as string}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-col my-2">
        <div className="flex justify-between">
          <span>
            <Label>Organization Mission</Label>
            <p className="text-sm text-gray-500">
              Total Mission : {fields.length}
            </p>
          </span>
          <Button
            onClick={() => append({ mission: "" })}
            variant={"outline"}
            type="button"
          >
            <Plus />
          </Button>
        </div>
        <div className="h-40 rounded-md border px-1 py-2 overflow-y-auto">
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex my-2 items-center gap-2">
                  <span className="text-sm font-semibold text-gray-500">
                    {index + 1}
                  </span>
                  <Input
                    {...register(
                      `organization_mission.${index}.mission` as const,
                    )}
                    className="bg-white"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {errors.organization_mission?.[index]?.mission && (
                  <p className="text-xs text-red-500 ml-7">
                    {errors.organization_mission[index]?.mission?.message}
                  </p>
                )}
              </div>
            ))
          ) : (
            <span className="flex justify-center items-center h-full text-gray-500">
              No mission yet!
            </span>
          )}
        </div>
        {errors.organization_mission?.root && (
          <p className="text-red-500 text-sm">
            {errors.organization_mission.root.message}
          </p>
        )}
      </div>

      <div className="flex gap-2  my-3 p-2 justify-end">
        <DialogClose>Close</DialogClose>
        <Button>Submit</Button>
      </div>
    </form>
  );
}
