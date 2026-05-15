"use client"
import { Button, Link, TextField } from "@radix-ui/themes";
import { Eye, Mail, User } from "lucide-react";
import { FormEvent, useState } from "react";
import { serverUrl } from "@/utils/connection";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "@/app/_shared/components/Input";
import { useLoading } from "@/app/_shared/common/context/loading.context";

export default function AuthRegisterTemplate() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const router = useRouter()
    const { isLoading, setLoading } = useLoading()


    const registerWithBasic = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (password !== confirmPassword) {
                console.log("Password tidak sama!")
                setLoading(false)
                return
            }
            const response = await axios.post(`${serverUrl}/v1_beta/accounts/auth/register/`,
                { email, password, username })

            setLoading(false)
            if (response.status === 201) {
                router.push("/login")
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
                <form onSubmit={registerWithBasic} className="space-y-4">
                    <Input variant="email" value={email} setEmail={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <Input variant="username" value={username} setUsername={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <Input label="Password" variant="password" value={password} setPassword={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <Input label="Konfirmasi Password" variant="password" value={confirmPassword} setPassword={(e) => setConfirmPassword(e.target.value)} placeholder="Konfirmasi Password" />
                    <div className="flex p-1 flex-col gap-2">
                        <Button color="ruby" disabled={isLoading} type="submit" variant="soft">{isLoading ? "loading..." : "Daftar"}</Button>
                    </div>
                    <span className="flex justify-center items-center">
                        <Link href="/login" size={"1"} color="ruby" className="text-center mx-auto">Sudah punya akun? kembali ke login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}
