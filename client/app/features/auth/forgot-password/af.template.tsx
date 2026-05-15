
"use client"
import { Button, Link } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "@/app/_shared/components/Input";
import { useLoading } from "@/app/_shared/common/context/loading.context";

export default function AuthForgotPasswordTemplate() {
    const [email, setEmail] = useState<string>("")
    const { isLoading, setLoading } = useLoading()
    const router = useRouter()

    const forgotPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`/api/auth`,
                { email })

            if (!response) {
                setLoading(false)
                return
            }

            window.location.href = `/forgot-password/change-password?email=${email}`
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.error(e)
        }
    }


    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="space-y-2 h-5xl bg-white w-80 shadow rounded-lg px-3 py-5">
                <h1 className="text-xl font-bold text-center text-[#DC143C]">Lupa password akun Coordina?</h1>
                <p className="text-center text-gray-500 text-[12px]">Silahkan isi email dibawah ini, kami akan membantu memulihkan akun kamu. Pastikan email kamu aktif.</p>
                <form onSubmit={forgotPassword} className="space-y-4">
                    <Input variant="email" value={email} setEmail={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <div className="flex p-1 flex-col gap-2">
                        <Button disabled={isLoading} type="submit" variant="soft" color="ruby"> {isLoading ? "loading..." : "Kirim"}</Button>
                    </div>
                    <span className="flex justify-center items-center">
                        <Link href="/login" size={"1"} color="ruby" className="text-center mx-auto">Kembali ke login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}