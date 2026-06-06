"use client";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCwIcon, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdmMemberControllers() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const handleRefresh = async () => {
    if (!params.slug) return;

    setIsRefresh(true);
    await queryClient.invalidateQueries({
      queryKey: ["member", params.slug],
    });
    setIsRefresh(false);
  };

  console.log(params);
  return (
    <div>
      <Button onClick={() => router.push("?invite=true")}>
        <Send />
        Invite
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
    </div>
  );
}
