"use server";
import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decoderToken } from "@/_shared/custom/hooks/decoder";
const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/v1_beta/auth`;

export const logoutUsers = async () => {
  await (await cookies()).delete("access_token");
  redirect("/login");
};

export const getSpesificUser = async () => {
  const user: any = await decoderToken();
  const cookieStore = (await cookies()).get("access_token")?.value;
  const response = await axios.get(`${BASE_API}/${user.id}`, {
    headers: {
      Cookie: `access_token = ${cookieStore}`,
    },
  });
  const result = response.data;
  console.log(result);
  return result;
};
