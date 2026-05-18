import { getAuthUser } from "@/app/_shared/common/hooks/auth";
import { ReactNode } from "react";

export default function LayoutAuth({children}:{children:ReactNode}){
    const user = getAuthUser();
    return(
        <div>
        {children}
        </div>
    )
}