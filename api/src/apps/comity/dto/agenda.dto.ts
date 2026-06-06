export enum AgendaStatus {
  COMING_SOON = 'COMING_SOON',
  ON_GOING = 'ON_GOING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  PERMISSION = 'PERMISSION',
  SICK = 'SICK',
}

export enum PotentialLevel {
  LOW = 'LOW',
  IMPORTANT = 'IMPORTANT',
  URGENT = 'URGENT',
}

export interface AgendaPayload {
  agenda_name: string;
  tanggal_agenda: string;
  status_agenda: AgendaStatus | 'COMING_SOON';
  is_online: 'online' | 'offline';
  note: string;
  priority_level: PotentialLevel;
  link_lokasi: string;
  password: string;
  lampiran?: string;
  lokasi?: string;
  meetingLink?: string;
  start_at: string;
  end_at: string;
  checkin_at: string;
  status: AttendanceStatus;
  users: string;
}
