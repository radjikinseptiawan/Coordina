"use client"
import { Button } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { useDashboardContext } from "../da.context";
import { BsPeople } from "react-icons/bs";

export default function DashboardControllers() {
    const { setIsOpen } = useDashboardContext();
    return (
        <div className="w-screen flex justify-center gap-2">
            <Button onClick={() => setIsOpen(true)} variant="solid" color="ruby" className="hover:cursor-pointer items-center">
                <BsPeople size={12} />
                Buat Organisasi
            </Button>

            <Button variant="solid" color="ruby" className="hover:cursor-pointer">
                <Search />
                Cari Organisasi
            </Button>
        </div >
    )
}