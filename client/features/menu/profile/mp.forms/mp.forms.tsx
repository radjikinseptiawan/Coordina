import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProfile, patchProfile } from "@/service/profile.service";
import { useEffect, useRef, useState } from "react";
import { useMenuProfileForms } from "../mp.hooks/mp.hooks";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/uploads";
import { useRouter } from "next/navigation";

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

  const imageClickAction = () => {
    imagesReference?.current?.click();
  };

  const fileUpload = (e: any) => {
    const files = e.target.files?.[0];
    if (!files) return;
    const url = URL.createObjectURL(files);
    setPreview(url);
    setValue("image", files, { shouldValidate: true });
  };

  const getUserProfile = async () => {
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

        reset(body);
        if (body.image) {
          setPreview(body.image);
        }
      }
    } catch (e) {
      console.error("Gagal mengambil profil:", e);
    }
  };

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
    getUserProfile();
  }, [reset]);

  const { ref: registerRef, ...restRegister } = register("image");

  return (
    <form onSubmit={handleSubmit(submitForm, (err) => console.error(err))}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full flex justify-center items-center">
          {/* Ini photo profile */}
          <div className="my-6 mx-8 flex flex-col items-center">
            <img
              onClick={imageClickAction}
              src={preview}
              width={230}
              className="my-3 mx-4 rounded-full cursor-pointer object-cover aspect-square"
              alt="Avatar Profile"
            />
            {/* Input file murni di-handle RHF dan custom ref */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...restRegister}
              onChange={(e) => {
                restRegister.onChange(e);
                fileUpload(e);
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
                <tr>
                  <td>
                    <Label className="font-semibold"> Username </Label>
                  </td>
                  <td>
                    {/* PERBAIKAN: Atribut name="username" dihapus */}
                    <Input
                      {...register("username")}
                      className="w-[300px] my-1"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm pl-2">
                        {errors.username.message as string}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label className="font-semibold">Fullname</Label>
                  </td>
                  <td>
                    <Input {...register("fullname")} className="my-1" />
                    {errors.fullname && (
                      <p className="text-red-500 text-sm pl-2">
                        {errors.fullname.message as string}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label className="font-semibold">Email</Label>
                  </td>
                  <td>
                    <Input {...register("email")} className="my-1" />
                    {errors.email && (
                      <p className="text-red-500 text-sm pl-2">
                        {errors.email.message as string}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label className="font-semibold">Number Phone</Label>
                  </td>
                  <td>
                    <Input {...register("number_phone")} className="my-1" />
                    {errors.number_phone && (
                      <p className="text-red-500 text-sm pl-2">
                        {errors.number_phone.message as string}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button type="submit" className="mt-2">
                      Save Changes
                    </Button>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  );
}
