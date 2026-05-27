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
import { MenuDasboardCardsTypes } from "./md.cards";
import { MenuDashboardAddSchemaType } from "../md.forms/md.schema";
import { itemDropdown } from "./md.resources";

export default function MenuDashboardDropDownComponent({
  selected,
  valued,
  placeHolder,
  name,
}: {
  placeHolder: string;
  selected: string | boolean;
  valued: UseFormSetValue<MenuDashboardAddSchemaType>;
  name: keyof MenuDashboardAddSchemaType;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <ChevronDown />
          {selected ? selected : placeHolder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {itemDropdown.map((item) =>
            item.wilayah.map((recit) => (
              <DropDownItem
                label={recit.label}
                key={recit.value}
                name={name}
                value={recit.value}
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
