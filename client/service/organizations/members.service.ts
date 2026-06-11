import axios from "axios";
import { toast } from "sonner";
const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/v1_beta`;

export const membersList = async (slug: string, page: number = 1) => {
  try {
    const response = await axios.get(
      `${BASE_API}/${slug}/comity/anggota/members?page=${page.toString()}&limit=10`,
      { withCredentials: true },
    );
    const data = response.data.response;
    console.log(data);
    return data;
  } catch (e: any) {
    toast.error(`${e.message}`);
    return e;
  }
};

export const memberInvitation = async (slug: string, value: string) => {
  try {
    const res = await axios.get(
      `${BASE_API}/${slug}/comity/anggota/search?q=${value}`,
      { withCredentials: true },
    );
    console.log(res);
    const result = res.data.response;
    return result;
  } catch (err: any) {
    toast.error(`${err.message}`);
    console.error(err);
  }
};

export const inviteAction = async (search: string, slug: string) => {
  try {
    const response = await axios.post(
      `${BASE_API}/${slug}/comity/anggota/search/${search}`,
      {},
      { withCredentials: true },
    );
    const result = response.data;
    toast.success(`${result.response.message}`);
    return result;
  } catch (err: any) {
    toast.error(`${err.message}`);
    console.error(err);
  }
};

export const receiveInvite = async () => {
  try {
    const res = await axios.get(`${BASE_API}/dashboard/inbox`, {
      withCredentials: true,
    });
    const result = res.data;
    toast.success(`Success load the data`);
    return result;
  } catch (err: any) {
    toast.error(`${err.message}`);
    console.error(err);
  }
};

export const acceptInvite = async (id: string) => {
  try {
    const res = await axios.patch(
      `${BASE_API}/dashboard/inbox`,
      {
        id,
      },
      {
        withCredentials: true,
      },
    );
    const result = res.data;
    toast.success(`Success accept the invite`);
    return result;
  } catch (err: any) {
    toast.error(`${err.message}`);
    console.error(err);
  }
};

export const joinComity = async (id: string) => {
  try {
    const res = await axios.post(
      `${BASE_API}/dashboard/application/${id}`,
      {},
      { withCredentials: true },
    );
  } catch (err: any) {
    console.error(err);
    toast.error(`${err.message}`);
  }
};

export const receiveJoinComity = async (id: string) => {
  try {
    const res = await axios.get(
      `${BASE_API}/${id}/comity/anggota/application`,
      { withCredentials: true },
    );
    const data = res.data.data;
    return data;
  } catch (err: any) {
    console.error(err);
    toast.error(`${err.message}`);
  }
};

export const acceptComityApplication = async (slug: string, id: string) => {
  try {
    const response = await axios.patch(
      `${BASE_API}/${slug}/comity/anggota/application/${id}`,
      {},
      { withCredentials: true },
    );

    const data = await response.data;
    console.log(data);
    await receiveJoinComity(slug);
  } catch (e: any) {
    console.error(e);
    toast.error(`${e.message}`);
  }
};
