import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { UseFormSetValue } from "react-hook-form";
import { MenuDashboardAddSchemaType } from "../md.forms/md.schema";

export default function MenuDashboardDropDownComponent({
  selected,
  valued,
  hardData,
  placeHolder,
  name,
}: {
  placeHolder: string;
  hardData: any;
  selected: string | boolean;
  valued: UseFormSetValue<MenuDashboardAddSchemaType>;
  name: keyof MenuDashboardAddSchemaType;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <ChevronDown />
          {typeof selected === "string" && selected ? selected : placeHolder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
        <DropdownMenuGroup>
          {/* CASE 1: JIKA DROPDOWN PROVINSI (Mapping Array 1 Dimensi langsung) */}
          {placeHolder === "Select Province" &&
            hardData.map((item: any, index: number) => (
              <DropDownItem
                label={item.label}
                key={item.value || index}
                name={name}
                value={item.label}
                setValue={valued}
              />
            ))}

          {placeHolder === "Select City/Regency" &&
            hardData.map((item: any) =>
              item.wilayah.map((recit: any) => (
                <DropDownItem
                  label={recit.label}
                  key={recit.value}
                  name={name}
                  value={recit.label}
                  setValue={valued}
                />
              )),
            )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropDownItem = ({
  setValue,
  label,
  name,
  value,
}: {
  name: keyof MenuDashboardAddSchemaType;
  label: string;
  value: string;
  setValue: UseFormSetValue<MenuDashboardAddSchemaType>;
}) => {
  return (
    <DropdownMenuItem onClick={() => setValue(name, value)}>
      {label}
    </DropdownMenuItem>
  );
};
