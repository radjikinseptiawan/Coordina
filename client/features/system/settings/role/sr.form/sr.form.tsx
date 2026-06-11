import { Button } from "@/components/ui/button";
import { UserPlus, XCircle } from "lucide-react";
import { useSystemRoleForm } from "../sr.hooks/sr.hooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react"; // Impor React untuk Fragment

// Data modul dipindahkan ke luar atau jadikan state static
const modulesData = [
  {
    name: "Organisasi",
    children: [
      { id: "agenda", label: "Agenda" },
      { id: "attendance", label: "Attendance" },
      { id: "audit_log", label: "Audit Log" },
    ],
  },
  {
    name: "Administrasi",
    children: [
      { id: "members", label: "Members" },
      { id: "attendance", label: "Attendance Recapitulations" },
      { id: "approve request", label: "Approvement Join Request" },
    ],
  },
  {
    name: "Settings",
    children: [
      { id: "rbac", label: "Role Based Access Control" },
      { id: "setting_org", label: "Setting Organizations" },
    ],
  },
];

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
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
          <thead className="bg-gray-50 sticky top-0 z-10 shadow-[0_1px_0_0_rgba(229,231,235,1)]">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-900 w-1/2"
              >
                Module / Page
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-900 text-center"
              >
                Create
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-900 text-center"
              >
                Read
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-900 text-center"
              >
                Update
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-gray-900 text-center"
              >
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {modulesData.map((category, catIndex) => (
              // Menggunakan React.Fragment menggantikan <div> agar HTML tetap valid
              <React.Fragment key={catIndex}>
                {/* Row Header Kategori */}
                <tr className="bg-gray-50/70 font-semibold text-gray-900">
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500"
                  >
                    {category.name}
                  </td>
                </tr>

                {/* Row Sub-Modul */}
                {category.children.map((child, childIndex) => (
                  <tr
                    key={childIndex}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 pl-6 font-medium text-gray-800">
                      {child.label}
                    </td>
                    {/* Input di-bind menggunakan key format nested objek/array */}
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        {...register(`permissions.${child.id}.create`)}
                        className="w-4 h-4 rounded text-black focus:ring-black accent-black cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        {...register(`permissions.${child.id}.read`)}
                        className="w-4 h-4 rounded text-black focus:ring-black accent-black cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        {...register(`permissions.${child.id}.update`)}
                        className="w-4 h-4 rounded text-black focus:ring-black accent-black cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        {...register(`permissions.${child.id}.delete`)}
                        className="w-4 h-4 rounded text-black focus:ring-black accent-black cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
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
