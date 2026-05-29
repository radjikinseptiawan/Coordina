import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getAgenda } from "@/service/organizations/agenda.service";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const OrganizationAgendaCards = () => {
  const router = useRouter();
  const pathname = usePathname().split("/");
  const getDataFetch = async () => {
    const slug = pathname[1];
    const response = await getAgenda(slug);
  };

  useEffect(() => {
    getDataFetch();
  }, []);
  return (
    <Card className="my-2 md:w-60 w-54">
      <CardContent>
        <CardTitle className="w-54 md:w-60 font-semibold">
          Agenda Name
        </CardTitle>
        <CardDescription>Created By: Imam Permana</CardDescription>
        <div className="my-2">
          <p>Status Agenda: </p>
          <p>Tanggal Agenda</p>
        </div>
        <div className="w-full flex justify-end">
          <Button onClick={() => router.push(`?detail="true"`)}>
            Show Detail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
