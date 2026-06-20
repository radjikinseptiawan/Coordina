export interface PayloadAttendance {
  method: string;
  proof_attendance: string;
  status: string;
}

export interface Attendance {
  status: string;
  user: {
    member_id: string;
  };
  agenda: {
    id: string;
  };
}
