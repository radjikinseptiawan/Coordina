import { Link, TextField } from "@radix-ui/themes";
import { Camera, Eye, Mail, MailOpen, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { BasicInputProps, InputImageFile } from "./input.interfaces";

export function InputEmail({ value, action, placeholder }: BasicInputProps) {
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
                onChange={action}
            >
                <TextField.Slot>
                    <Mail color="crimson" size={12} />
                </TextField.Slot>
            </TextField.Root>
        </div>
    )
}

export function InputPassword({ value, label, action, placeholder }: BasicInputProps) {
    const pathName = usePathname()
    return (
        <div className="flex flex-col">
            <label htmlFor={label} className="text-[12px] text-slate-500">{label}</label>
            <TextField.Root
                name={label}
                id={label}
                value={value}
                onChange={action}
                color="crimson" type="password"
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

export function InputUsername({ value, placeholder, action }: BasicInputProps) {
    return (
        <div>
            <label htmlFor="username" className="text-[12px] text-slate-500">Username</label>
            <TextField.Root type="text" placeholder={placeholder} variant="classic" color="ruby" value={value} onChange={action}>
                <TextField.Slot>
                    <User color="crimson" size={12} />
                </TextField.Slot>
            </TextField.Root>
        </div>
    )
}

export function InputImage({ action, preview }: InputImageFile) {
    const refId = useRef<HTMLInputElement>(null)

    const inputImagesHelper = () => {
        refId.current?.click()
    }

    return (
        <>
            <div
                className="bg-gray-500 rounded-full flex items-center justify-center w-32 md:w-72 md:h-72 h-32"
                onClick={inputImagesHelper}
            >  {typeof preview === "string" ? (
                <img
                    src={`${preview}`}
                    alt="preview"
                    className="w-full h-full object-cover rounded-full"
                />
            ) : (
                <Camera size={80} />
            )}
            </div>

            <input
                type="file"
                ref={refId}
                hidden
                accept="image/*"
                onChange={action}
            />
        </>
    )
}


export interface otpCode {
    otp1: string | number
    otp2: string | number
    otp3: string | number
    otp4: string | number
}
