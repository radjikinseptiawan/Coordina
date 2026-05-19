"use client"
import { serverUrl } from "@/utils/connection";
import { Container } from "@radix-ui/themes";
import axios from "axios";
import { Home, LogOut, User, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { navigation, route } from "./navbar.controllers";
import { useParams, usePathname, useRouter } from "next/navigation";



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

export function SideBar({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({})

    const pathname = usePathname()
    const params = useParams()
    const router = useRouter()
    const id = params.slug

    const toggleMenu = (index: number) => {
        setIsOpen(prev => ({ ...prev, [index]: !prev[index] }))
    }

    return (
        <div className="flex gap-3 w-full h-full fixed overflow-auto top-12 left-0">
            <div className="shadow p-2 overflow-y-auto min-h-screen w-1/6">
                {
                    route.map((item: any, index: number) => (
                        <div key={index} className=" border-b-2 rounded-md border-gray-50">
                            <button onClick={() => toggleMenu(index)} className={` w-full text-sm text-start px-1 py-2 font-medium hover:bg-gray-200 rounded-sm transition cursor-pointer ${pathname === item.path ? "bg-gray-200" : ""}`}>
                                {item.label}
                            </button>
                            {
                                isOpen[index] && item.children.map((child: any, childIndex: number) => {
                                    const condition = (child.href === "/profile" || child.href === "/dashboard") ? child.href : `/${id}${child.href}`
                                    const getUrl = `/${id}${child.href}`
                                    return (
                                        <button className={`
                                        ${pathname === getUrl ? "bg-gray-200" : ""}
                                        w-full hover:bg-gray-200 my-1 px-1 py-2 text-sm text-start rounded-sm transition cursor-pointer`} key={childIndex}>
                                            <Link href={condition as string} className="flex items-center">
                                                <child.icon className="mr-2" size={12} />
                                                {child.label}
                                            </Link>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    ))
                }
                <div className="mb-10"></div>
            </div>
            <div className="mx-2 my-3">
                {children}
            </div>

        </div>
    )
}