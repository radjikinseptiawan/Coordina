import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { ReactNode } from "react";

export default function MenuProfileContainerComponents({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex flex-col md:flex-row justify-center items-center">
        {children}
      </div>
      <Button>
        <Save /> Save
      </Button>
    </div>
  );
}
