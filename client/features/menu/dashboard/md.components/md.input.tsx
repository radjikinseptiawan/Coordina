import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, UseFormSetError } from "react-hook-form";
import { MenuDashboardAddSchemaType } from "../md.forms/md.schema";

export const InputAddCards = ({
  error,
  type,
  name,
  register,
  label,
}: {
  error: any;
  type: string;
  register: UseFormRegister<MenuDashboardAddSchemaType>;
  name: keyof MenuDashboardAddSchemaType;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input type={type} id="organization_name" {...register(name)} />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
