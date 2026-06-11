"use client";
import Containers from "@/_shared/layouts/components/containers";
import { CardsAdmRequest } from "./arj.components/arj.cards";
import { receiveJoinComity } from "@/service/organizations/members.service";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AdmRequestJoinTemplate() {
  const [data, setData] = useState();
  const params = useParams();
  const receive = async () => {
    const result = await receiveJoinComity(params.slug as string);
    console.log(result);
    setData(result as any);
  };

  useEffect(() => {
    receive();
  }, []);
  return (
    <Containers
      title="Pending Approvals"
      description={
        "Review and manage pending member registrations. Approve to grant access or reject to decline"
      }
    >
      <CardsAdmRequest data={data} />
    </Containers>
  );
}
