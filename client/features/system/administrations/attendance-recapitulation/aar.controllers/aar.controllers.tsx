"use client";
import { Agenda } from "@/_shared/custom/@types/agenda.type";
import { TooltipButton } from "@/_shared/layouts/components/tooltipButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAgenda } from "@/service/organizations/agenda.service";
import { ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFileExcel, BsFileExcelFill, BsMicrosoft } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { SiLibreofficecalc } from "react-icons/si";
import { scoreColors } from "../aar.hooks/aar.utils";

export default function AttendanceRecapAdmControllers({
  initialValue,
  click,
}: {
  click: () => void;
  initialValue: any;
}) {
  if (!initialValue) return null;

  console.log(initialValue);
  return (
    <div className="flex flex-col items-center md:flex-row justify-between">
      <div>
        <div className="flex my-2">
          <TooltipButton
            onClick={click}
            icon={<RiFileExcel2Line />}
            tip="Export to Excel"
          />
        </div>
        <div className="flex gap-2">
          <p>Members Total : {initialValue.members.length}</p>
          <p>Agenda Total : {initialValue.agendas.length}</p>
        </div>
      </div>

      <div>
        <h1>Activity Score</h1>
        {scoreColors(initialValue)}
      </div>
    </div>
  );
}
