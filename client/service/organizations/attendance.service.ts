import { PayloadAttendance } from "@/_shared/custom/@types/attendance.type";
import axios from "axios";
import { toast } from "sonner";

export const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/v1_beta`;

export const getAllAttendance = async (slug: string) => {
  try {
    const response = await axios.get(
      `${BASE_API}/${slug}/comity/agenda/get-all-attendance`,
      { withCredentials: true },
    );
    const result = response.data;
    return result;
  } catch (err: any) {
    toast.error(err.message);
    console.error(err);
  }
};

export const createAbsence = async ({
  slug,
  id,
  payload,
}: {
  slug: string;
  id?: string;
  payload: PayloadAttendance;
}) => {
  try {
    const response = await axios.post(
      `${BASE_API}/${slug}/comity/agenda/attendance/${id}`,
      payload,
      {
        withCredentials: true,
      },
    );

    const data = response.data;
    toast.success("success to absence");
    return data;
  } catch (e) {
    console.error(e);
    toast.error("failed to absence!");
  }
};

export const historyAbsence = async (urlLink: string, agendaId: string) => {
  try {
    const res = await axios.get(
      `${BASE_API}/${urlLink}/comity/agenda/get-attendance-detail/${agendaId}`,
      { withCredentials: true },
    );

    const data = res.data;
    return data;
  } catch (e: any) {
    console.error(e);
  }
};
