import {
  Control,
  useFieldArray,
  UseFormRegister,
  FormState,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // sesuaikan import Input lo (biasanya @ /components/ui/input)
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { MenuDashboardAddSchemaType } from "../md.forms/md.schema";

interface MissionFieldProps {
  control: Control<MenuDashboardAddSchemaType>;
  register: UseFormRegister<MenuDashboardAddSchemaType>;
  errors: FormState<MenuDashboardAddSchemaType>["errors"];
}

export default function MenuDashboardMissionField({
  control,
  register,
  errors,
}: MissionFieldProps) {
  // Hubungkan useFieldArray dengan skema data misi lo
  const { fields, append, remove } = useFieldArray({
    control,
    name: "organization_mission",
  });

  return (
    <div className="flex gap-1 flex-col my-2">
      <div className="flex justify-between">
        <span>
          <Label>Organization Mission</Label>
          <p className="text-sm text-gray-500">
            Total Mission : {fields.length}
          </p>
        </span>
        <Button
          onClick={() => append({ mission: "" })}
          variant={"outline"}
          type="button"
        >
          <Plus />
        </Button>
      </div>

      <div className="h-40 rounded-md border px-1 py-2 overflow-y-auto">
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex my-2 items-center gap-2">
                <span className="text-sm font-semibold text-gray-500">
                  {index + 1}
                </span>
                <Input
                  {...register(
                    `organization_mission.${index}.mission` as const,
                  )}
                  className="bg-white"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {errors.organization_mission?.[index]?.mission && (
                <p className="text-xs text-red-500 ml-7">
                  {errors.organization_mission[index]?.mission?.message}
                </p>
              )}
            </div>
          ))
        ) : (
          <span className="flex justify-center items-center h-full text-gray-500">
            No mission yet!
          </span>
        )}
      </div>

      {errors.organization_mission?.root && (
        <p className="text-red-500 text-sm">
          {errors.organization_mission.root.message}
        </p>
      )}
    </div>
  );
}
