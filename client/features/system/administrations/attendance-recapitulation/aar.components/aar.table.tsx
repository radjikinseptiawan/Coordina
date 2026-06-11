import React from "react";

// Definisikan tipe data untuk kejelasan properti komponen
interface AttendanceMember {
  name: string;
  position: string;
  status: "Hadir" | "Izin" | "Sakit" | "Alpha";
}

// Mock data berdasarkan gambar yang diunggah
const sampleAttendanceData: AttendanceMember[] = [
  { name: "Adam Mubarok", position: "Ketua Umum", status: "Hadir" },
  {
    name: "Radjikin Septiawan",
    position: "Kepala Departemen",
    status: "Hadir",
  },
  { name: "Imam Permana", position: "Sekretaris", status: "Alpha" },
  {
    name: "Felix Amon Sitinjak",
    position: "Kepala Departemen",
    status: "Hadir",
  },
  { name: "Tasya Ramadhani", position: "Anggota", status: "Alpha" },
  { name: "Indah Wafikah", position: "Anggota", status: "Hadir" },
];

export function AttendanceListTable() {
  // Fungsi pembantu untuk menentukan warna badge berdasarkan status kehadiran
  const getStatusBadgeClass = (status: AttendanceMember["status"]) => {
    switch (status) {
      case "Hadir":
        return "bg-green-50 text-green-700 border-green-200";
      case "Izin":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Sakit":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Alpha":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full">
      {/* Container dengan overflow-x agar aman saat dibuka di perangkat mobile */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
          {/* Kepala Tabel */}
          <thead className="bg-gray-50 font-semibold text-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 w-1/3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3 w-1/3">
                Posisi
              </th>
              <th scope="col" className="px-6 py-3 w-1/3 text-center">
                Kehadiran
              </th>
            </tr>
          </thead>

          {/* Isi Tabel */}
          <tbody className="divide-y divide-gray-100 bg-white">
            {sampleAttendanceData.map((member, index) => (
              <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                {/* Kolom Nama */}
                <td className="px-6 py-3.5 font-medium text-gray-900 whitespace-nowrap">
                  {member.name}
                </td>

                {/* Kolom Posisi */}
                <td className="px-6 py-3.5 text-gray-600 whitespace-nowrap">
                  {member.position}
                </td>

                {/* Kolom Status Kehadiran berupa Badge */}
                <td className="px-6 py-3.5 text-center whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                      member.status,
                    )}`}
                  >
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
