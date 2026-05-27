import { UseFormRegister } from "react-hook-form";
import { MenuDashboardAddSchemaType } from "../md.forms/md.schema";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaMenuDashboardComponents({
  label,
  register,
  error,
  name,
}: {
  label: String;
  register: UseFormRegister<MenuDashboardAddSchemaType>;
  error: any;
  name: keyof MenuDashboardAddSchemaType;
}) {
  return (
    <div className="flex gap-1 flex-col">
      <label htmlFor="organization_background">{label}</label>
      <Textarea
        {...register("organization_background")}
        className="resize-none h-24 overflow-y-auto"
        name={name}
        id="organization_background"
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
