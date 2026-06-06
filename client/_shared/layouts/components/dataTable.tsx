import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  currentPage,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="w-full overflow-x-auto rounded-md shadow p-2">
        <Table className="min-w-max whitespace-nowrap bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((rowGroup) => (
              <TableRow key={rowGroup.index}>
                {rowGroup.getVisibleCells().map((row) => (
                  <TableCell key={row.id}>
                    {flexRender(row.column.columnDef.cell, row.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="flex justify-around list-none">
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
          )}

          <div className="flex gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(
              (pageIdx) => (
                <PaginationItem key={pageIdx}>
                  <PaginationLink
                    href="#"
                    isActive={pageIdx === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageIdx);
                    }}
                  >
                    {pageIdx}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
          </div>

          {currentPage !== pageCount && (
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < pageCount) onPageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          )}
        </Pagination>
      </div>
    </>
  );
}
