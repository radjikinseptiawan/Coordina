import { Button } from "@/components/ui/button";
import { UserKey } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SystemRoleControllers() {
  const router = useRouter();
  return (
    <Button
      className="my-2"
      size={"lg"}
      onClick={() => router.push("?action=add")}
    >
      <UserKey />
      Add Role
    </Button>
  );
}
