export type AgendaStatus = "COMING_SOON" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
export type AgendaType = "online" | "offline";

export type Agenda = {
  id: string;
  agenda_name: string;
  potential_level: string;
  tanggal_agenda: string;
  status_agenda: AgendaStatus;
  is_online: AgendaType;
  lokasi: string;
  lokasi_link: string | null;
  meetingLink?: string;
  room_pass?: string;
  note?: string;
  lampiran?: string;
  start_at: string;
  end_at: string;
  created_by_id: string;
};

export type User = {
  username: string;
  fullname: string;
  number_phone: string;
  image: string;
};

export type DetailAgenda = {
  id: string;
  agenda_name: string;
  potential_level: string;
  tanggal_agenda: string;
  status_agenda: AgendaStatus;
  is_online: AgendaType;
  lokasi: string;
  lokasi_link: string | null;
  meetingLink?: string;
  room_pass?: string;
  note?: string;
  lampiran?: string;
  start_at: string;
  end_at: string;
  created_by_id: string;
  user_member_profile: User;
  result: {
    status: string;
    checkin_at: string;
    proof_attendance: string;
  };
};
