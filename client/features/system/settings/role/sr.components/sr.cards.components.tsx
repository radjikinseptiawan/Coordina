import { RootObject } from "@/_shared/custom/@types/role.type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CardSystemRoleComponents({
  role,
}: {
  role: RootObject[];
}) {
  const router = useRouter();
  return (
    <>
      {role.map((item, index) => (
        <Card key={index}>
          <CardContent>
            <CardTitle>{item.name}</CardTitle>
            <hr className="my-3" />
            <CardDescription>{item.description}</CardDescription>
          </CardContent>
          <CardAction className="w-full px-2">
            <div className="flex justify-end">
              <Button
                variant={"outline"}
                onClick={() => router.push("?action=edit")}
              >
                <Edit2 />
                Edit
              </Button>
            </div>
          </CardAction>
        </Card>
      ))}
    </>
  );
}
