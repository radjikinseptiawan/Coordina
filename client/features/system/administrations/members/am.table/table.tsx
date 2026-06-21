"use client";
import { DataTable } from "@/_shared/layouts/components/dataTable";
import { columns } from "./column";
import { useQuery } from "@tanstack/react-query";
import { membersList } from "@/service/organizations/members.service";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EditDialogsMember } from "../am.dialogs/edit.dialogs";
import { ShowDialogsMember } from "../am.dialogs/show.dialogs";

export default function DataTableAdmMembers() {
  const slugs = useParams();
  const params = useSearchParams().get("show");
  const [page, setPage] = useState<number | string>(0);
  const { data: tableData = [], isLoading } = useQuery({
    queryFn: () => membersList(slugs.slug as string),
    queryKey: ["member", slugs.slug, page],
    enabled: !!slugs.slug,
  });

  console.log(tableData);
  if (isLoading) return <p>Loading Resources...</p>;

  const totalData = tableData.data ?? [];
  const totalPages = tableData.meta.totalPages ?? 0;
  return (
    <>
      <DataTable
        onPageChange={(newPage) => setPage(newPage)}
        currentPage={1}
        pageCount={totalPages}
        data={totalData}
        columns={columns}
      />
      <ShowDialogsMember params={params as string} initialValue={tableData} />
      <EditDialogsMember initialValue={tableData} />
    </>
  );
}
