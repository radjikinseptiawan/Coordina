"use client"
import { serverUrl } from "@/utils/connection";
import { Container } from "@radix-ui/themes";
import axios from "axios";
import { Home, LogOut, User, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { logoutHelper } from "./navbar,controllers";

const navigation = [
    {
        label: "Dashboard",
        href: "/dashboard",
        action: () => console.log("Mengalihkan ke dashboard"),
        icon: Home
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

export function Navbar({ photo, username, email }: { photo?: string, username: string, email: string }) {
    const [open, setIsOpen] = useState<boolean>(false)

    const onOpen = () => {
        setIsOpen(!open)
    }

    return (
        <div className="shadow-md w-full bg-white z-40 p-2 justify-end fixed top-0 flex">
            <div onClick={onOpen} className="text-end flex items-center gap-2 cursor-pointer">
                <div>
                    <h1 className="text-[12px] font-medium">{username}</h1>
                    <p className="text-[12px] text-gray-600">{email}</p>
                </div>
                <Image
                    className="rounded-full"
                    src={photo || "https://img.magnific.com/vektor-premium/ikon-profil-pengguna-dalam-lingkaran_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80"} alt="profile"
                    width={24}
                    height={24} />
            </div>
            <AnimatePresence>
                {
                    open && (
                        <Dropdown setIsOpen={setIsOpen} />
                    )
                }
            </AnimatePresence>
        </div>
    )
}


export function Dropdown({ setIsOpen }: { setIsOpen: (open: boolean) => void }) {
    return (
        <motion.div
            key={"dropdown"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Container className="absolute z-10 top-12 px-2 py-2 shadow-xl w-32 md:w-48 right-0 bg-white rounded-b-md">
                <div className=" flex flex-col w-full items-start gap-2">
                    {
                        navigation.map((nav, i) => {
                            return (
                                <button className="w-full hover:bg-gray-200 rounded-sm transition cursor-pointer" key={i} onClick={nav.action}>
                                    <Link href={nav.href} className="py-2 px-1 text-[12px] text-gray-600 flex">
                                        <nav.icon className="mr-2" size={12} />
                                        {nav.label}
                                    </Link>
                                </button>
                            )
                        })
                    }
                    <button onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-1 w-full text-[12px] py-1 rounded-sm hover:bg-gray-100 transition bg-gray-200 cursor-pointer" >
                        <XIcon size={12} />
                        Tutup
                    </button>
                </div>

            </Container>
        </motion.div>
    )
}