import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuProfileForms from "../mp.forms/mp.forms";
import MenuProfileInfoComponents from "../mp.components/mp.info";
import { BsBack } from "react-icons/bs";

export default function MenuProfileControllers(){
    const route = useRouter()
    const isEdit = useSearchParams().get("edit")
    return(
        <>
      <div className="flex justify-between mx-5">
      <div>
      <h1 className="text-xl font-semibold">Profile</h1>
      <p className="text-gray-500">Edit or read your profile here!</p>
      </div>

            {
                isEdit === "true"  ? 
                    <Button onClick={()=>route.push('/profile')}>
                        <BsBack/>
                        <p>Cancel</p>
                    </Button>
                    :
                    <Button onClick={()=>route.replace('?edit=true')}>
                    <Edit/>
                    <p>Edit Profile</p>
                    </Button>
            }
    </div>
      <hr />
        </>
    )
}