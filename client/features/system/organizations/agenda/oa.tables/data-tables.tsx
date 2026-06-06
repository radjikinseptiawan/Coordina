"use client";
import { DataTable } from "@/_shared/layouts/components/dataTable";
import { columns } from "./columns";
import { getAgenda } from "@/service/organizations/agenda.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailCardsDialog from "../oa.dialogs/detail-cards.dialogs";

export default function DataTableOrganizationsAgenda() {
  const params = useParams();
  const [page, setPage] = useState<number | string>(1);
  const { data: tableData = [], isLoading } = useQuery({
    queryFn: () => getAgenda(params.slug as string, page as number),
    queryKey: ["agenda", params.slug, page],
    enabled: !!params.slug,
  });
  if (isLoading) return <p>Loading Resources...</p>;

  const totalData = tableData.data ?? [];
  const totalPages = tableData.meta.totalPages ?? 0;
  console.log(page);
  return (
    <>
      <DataTable
        columns={columns}
        currentPage={page as number}
        pageCount={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        data={totalData}
      />
      <DetailCardsDialog data={totalData} />
    </>
  );
}
