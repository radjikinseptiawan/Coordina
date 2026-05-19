import { ChangeEvent } from "react";

export interface InputType {
    variant: "email" | "password" | "username" | "otp" | "image"
}

export interface BasicInputProps {
    label?: string;
    value?: string | undefined
    action: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}


export interface OtpCode {
    otp1?: string | number
    otp2?: string | number
    otp3?: string | number
    otp4?: string | number
}

export interface OtpInputItemProps {
    field?: keyof OtpCode; // Ini supaya TS tahu input ini untuk otp1, otp2, dst
    value?: OtpCode;
    setOtp?: (newValue: OtpCode) => void;
}

export interface InputImageFile { action: (e: any) => void, value?: string, preview?: string }

