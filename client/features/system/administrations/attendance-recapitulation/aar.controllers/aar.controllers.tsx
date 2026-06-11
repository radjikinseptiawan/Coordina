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

export default function AttendanceRecapAdmControllers() {
  const [agenda, setAgenda] = useState<Agenda[]>();
  const [agendaSelected, setSelectedAgenda] = useState<string>("All");
  const router = useRouter();
  const params = useParams();
  const getAgendaTemplate = async () => {
    const response = await getAgenda(params.slug as string);
    const data = response.data;
    setAgenda(data);
  };

  useEffect(() => {
    getAgendaTemplate();
  }, []);

  return (
    <div className="flex flex-col items-center md:flex-row justify-between">
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              Select Agenda
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuItem
              onClick={() => {
                router.push("?part=all");
                setSelectedAgenda("All");
              }}
              defaultChecked
              defaultValue={"All"}
            >
              All{" "}
            </DropdownMenuItem>
            {agenda?.map((item, index) => (
              <DropdownMenuItem
                onClick={() => {
                  router.push(`?part=${item.id}`);
                  setSelectedAgenda(item.agenda_name as string);
                }}
                key={index}
              >
                {item.agenda_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipButton icon={<SiLibreofficecalc />} tip="Export to Libre" />
        <TooltipButton icon={<RiFileExcel2Line />} tip="Export to Excel" />
      </div>

      <Card className="px-2 w-62 py-3">
        <CardContent>
          <CardTitle className="flex gap-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Selected: </p>{" "}
              <p className="text-[12px]">{agendaSelected}</p>
            </div>
          </CardTitle>
          <hr />
          <p>Anggota : 32 </p>
          <p>Hadir: 20</p>
          <p>Izin: 4</p>
          <p>Sakit: 2</p>
          <p>Absen: 6</p>
        </CardContent>
      </Card>
    </div>
  );
}
