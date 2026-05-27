import { getProfile } from "@/service/profile.service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast as soonerToast } from "sonner";
export const getUserInformation = async ({
  toast,
  router,
}: {
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
    router.push("/");
  } catch (e) {
    console.error(e);
  }
};
