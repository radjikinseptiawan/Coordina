import { Link, TextField } from "@radix-ui/themes";
import { Eye, MailIcon, User } from "lucide-react";
import { InputEmailProps, InputPasswordProps, InputUsernameProps } from "./input.interfaces";
import { usePathname } from "next/navigation";
import { useState } from "react";


export function InputEmail({ value, setEmail, placeholder }: InputEmailProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor="email" className="text-[12px] text-slate-500">Email</label>
            <TextField.Root
                id="email"
                name="email"
                type="email"
                color="ruby"
                placeholder={placeholder}
                variant="classic"
                value={value}
                onChange={setEmail}
            >
                <TextField.Slot>
                    <MailIcon height={12} width={12} color="ruby" />
                </TextField.Slot>
            </TextField.Root>
        </div>
    )
}

export function InputPassword({ value, label, setPassword, placeholder }: InputPasswordProps) {
    const pathName = usePathname()
    return (
        <div className="flex flex-col">
            <label htmlFor={label} className="text-[12px] text-slate-500">{label}</label>
            <TextField.Root
                name={label}
                id={label}
                value={value}
                onChange={setPassword}
                color="ruby" type="password"
                placeholder={placeholder}
            >
                <TextField.Slot >
                    <Eye height={12} width={12} color="crimson" />
                </TextField.Slot>
            </TextField.Root>
            {
                pathName == "/login" && (
                    <Link href="/forgot-password" color="ruby" size={"1"}>Lupa Password?</Link>
                )
            }
        </div>
    )
}

export function InputUsername({ value, placeholder, setUsername }: InputUsernameProps) {
    return (
        <div>
            <label htmlFor="username" className="text-[12px] text-slate-500">Username</label>
            <TextField.Root type="text" placeholder={placeholder} variant="classic" color="ruby" value={value} onChange={setUsername}>
                <TextField.Slot>
                    <User color="ruby" size={12} />
                </TextField.Slot>
            </TextField.Root>
        </div>
    )
}



export interface otpCode {
    otp1: string | number
    otp2: string | number
    otp3: string | number
    otp4: string | number
}
