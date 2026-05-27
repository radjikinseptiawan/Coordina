import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProfile, patchProfile } from "@/service/profile.service";
import { useEffect, useRef, useState } from "react";
import { fieldInput, useMenuProfileForms } from "../mp.hooks/mp.hooks";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/uploads";
import { useRouter } from "next/navigation";
import { InputProfilDataType } from "./mp.schema";
import { MenuProfileInputComponents } from "../mp.components/mp.input";
import MenuProfileContainerComponents from "../mp.components/mp.container";
import {
  fileUpload,
  getUserProfile,
  imageClickAction,
} from "../mp.hooks/mp.utils";

export default function MenuProfileForms() {
  const [preview, setPreview] = useState<string>(
    process.env.NEXT_PUBLIC_DEFAULT_PROFILE as string,
  );
  const router = useRouter();

  const imagesReference = useRef<HTMLInputElement>(null);

  const {
    formState: { errors },
    setValue,
    register,
    handleSubmit,
    reset,
  } = useMenuProfileForms();

  const submitForm = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      const uploadImage = await uploadFile(formData);
      const payload = {
        fullname: data.fullname,
        number_phone: data.number_phone,
        image: uploadImage,
      };
      const datas = await patchProfile(payload);
      console.log(datas);
      router.replace("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserProfile({ setValue, reset, setPreview });
  }, [reset]);

  const { ref: registerRef, ...restRegister } = register("image");

  return (
    <form onSubmit={handleSubmit(submitForm, (err) => console.error(err))}>
      <MenuProfileContainerComponents>
        <div className="my-6 mx-8 flex flex-col items-center">
          <img
            onClick={() => imageClickAction({ state: imagesReference })}
            src={preview}
            width={230}
            className="my-3 mx-4 rounded-full cursor-pointer object-cover aspect-square"
            alt="Avatar Profile"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...restRegister}
            onChange={(e) => {
              restRegister.onChange(e);
              fileUpload({ e: e, setPreview, setValue });
            }}
            ref={(e) => {
              registerRef(e);
              (imagesReference as any).current = e;
            }}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image.message as string}
            </p>
          )}
        </div>

        <div className="my-6 mx-8">
          <table>
            <tbody>
              {fieldInput.map((item: InputProfilDataType, index: number) => (
                <MenuProfileInputComponents
                  register={register}
                  label={item.label}
                  name={item.name}
                  error={errors[item.name]}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </MenuProfileContainerComponents>
    </form>
  );
}
