import { ComityData } from "@/_shared/custom/@types/comity.type";
import {
  getComitiesAll,
  getOrganizations,
} from "@/service/dashboard/menu.service";
import { getProfile } from "@/service/dashboard/profile.service";
import { joinComity } from "@/service/organizations/members.service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast as soonerToast, toast } from "sonner";

export const fetchData = async ({
  setData,
}: {
  setData: Dispatch<SetStateAction<ComityData[]>>;
}): Promise<ComityData[] | any> => {
  const allComities = await getComitiesAll();
  const getMyOrganizations = await getOrganizations();
  const myJoinedIds = new Set(
    getMyOrganizations.map((item: any) => item.comity.id),
  );
  const finalData = allComities.map((item: any) => ({
    comity_name: item.comity_name,
    comity_background: item.comity_background,
    comity_city_of_operational: item.comity_city_of_operational,
    comity_icon: item.comity_icon,
    comity_created_date: item.comity_created_date,
    comity_area_of_operational: item.comity_area_of_operational,
    comity_short_name: item.comity_short_name,
    urlLink: item.urlLink,
    visions: item.visions,
    missions: item.missions,
    is_joined: myJoinedIds.has(item.id),
  }));
  setData(finalData);
  return finalData;
};

export const joinOrganizations = async ({
  slugs,
  router,
}: {
  slugs: string | null;
  router: AppRouterInstance;
}) => {
  try {
    await joinComity(slugs as string);
    toast.info(
      `Your request to join has been send!, please wait for someone accept your request!`,
    );
    router.push("dashboard");
  } catch (err) {
    console.error(err);
  }
};

export const getUserInformation = async ({
  toast,
  slugs,
  router,
}: {
  slugs: string | null;
  toast: typeof soonerToast;
  router: AppRouterInstance;
}) => {
  try {
    const response = await getProfile();
    if (!response.fullname || !response.number_phone) {
      toast.info(
        `Before organizing your comity, you must completly filled this.`,
      );
      router.replace("/profile");
      return;
    }

    toast.success(`Success validating resources!, redirecting to system`);
    router.push(`${slugs}/organizations`);
  } catch (e) {
    console.error(e);
  }
};
