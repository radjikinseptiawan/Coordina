export type SignUpDto = {
    email: string;
    password: string;
    username: string;
    role: string;
    status: "AKTIF" | "TIDAK AKTIF"
}

export type SignInDto = {
    email: string;
    password: string;
}

export type ChangePasswordDto = {
    email: string;
    otp: number;
    newPassword: string;
}



export type SignInGoogleDto = {
    userId?: string;
    email: string | undefined;
    username: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    profileImage: string | undefined;
}