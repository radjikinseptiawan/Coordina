"use client"
import { Button, Link, TextField } from "@radix-ui/themes";
import { Eye, Mail, User } from "lucide-react";
import GoogleMethod from "./method/al.google.method";
import { FormEvent, useState } from "react";
import { serverUrl } from "@/utils/connection";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "@/app/_shared/components/input";
import { useLoading } from "@/app/_shared/common/context/loading.context";

export default function AuthLoginTemplate() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { isLoading, setLoading } = useLoading()
    const router = useRouter()
    const loginWithBasic = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const data = await axios.post(`${serverUrl}/v1_beta/accounts/auth/login/`,
                { email, password }, { withCredentials: true })

            if (!data) {
                setLoading(false)
                return
            }

            if (data.status === 201) {
                setLoading(false)
                router.push("/dashboard")
            }
        } catch (e) {
            setLoading(false)
            console.error(e)
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="space-y-2 h-5xl bg-white w-80 shadow rounded-lg px-3 py-5">
                <h1 className="text-xl font-bold text-center text-[#DC143C]">Selamat datang di Coordina</h1>
                <p className="text-center text-gray-500 text-[12px]">Mari kelola organisasi dan komunitas Anda dengan lebih efisien dan terstruktur</p>
                <form onSubmit={loginWithBasic} className="space-y-4">
                    <Input variant="email" value={email} setEmail={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <Input variant="password" value={password} setPassword={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <div className="flex p-1 flex-col gap-2">
                        <Button disabled={isLoading} type="submit" variant="soft" color="ruby"> {isLoading ? "loading..." : "Masuk"}</Button>
                        <GoogleMethod />
                    </div>
                    <span className="flex justify-center items-center">
                        <Link href="/register" size={"1"} color="crimson" className="text-center mx-auto">Belum punya akun? Daftar sekarang</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}
