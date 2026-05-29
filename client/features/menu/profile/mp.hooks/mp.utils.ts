import { getProfile, patchProfile } from "@/service/dashboard/profile.service";
import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { MenuProfileSchemaType } from "../mp.forms/mp.schema";
import { Dispatch, RefObject, SetStateAction } from "react";
import { uploadFile } from "@/lib/uploads";
import { string } from "zod";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getUserProfile = async ({
  setValue,
  reset,
  setPreview,
}: {
  setValue: UseFormSetValue<MenuProfileSchemaType>;
  reset: UseFormReset<MenuProfileSchemaType>;
  setPreview: Dispatch<SetStateAction<string>>;
}) => {
  try {
    const profileData = await getProfile();
    if (profileData) {
      const body = {
        username: profileData.account.username,
        fullname: profileData.fullname,
        email: profileData.account.email,
        number_phone: profileData.number_phone,
        image: profileData.image,
      };

      setValue("email", body.email);
      setValue("fullname", body.fullname);
      setValue("number_phone", body.number_phone);
      setValue("username", body.username);

      reset(body, { keepDefaultValues: false });
      if (body.image) {
        setPreview(body.image);
      }
      console.log(body);
    }
  } catch (e) {
    console.error("Gagal mengambil profil:", e);
  }
};

interface FormMenuProfileInterface {
  fullname: string;
  number_phone: string;
  image: string;
}

export const imageClickAction = ({
  state,
}: {
  state: RefObject<HTMLInputElement | null>;
}) => {
  state?.current?.click();
};

export type FileUploadMenuProfileImage = {
  e: any;
  setPreview: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<MenuProfileSchemaType>;
};

export const fileUpload = ({
  e,
  setPreview,
  setValue,
}: FileUploadMenuProfileImage) => {
  const files = e.target.files?.[0];
  if (!files) return;
  const url = URL.createObjectURL(files);
  setPreview(url);
  setValue("image", files, { shouldValidate: true });
};
