import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuProfileInputProps } from "@/_shared/custom/@types/user.type";

export function MenuProfileInputComponents({
  label,
  name,
  error,
  register,
}: MenuProfileInputProps) {
  return (
    <tr>
      <td>
        <Label>{label}</Label>
      </td>
      <td>
        <Input {...register(name)} className="w-[300px] my-1" />
        {error && (
          <p className="text-red-500 text-sm pl-2 mt-0.5">{error.message}</p>
        )}
      </td>
    </tr>
  );
}
