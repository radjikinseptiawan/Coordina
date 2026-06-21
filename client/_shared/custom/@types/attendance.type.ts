export interface PayloadAttendance {
  method: string;
  proof_attendance: string;
  status: string;
}

export interface AttendanceData {
  status: string;
  user: {
    member_id: string;
  };
  agenda: {
    id: string;
  };
}

interface RootObject {
  message: string;
  agenda: Agenda[];
  attendance: Attendance[];
}

export interface Percentage {
  user: User;
  present: number;
  percentage: number;
}

interface Attendance {
  id: string;
  agenda_id: string;
  user_id: string;
  method: string;
  status: string;
  proof_attendance: string;
  checkin_at: string;
  created_at: string;
  agenda: Agenda;
  user: User;
}

interface User {
  id: string;
  member_id: string;
  comity_id: string;
  account_id: string;
  role_id: string;
  position: null;
  created_at: string;
  updated_at: string;
}

interface Agenda {
  id: string;
  comity_id: string;
  agenda_name: string;
  tanggal_agenda: string;
  status_agenda: string;
  is_online: string;
  lokasi: string;
  lokasi_link: string;
  meetingLink: string;
  room_pass: string;
  note: string;
  lampiran: null;
  priority_level: string;
  start_at: string;
  end_at: string;
  created_by_id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
