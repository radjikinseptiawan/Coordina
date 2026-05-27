import { convertDate } from "@/lib/utils";
import { getProfile } from "@/service/profile.service";
import { useEffect, useState } from "react";

type AccountDataType = {
  username: string;
  email: string;
  created_at: string;
};

type ProfileDataType = {
  fullname: string | null;
  image: string | null;
  number_phone: string | null;
  account: AccountDataType;
};

export default function MenuProfileInfoComponents() {
  const [preview, setPreview] = useState<string>(
    process.env.NEXT_PUBLIC_DEFAULT_PROFILE as string,
  );
  const [data, setData] = useState<ProfileDataType>();
  const getUserProfile = async () => {
    try {
      const data = await getProfile();
      setData(data);
      setPreview(data.image);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      {/* Ini photo profile */}
      <div className="my-6 mx-8">
        <img
          src={preview}
          width={230}
          className="my-3 mx-4 rounded-full cursor-pointer object-cover aspect-square"
          alt="Avatar Profile"
        />
      </div>

      <div className="my-6 mx-8 grid grid-cols-2 gap-y-3 gap-x-3">
        <div className="w-[300px]">
          <h4 className="font-semibold"> Username </h4>
          <p className="my-1">{data?.account.username ?? "-"}</p>
        </div>

        <div className="w-[300px]">
          <h4 className="font-semibold"> Fullname </h4>
          <p className="my-1">{data?.fullname ?? "-"}</p>
        </div>

        <div className="w-[300px]">
          <h4 className="font-semibold"> Email </h4>
          <p className="my-1">{data?.account.email ?? "-"}</p>
        </div>

        <div className="w-[300px]">
          <h4 className="font-semibold"> Number Phone </h4>
          <p className="my-1">{data?.number_phone ?? "-"}</p>
        </div>

        <div className="w-[300px]">
          <h4 className="font-semibold"> Created At </h4>
          <p className="my-1">
            {data ? convertDate(new Date(`${data?.account.created_at}`)) : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
