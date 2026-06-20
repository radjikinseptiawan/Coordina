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
import { Attendance } from "@/_shared/custom/@types/attendance.type";

export default function TableRecapAdministrations() {
  const params = useParams().slug;
  const [members, setMembers] = useState<Member[]>([]);
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [merged, setMergedData] = useState<any>();
  const [attendance, setAttendance] = useState<Attendance[]>([]);
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
    const result = data.attendance;
    setAttendance(result);
    return result;
  };

  const jsonEditor = async () => {
    const members = await membersFetch();
    const agenda = await agendaFetch();
    const attendance = await attendanceFetch();
    const payload = {
      members: members,
      attendance: attendance,
      agendas: agenda,
    };

    console.log(payload);
    setMergedData(payload);
  };

  useEffect(() => {
    jsonEditor();
  }, []);

  return (
    <>
      <AttendanceRecapAdmControllers initialValue={merged} />
      <div className="shadow w-full overflow-x-auto px-2 py-1 rounded-md">
        <Table className="min-w-max">
          <TableHeader>
            <TableRow>
              <TableHead className="relevant md:sticky left-0 bg-white text-center font-semibold">
                Members
              </TableHead>
              {merged &&
                merged.agendas.map((item: any, index: number) => (
                  <TableHead key={index}>{item.agenda_name}</TableHead>
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
                      const record = attendance.find((item) => {
                        return (
                          item.user.member_id == user.member.id &&
                          item.agenda.id === ag.id
                        );
                      });
                      return (
                        <TableCell key={index}>
                          <span
                            className={`${record?.status == "ABSENT" ? "text-red-500" : ""}`}
                          >
                            {record && record.status}
                          </span>
                        </TableCell>
                      );
                    })}
                    <TableCell className="sticky shadow right-0 bg-white">
                      58%
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
