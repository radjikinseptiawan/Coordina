import { BsPeople } from "react-icons/bs";

export default function DashboardContent() {
    return (
        <>
            <div className="bg-white 
            p-3 h-[500px] my-5 
            shadow-xl border-2 border-slate-100 rounded-xl">
                <h1 className="font-semibold my-2">Organisasi Saya</h1>

                <div className="w-full h-[420px] 
                p-2 flex flex-col justify-center items-center
                rounded-md bg-slate-100 ">
                    <BsPeople size={60} className="mb-2 text-slate-400" />
                    <p className="text-gray-500 text-[12px] text-center my-2">Kamu tidak terikat dengan organisasi manapun</p>
                </div>

            </div>
        </>
    )
}