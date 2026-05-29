"use server";
import { decoderToken } from "@/_shared/custom/hooks/decoder";
import { Agenda } from "@/features/system/organizations/agenda/oa.tables/columns";
import axios from "axios";
import { cookies } from "next/headers";

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/v1_beta`;

export const createAgenda = async (body: any, slug: string) => {
  try {
    const cookie = (await cookies()).get("access_token")?.value;
    const response = await axios.post(
      `${BASE_API}/${slug}/comity/agenda/create`,
      body,
      {
        headers: {
          Cookie: `access_token=${cookie}`,
        },
      },
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getAgenda = async (slug: string) => {
  try {
    const cookie = (await cookies()).get("access_token")?.value;
    const response = await axios.get(`${BASE_API}/${slug}/comity/agenda/show`, {
      headers: {
        Cookie: `access_token=${cookie}`,
      },
    });

    const data = response.data.response.data;
    return data as Agenda[];
  } catch (e) {
    console.error(e);
    return [];
  }
};
