import { ChangeEvent } from "react";

export interface InputType {
    variant: "email" | "password" | "username" | "otp"
}

export interface InputEmailProps {
    value: string;
    setEmail?: (email: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export interface InputUsernameProps {
    value: string;
    setUsername?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export interface InputPasswordProps {
    value: string;
    setPassword?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
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


export interface InputProps extends InputType,
    InputEmailProps,
    InputPasswordProps,
    InputUsernameProps { }