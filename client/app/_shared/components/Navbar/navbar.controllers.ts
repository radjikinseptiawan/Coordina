import axios from "axios"
import { Bell, Building, BuildingIcon, Calendar, CalendarIcon, Check, CheckIcon, ClockIcon, File, FileIcon, Home, LogOut, MailMinus, MailMinusIcon, MailPlus, MailPlusIcon, Outdent, OutdentIcon, Paperclip, PaperclipIcon, User, UserIcon, UsersIcon, Wallet, WalletIcon } from "lucide-react"

export async function logoutHelper() {
    try {
        const response = await axios.delete("/api/auth/logout")

        if (response) {
            console.log("berhasil logout")
        }

    } catch (e) {
        console.error(e)
    }
}


export const navigation = [
    {
        label: "Dashboard",
        href: "/dashboard",
        action: () => console.log("Mengalihkan ke dashboard"),
        icon: Home
    },
    {
        label: "Notifikasi",
        href: "/notifikasi",
        action: () => console.log("Mengalihkan ke notifikasi"),
        icon: Bell
    },
    {
        label: "Akun Saya",
        href: "/profile",
        action: () => console.log("mengalihkan ke dashboard"),
        icon: User,
    },
    {
        label: "Log Out",
        href: `/login`,
        action: logoutHelper,
        icon: LogOut
    }
]


export const route = [
    {
        label: "Keorganisasian",
        children: [
            {
                label: "Dashboard",
                href: "/keorganisasian",
                icon: Home
            },
            {
                label: "Agenda",
                href: "/keorganisasian/agenda",
                icon: CalendarIcon
            },
            {
                label: "Absensi",
                href: "/keorganisasian/absensi",
                icon: CheckIcon
            },
            {
                label: "Audit Log",
                href: "/keorganisasian/audit-log",
                icon: ClockIcon
            }
        ]
    }, {
        label: "Pembukuan",
        path: "/keuangan",
        children: [
            {
                label: "Uang Kas",
                href: "/keuangan/uang-kas",
                icon: WalletIcon
            },
            {
                label: "Laporan Keuangan",
                href: "/keuangan/laporan",
                icon: PaperclipIcon
            }
        ]
    }, {
        label: "Administrasi",
        children: [
            {
                label: "Data Anggota",
                href: "/administrasi/data-anggota",
                icon: UsersIcon
            }, {
                label: "Draft Surat",
                href: "/administrasi/draft-surat",
                icon: FileIcon
            }, {
                label: "Surat Masuk",
                href: "/administrasi/surat-masuk",
                icon: MailPlusIcon
            }, {
                label: "Surat Keluar",
                href: "/administrasi/surat-keluar",
                icon: MailMinusIcon
            }
        ]
    }, {
        label: "Pengaturan",
        children: [
            {
                label: "Akun",
                href: "/profile",
                icon: UserIcon
            },
            {
                label: "Profile Saya",
                href: "/pengaturan/profile-organisasi",
                icon: BuildingIcon
            },
            {
                label: "Menu",
                href: "/dashboard",
                icon: OutdentIcon
            }
        ]
    }
]