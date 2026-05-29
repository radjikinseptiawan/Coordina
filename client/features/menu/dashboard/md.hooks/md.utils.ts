import { getProfile } from "@/service/dashboard/profile.service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { toast as soonerToast } from "sonner";
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
    console.log(response);
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
