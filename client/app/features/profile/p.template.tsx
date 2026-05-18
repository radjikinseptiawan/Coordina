import { DashboardContextProvider } from "../dashboard/da.context";
import UserProfileForms from "./forms/p.forms";

export default function UserProfileTemplate(){
    return(
        <DashboardContextProvider>
            <h1 className="text-md md:text-xl font-bold">Profile</h1>   
            <p className="italic">Profile Saya</p>
            <UserProfileForms/>
        </DashboardContextProvider>
    )
}