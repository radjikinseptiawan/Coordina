import { Button } from "@/components/ui/button";
import { UserPlus, XCircle } from "lucide-react";
import { useSystemRoleForm } from "../sr.hooks/sr.hooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react"; // Impor React untuk Fragment
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SettingsRoleForm() {
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useSystemRoleForm();

  // Handler saat form disubmit
  const onSubmit = (data: any) => {
    console.log("Payload yang dikirim ke NestJS:", data);
    // Jalankan logika mutasi/post API di sini
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="roleName" className="mb-1 block">
          Role Name
        </Label>
        <Input
          id="roleName"
          {...register("roleName")}
          placeholder="E.g., Vice Chairman"
        />
        {errors.roleName && (
          <span className="text-xs text-red-500">
            {errors.roleName.message as string}
          </span>
        )}
      </div>

      <div className="overflow-x-auto max-h-[350px] border border-gray-200 rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Permission</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Is can write agenda</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Is can update agenda</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Is can delete agenda</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Is can submit attendance</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Is can accept or reject user request to join
              </TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Is can invite user to join organizations</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Is can update member role</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Is can write new role</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Is can update role</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Is can delete role</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-x-2 gap-y-3 justify-end pt-2">
        <Button
          type="button"
          onClick={() => router.push("role")}
          variant={"destructive"}
        >
          <XCircle className="w-4 h-4 mr-1" />
          Close
        </Button>

        <Button type="submit">
          <UserPlus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
    </form>
  );
}
