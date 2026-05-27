"use client";
import { Input } from "@/components/ui/input";
import {
  fieldAddCards,
  fieldTextareaAddCards,
  useMenuDashboardAddForms,
} from "../md.hooks/md.hooks";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { createOrganizations } from "@/service/menu.service";
import { useOpenContext } from "../md.context";
import { uploadFile } from "@/lib/uploads";
import MenuDashboardDropDownComponent from "../md.components/md.dropdown";
import { InputAddCards } from "../md.components/md.input";
import TextareaMenuDashboardComponents from "../md.components/md.textarea";
import { itemDropdown, provinceDropdown } from "../md.components/md.resources";
import MenuDashboardMissionField from "../md.components/md.mission";

export default function MenuDashboardFormAddDialog() {
  const { setIsOpen } = useOpenContext();
  const [preview, setPreview] = useState<any>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useMenuDashboardAddForms();

  const iconFile = watch("organization_icon");

  const selectedProvince = watch("area_operational");
  const selectedCityRegency = watch("city_operational");

  const onSubmit = async (data: any) => {
    let uploadedIconUrl = "";
    if (data.organization_icon && data.organization_icon.length > 0) {
      const file = data.organization_icon[0];

      const imageFormData = new FormData();
      imageFormData.append("image", file);

      const uploadRes = await uploadFile(imageFormData);

      if (uploadRes.error) {
        alert(`Failed to upload organization icon: ${uploadRes.error}`);
        return;
      }

      uploadedIconUrl = uploadRes.url || "";
    }

    const finalPayload = {
      ...data,
      organization_icon: uploadedIconUrl,
    };

    const response = await createOrganizations(finalPayload);
    if (response) {
      setIsOpen(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (iconFile && iconFile.length > 0) {
      const file = iconFile[0];
      const objectFile = URL.createObjectURL(file);
      setPreview(objectFile);

      return () => URL.revokeObjectURL(objectFile);
    }
  }, [iconFile]);

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="w-72 md:w-xl h-96"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fieldAddCards.map((item, index) => (
          <InputAddCards
            type={item.type as string}
            register={register}
            label={item.label}
            key={index}
            name={item.name}
            error={errors[item.name]}
          />
        ))}
        <div className="flex flex-col gap-1">
          <label htmlFor="area_operational">Province Operational</label>
          <MenuDashboardDropDownComponent
            hardData={provinceDropdown}
            valued={setValue}
            placeHolder="Select Province"
            selected={selectedProvince}
            name="area_operational"
          />
          {errors.area_operational && (
            <p className="text-sm text-red-500">
              {errors.area_operational.message}
            </p>
          )}
        </div>

        {fieldTextareaAddCards.map((item, index) => (
          <TextareaMenuDashboardComponents
            error={errors[item.name]}
            label={item.label}
            name={item.name}
            register={register}
            key={index}
          />
        ))}

        <div className="flex flex-col gap-1">
          <label htmlFor="city_operational">City/Regency Operational</label>
          <MenuDashboardDropDownComponent
            hardData={itemDropdown}
            selected={selectedCityRegency}
            name="city_operational"
            placeHolder="Select City/Regency"
            valued={setValue}
          />
          {errors.city_operational && (
            <p className="text-sm text-red-500">
              {errors.city_operational.message}
            </p>
          )}
        </div>

        <div className="flex gap-1 flex-col">
          <Label>Organization Icon</Label>
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={preview}></AvatarImage>
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

      <MenuDashboardMissionField
        control={control}
        register={register}
        errors={errors}
      />

      <div className="flex gap-2  my-3 p-2 justify-end">
        <DialogClose>Close</DialogClose>
        <Button>Submit</Button>
      </div>
    </form>
  );
}
