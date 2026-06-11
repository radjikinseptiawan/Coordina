import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Plus, RefreshCwIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function OrganizationsAgendaControllers() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const [isRefresh, setIsRefresh] = useState(false);

  const handleRefresh = async () => {
    if (!params.slug) return;

    setIsRefresh(true);
    await queryClient.invalidateQueries({
      queryKey: ["agenda", params.slug],
    });
    setIsRefresh(false);
  };

  return (
    <>
      <Button onClick={() => router.push(`?mode=create`)}>
        <Plus size={12} />
        Add Agenda
      </Button>
      <div className="w-full flex justify-end">
        <Button
          disabled={isRefresh}
          variant={"outline"}
          onClick={handleRefresh}
          className={`my-2`}
        >
          <RefreshCwIcon className={`${isRefresh ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </>
  );
}
