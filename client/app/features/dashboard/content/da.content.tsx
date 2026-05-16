import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";

export default function DashboardContent() {
    const [data, setData] = useState<any[]>([])
    const [isAvailable, setIsAvailable] = useState(false)

    const getData = async () => {
        const response = await axios.get(`/api/dashboard`)

        const result = response.data.data.response.comities
        if (result.length > 0) {
            setIsAvailable(true)
            setData(result)
            return
        }

        setIsAvailable(false)
    }
    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="bg-white 
            p-3 h-[500px] my-5 
            shadow-xl border-2 border-slate-100 rounded-xl">
                <h1 className="font-semibold my-2">Organisasi Saya</h1>


                <div className="w-full h-[420px] 
                p-2 flex flex-col justify-center items-center
                rounded-md bg-slate-100 ">
                    {
                        isAvailable ? (
                            <>
                                <div className="grid border grid-cols-5 grid-rows-3 gap-2">
                                    {
                                        data.map((item, idx) => {
                                            console.log(item)
                                            return (
                                                <div key={idx} className="flex bg-white w-32 h-32 flex-col justify-center items-center rounded-full">
                                                    <div className="text-center flex flex-col items-center justify-items-center">
                                                        <Image src={"https://images.icon-icons.com/2622/PNG/512/gui_user_group_icon_157558.png"} alt="Logo" width={40} height={40} />
                                                        <h1>{item.comity.comity_short_name}</h1>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        ) : (
                            <>
                                <BsPeople size={60} className="mb-2 text-slate-400" />
                                <p className="text-gray-500 text-[12px] text-center my-2">Kamu tidak terikat dengan organisasi manapun</p>
                            </>
                        )
                    }
                </div>

            </div>
        </>
    )
}