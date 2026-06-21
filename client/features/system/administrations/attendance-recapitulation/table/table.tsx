import { Agenda } from "@/_shared/custom/@types/agenda.type";
import { Member } from "@/_shared/custom/@types/member.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAgenda } from "@/service/organizations/agenda.service";
import { membersList } from "@/service/organizations/members.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AttendanceRecapAdmControllers from "../aar.controllers/aar.controllers";
import { getAllAttendance } from "@/service/organizations/attendance.service";
import { AttendanceData } from "@/_shared/custom/@types/attendance.type";
import { convertDate } from "@/lib/utils";
import * as XLSX from "xlsx";
import { presentColors } from "../aar.hooks/aar.utils";

export default function TableRecapAdministrations() {
  const params = useParams().slug;
  const [members, setMembers] = useState<Member[]>([]);
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [merged, setMergedData] = useState<any>();
  const [attendance, setAttendance] = useState<AttendanceData[]>([]);
  const [percentage, setPercentage] = useState<any>(null);
  const membersFetch = async () => {
    const data = await membersList(params as string);
    const result = data.data;
    setMembers(result);
    return result;
  };

  const agendaFetch = async () => {
    const data = await getAgenda(params as string);
    const result = data.data;
    setAgenda(result);
    return result;
  };

  const attendanceFetch = async () => {
    const data = await getAllAttendance(params as string);
    const result: any = data;
    setAttendance(result.attendance);

    setPercentage(result.percentage);
    return result;
  };

  const jsonEditor = async () => {
    const members = await membersFetch();
    const agenda = await agendaFetch();
    const attendance = await attendanceFetch();
    const payload = {
      attendance,
      members: members,
      agendas: agenda,
    };

    console.log(payload);
    setMergedData(payload);
  };

  useEffect(() => {
    jsonEditor();
  }, []);

  const exportToExcel = () => {
    if (!merged) return null;

    const excelData = merged.members.map((user: any) => {
      const rowData: any = {
        Members: user.member.fullname,
      };

      merged.agendas.forEach((ag: any) => {
        const record = attendance.find((item) => {
          return (
            item.user.member_id == user.member.id && item.agenda.id == ag.id
          );
        });
        rowData[ag.agenda_name] = record ? record.status : "-";
      });

      const userPercent =
        percentage && percentage[user.member_id]
          ? `${percentage[user.member_id].percentage}`
          : "0%";
      rowData["Perncetage %"] = userPercent;
      return rowData;
    });

    const workSheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      workSheet,
      `Recapitulation_Attendance`,
    );
    XLSX.writeFile(workbook, `Recap_Attendance_${params}.xlsx`);
  };

  return (
    <>
      <AttendanceRecapAdmControllers
        click={exportToExcel}
        initialValue={merged}
      />
      <div className="shadow w-full overflow-x-auto px-2 py-1 rounded-md">
        <Table className="min-w-max">
          <TableHeader>
            <TableRow>
              <TableHead className="relevant md:sticky left-0 bg-white text-center font-semibold">
                Members
              </TableHead>
              {merged &&
                merged.agendas.map((item: any, index: number) => (
                  <TableHead key={index} className="text-center">
                    <p className="font-semibold">{item.agenda_name}</p>
                    <p>{convertDate(item.tanggal_agenda)}</p>
                  </TableHead>
                ))}
              <TableHead className="sticky shadow right-0 bg-white text-center font-semibold">
                Percentage %
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {merged &&
              merged.members.map((user: any, index: number) => {
                return (
                  <TableRow className="text-center" key={index}>
                    <TableCell className="relevant md:sticky left-0 bg-white">
                      {user.member.fullname}
                    </TableCell>
                    {agenda.map((ag, index) => {
                      if (!attendance) return null;
                      const record = attendance.find((item) => {
                        return (
                          item.user.member_id == user.member.id &&
                          item.agenda.id === ag.id
                        );
                      });
                      return (
                        <TableCell key={index}>
                          {presentColors(record)}
                        </TableCell>
                      );
                    })}
                    <TableCell className="sticky shadow right-0 bg-white">
                      {percentage && percentage[user.member_id]
                        ? `${percentage[user.member_id].percentage}%`
                        : "0%"}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
