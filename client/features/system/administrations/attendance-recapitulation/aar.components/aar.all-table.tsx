"use client";

import React from "react";

// Tipe data agar aman dari bug TypeScript
interface AgendaHeader {
  id: string;
  title: string;
  date: string;
}

interface MemberAttendance {
  name: string;
  attendanceLog: Record<string, "hadir" | "izin" | "sakit" | "alpha">; // mencocokkan id agenda dengan status
}

// 1. Mock Data sesuai gambar ketiga lu
const dynamicAgendas: AgendaHeader[] = [
  { id: "rapat_itfa", title: "Rapat ITFA", date: "22 JUNI 2026" },
  { id: "itfast", title: "ITFAST", date: "21 JULI 2026" },
  { id: "himatif_g", title: "HIMATIF G", date: "32 DESEMBER" }, // Sesuai teks unik di gambar lu haha
];

const membersAttendanceList: MemberAttendance[] = [
  {
    name: "Adam Mubarok",
    attendanceLog: { rapat_itfa: "hadir", itfast: "hadir", himatif_g: "hadir" },
  },
  {
    name: "Radjikin Septiawan",
    attendanceLog: { rapat_itfa: "hadir", itfast: "izin", himatif_g: "hadir" },
  },
  {
    name: "Imam Permana",
    attendanceLog: { rapat_itfa: "hadir", itfast: "alpha", himatif_g: "hadir" },
  },
  {
    name: "Felix Amon Sitinjak",
    attendanceLog: { rapat_itfa: "hadir", itfast: "sakit", himatif_g: "hadir" },
  },
  {
    name: "Tasya Ramadhani",
    attendanceLog: { rapat_itfa: "sakit", itfast: "alpha", himatif_g: "hadir" },
  },
  {
    name: "Indah Wafikah",
    attendanceLog: { rapat_itfa: "alpha", itfast: "alpha", himatif_g: "alpha" },
  },
];

export function AttendanceCrossTable() {
  // Helper styling text untuk status kehadiran biar rapi dan gampang dibaca
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "hadir":
        return "text-green-600 font-medium capitalize";
      case "izin":
        return "text-blue-600 font-medium capitalize";
      case "sakit":
        return "text-yellow-600 font-medium capitalize";
      case "alpha":
        return "text-red-500 font-medium capitalize";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
          {/* Header Bertingkat: Baris 1 untuk Nama Agenda, Baris 2 untuk Tanggal */}
          <thead className="bg-gray-50 text-gray-900 border-b border-gray-200">
            <tr>
              <th
                scope="col"
                rowSpan={2}
                className="px-6 py-4 font-semibold border-r border-gray-200 align-middle w-1/4"
              >
                Nama
              </th>
              {dynamicAgendas.map((agenda) => (
                <th
                  key={agenda.id}
                  scope="col"
                  className="px-4 py-2 font-semibold text-center border-r border-gray-200 last:border-r-0"
                >
                  {agenda.title}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50/60 text-xs text-gray-500">
              {dynamicAgendas.map((agenda) => (
                <th
                  key={agenda.id}
                  scope="col"
                  className="px-4 py-1.5 text-center font-normal border-r border-gray-200 last:border-r-0"
                >
                  {agenda.date}
                </th>
              ))}
            </tr>
          </thead>

          {/* Isi Record Kehadiran Anggota secara Horizontal */}
          <tbody className="divide-y divide-gray-100 bg-white">
            {membersAttendanceList.map((member, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                {/* Kolom Nama Anggota */}
                <td className="px-6 py-3 font-medium text-gray-900 border-r border-gray-100 whitespace-nowrap">
                  {member.name}
                </td>

                {/* Loop Status Kehadiran berdasarkan susunan kolom Agenda di atas */}
                {dynamicAgendas.map((agenda) => {
                  const status = member.attendanceLog[agenda.id] || "-";
                  return (
                    <td
                      key={agenda.id}
                      className="px-4 py-3 text-center border-r border-gray-100 last:border-r-0 whitespace-nowrap"
                    >
                      <span className={getStatusStyle(status)}>{status}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
