import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CardSystemRoleComponents({ role }: { role: string[] }) {
  const router = useRouter();
  return (
    <>
      {role.map((item, index) => (
        <Card key={index}>
          <CardContent>
            <CardTitle>{item}</CardTitle>
            <hr className="my-3" />
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
