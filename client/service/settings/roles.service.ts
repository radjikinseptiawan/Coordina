import axios from "axios";
import { toast } from "sonner";

const BASE_API = `http://localhost:3001/v1_beta`;

export const createRole = async (data: any, params: string) => {
  try {
    const response = await axios.post(
      `${BASE_API}/${params}/comity/settings/permission`,
      {
        data,
      },
      {
        withCredentials: true,
      },
    );

    console.log(response);
  } catch (error: any) {
    console.error(error);
    toast.error(`${error.message}`);
  } finally {
    toast.success(`Success add role!`);
  }
};

export const readRole = async (params: string) => {
  try {
    const response = await axios.get(
      `${BASE_API}/${params}/comity/settings/permission`,
      {
        withCredentials: true,
      },
    );
    console.log("dari api spec", response.data.data);
    return response;
  } catch (error: any) {
    console.error(error);
    toast.error(`${error.message}`);
  } finally {
    toast.success(`Success get role!`);
  }
};

export const updateRole = async (data: any, params: string, id: string) => {
  try {
    const response = await axios.patch(
      `${BASE_API}/${params}/comity/settings/permission/${id}`,
      {
        data,
      },
      {
        withCredentials: true,
      },
    );

    console.log(response);
  } catch (error: any) {
    console.error(error);
    toast.error(`${error.message}`);
  }
};

export const deleteRole = async (slug: string, id: string) => {
  try {
    const response = await axios.delete(
      `${BASE_API}/${slug}/comity/anggota/permission/${id}`,
    );

    if (response) {
      toast.success("Success to delete data");
    }
  } catch (error: any) {
    toast.error(`${error.message}`);
  }
};
