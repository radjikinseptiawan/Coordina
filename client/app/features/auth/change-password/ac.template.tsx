
"use client"
import { Button, Link, TextField } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/app/_shared/components/Input";
import { useLoading } from "@/app/_shared/common/context/loading.context";

export default function AuthChangePasswordTemplate() {
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { isLoading, setLoading } = useLoading()
    const [otp, setOtp] = useState<{
        otp1: string,
        otp2: string,
        otp3: string,
        otp4: string
    }>({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: ""
    })

    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")


    const forgotPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)

            if (password !== confirmPassword) {
                setLoading(false)
                return
            }

            const otpCode = `${otp.otp1}${otp.otp2}${otp.otp3}${otp.otp4}`
            const response = await axios.post(`/api/auth/change-password`,
                { password, otpCode: otpCode, email })

            if (!response) {
                setLoading(false)
                return
            }

            router.push(`/login`)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.error(e)
        }
    }


    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="space-y-2 h-5xl bg-white w-80 shadow rounded-lg px-3 py-5">
                <h1 className="text-xl font-bold text-center text-[#DC143C]">Ubah password akun Coordina?</h1>
                <p className="text-center text-gray-500 text-[12px]">
                    Kami telah mengirim email ke alamat {email}, lengkapi kolom dibawah berikut
                    dan hati hati jangan sebar kode OTP kesiapapun!
                </p>
                <form onSubmit={forgotPassword} className="space-y-4">
                    <div className="flex gap-2 justify-center">
                        <TextField.Root minLength={1} maxLength={1} max={1} min={0} className="text-center" value={otp.otp1} onChange={(e) => setOtp({ ...otp, otp1: e.target.value })} type="text"></TextField.Root>
                        <TextField.Root minLength={1} maxLength={1} max={1} min={0} className="text-center" value={otp.otp2} onChange={(e) => setOtp({ ...otp, otp2: e.target.value })} type="text"></TextField.Root>
                        <TextField.Root minLength={1} maxLength={1} max={1} min={0} className="text-center" value={otp.otp3} onChange={(e) => setOtp({ ...otp, otp3: e.target.value })} type="text"></TextField.Root>
                        <TextField.Root minLength={1} maxLength={1} max={1} min={0} className="text-center" value={otp.otp4} onChange={(e) => setOtp({ ...otp, otp4: e.target.value })} type="text"></TextField.Root>
                    </div>

                    <Input variant="password" label="Password Baru" value={password} setPassword={(e) => setPassword(e.target.value)} placeholder="Password Baru" />
                    <Input variant="password" label="Konfirmasi Password" value={confirmPassword} setPassword={(e) => setConfirmPassword(e.target.value)} placeholder="Konfirmasi Password Baru" />
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