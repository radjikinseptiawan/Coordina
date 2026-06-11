import { Agenda } from "@/_shared/custom/@types/agenda.type";
import { decoderToken } from "@/_shared/custom/hooks/decoder";
import axios from "axios";
import { Console } from "console";
import { unstable_noStore as nostore } from "next/cache";
import { toast } from "sonner";
const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/v1_beta`;

export const createAgenda = async (body: any, slug: string) => {
  try {
    const payload = {
      ...body,
      lampiran: null,
    };
    console.log(body);
    const response = await axios.post(
      `${BASE_API}/${slug}/comity/agenda/create`,
      payload,
      { withCredentials: true },
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const agendaSpesific = async (slug: string, id: string) => {
  try {
    const response = await axios.get(
      `${BASE_API}/${slug}/comity/agenda/get-spesific/${id}`,
      { withCredentials: true },
    );

    const result = response.data;
    console.log("ini agenda spesific", result);
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getAgenda = async (slug: string, page: number = 1) => {
  nostore();
  try {
    const response = await axios.get(
      `${BASE_API}/${slug}/comity/agenda/show?page=${page.toString()}&limit=10`,
      { withCredentials: true },
    );

    const data = response.data.response;
    toast.success("Success fetching data from server..");
    return data;
  } catch (e: any) {
    toast.error(`${e.message},Failed to fetching data!`);
    return {
      statusCode: 500,
      message: "Failed to fetch",
      data: [],
      meta: { totalItems: 0, totalPages: 1, currentPage: 1 },
    };
  }
};

export const editAgenda = async (data: Agenda, slug: string, id: string) => {
  try {
    const res = await axios.patch(
      `${BASE_API}/${slug}/comity/agenda/${id}/update-agenda`,
      data,
      { withCredentials: true },
    );

    return res;
  } catch (err: any) {
    toast.error(`${err.message}`);
  }
};

export const deleteAgenda = async (slug: string, id: string) => {
  try {
    const res = await axios.delete(
      `${BASE_API}/${slug}/comity/agenda/${id}/delete`,
      { withCredentials: true },
    );
    return res;
  } catch (err: any) {
    console.error(err);
    toast.error(`${err.message}`);
  }
};
