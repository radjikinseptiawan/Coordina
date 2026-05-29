"use client";
import { DataTable } from "@/_shared/layouts/components/dataTable";
import { columns } from "./columns";
import { getAgenda } from "@/service/organizations/agenda.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function DataTableOrganizationsAgenda() {
  const params = useParams();
  const { data: tableData = [], isLoading } = useQuery({
    queryFn: () => getAgenda(params.slug as string),
    queryKey: ["agenda", params.slug],
    enabled: !!params.slug,
  });

  if (isLoading) return <p>Loading Resources...</p>;

  return <DataTable columns={columns} data={tableData} />;
}
