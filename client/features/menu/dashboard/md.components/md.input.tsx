import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, UseFormSetError } from "react-hook-form";
import { MenuDashboardAddSchemaType } from "../md.forms/md.schema";

export const InputAddCards = ({
  error,
  name,
  register,
  label,
}: {
  error: any;
  register: UseFormRegister<MenuDashboardAddSchemaType>;
  name: keyof MenuDashboardAddSchemaType;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input id="organization_name" {...register(name)} />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
