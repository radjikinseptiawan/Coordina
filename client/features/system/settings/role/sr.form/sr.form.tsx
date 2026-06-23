import { Button } from "@/components/ui/button";
import { Trash, UserPlus, XCircle } from "lucide-react";
import { useSystemRoleForm } from "../sr.hooks/sr.hooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react"; // Impor React untuk Fragment
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import axios from "axios";
import { formValue } from "../sr.hooks/sr.utils";
import {
  createRole,
  deleteRole,
  readRole,
  updateRole,
} from "@/service/settings/roles.service";

export function SettingsRoleForm() {
  const router = useRouter();
  const params = useParams().slug as string;
  const action = useSearchParams().get("action");
  const idRole = useSearchParams().get("id") as string;
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useSystemRoleForm();

  const editRole = async () => {
    if (action != "edit") return null;
    try {
      const initialValue = await readRole(params);
      if (!initialValue) return null;

      const selectedData = initialValue.data.data.find(
        (item: any) => item.id == idRole,
      );

      const mappedPermission = selectedData.permission.map(
        (perm: any) => perm.permission.name || perm.permission_id || [],
      );
      const dataSpec = {
        roleName: selectedData.name,
        description: selectedData.description,
        permissions: mappedPermission,
      };

      reset(dataSpec);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data: any) => {
    console.log("Payload yang dikirim ke NestJS:", data);

    if (action == "add") {
      createRole(data, params);
    } else if (action == "edit" && idRole) {
      updateRole(data, params, idRole);
    }
  };

  useEffect(() => {
    editRole();
  }, [action]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 h-96 overflow-y-auto"
    >
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

      <div>
        <Label htmlFor="roleName" className="mb-1 block">
          Description
        </Label>
        <textarea
          id="roleName"
          {...register("description")}
          placeholder="Type your think..."
          className="w-full h-32 resize-none overflow-y-auto border rounded-md px-2 py-1"
        />
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description.message as string}
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
            {formValue.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    value={item.value}
                    {...register("permissions")}
                  />
                </TableCell>
              </TableRow>
            ))}
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
        {action == "edit" && (
          <Button
            onClick={() => deleteRole(params, idRole)}
            type="button"
            variant={"secondary"}
          >
            <Trash />
          </Button>
        )}
      </div>
    </form>
  );
}
