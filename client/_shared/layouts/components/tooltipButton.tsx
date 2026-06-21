import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export function TooltipButton({
  icon,
  onClick,
  tip,
}: {
  onClick: () => void;
  icon: ReactNode;
  tip: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={onClick}>{icon}</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
