import { getAuthUser } from "@/app/_shared/common/hooks/auth";
import { SideBar } from "@/app/_shared/components/Navbar/navbar.builder";
import { ReactNode } from "react";

export default function LayoutAuth({ children }: { children: ReactNode }) {
    const user = getAuthUser();
    return (
        <div>
            <SideBar>
                {children}
            </SideBar>
        </div>
    )
}