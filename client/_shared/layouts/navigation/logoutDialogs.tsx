import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { logoutUsers } from "@/service/logout.service";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { toast } from "sonner";

export default function LogoutDialogs() {
  const router = useRouter();
  const pathName = usePathname();
  console.log("ini dari logoutDialogs.tsx", pathName);
  const logout = useSearchParams().get("logout");

  const logoutUser = async () => {
    try {
      const res = await logoutUsers();
      if (res) {
        toast.success("Success to logout, goodbye!");
        redirect("/login");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <AlertDialog open={logout === "true" ? true : false}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action well be sign out your account
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => router.replace(pathName)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={logoutUser}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
