"use server";
import { decoderToken } from "@/_shared/custom/hooks/decoder";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/v1_beta`;

export const getProfile = async () => {
  const user: any = await decoderToken();
  const cookiesStore = await cookies();
  const allCookies = cookiesStore.toString();
  const res = await axios.get(`${BASE_API}/${user.id}/profile`, {
    headers: {
      Cookie: allCookies,
    },
  });
  const result = res.data.response.data;
  return result;
};

export const patchProfile = async (data: any) => {
  console.log(data);
  const user: any = await decoderToken();
  const cookiesStore = (await cookies()).get("access_token")?.value.toString();

  const res = await axios.patch(`${BASE_API}/${user.id}/profile`, data, {
    headers: {
      Cookie: `access_token=${cookiesStore}`,
    },
  });
  const result = res.data;
  return result;
};
