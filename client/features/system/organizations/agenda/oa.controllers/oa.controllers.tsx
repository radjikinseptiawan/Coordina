import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Plus, RefreshCwIcon } from "lucide-react";
import { OrganizationAgendaCards } from "../oa.components/oa.cards";
import { useTransition } from "react";

export function OrganizationsAgendaControllers() {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.push(`?add="true"`)}>
        <Plus size={12} />
        Add Agenda
      </Button>
      <OrganizationAgendaCards />
      <div className="w-full flex justify-end">
        <Button
          variant={"outline"}
          onClick={() => window.location.reload()}
          className={`my-2`}
        >
          <RefreshCwIcon />
        </Button>
      </div>
    </>
  );
}
