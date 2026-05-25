export enum AgendaStatus {
    COMING_SOON = "COMING_SOON",
    ON_GOING = "ON_GOING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export interface AgendaPayload {
    agenda_name: string;
    tanggal_agenda: string;
    status_agenda: AgendaStatus | "COMING_SOON";
    is_online : boolean;
    note: string; 
    lampiran: string;
    lokasi: string;
    meetingLink: string
}