import z from "zod";

export const ResetPasswordSchemaType = z.object({
    otp: z.string().min(4,'OTP Must been filled minimum 4 characters'),
    password: z.string().min(1,"Password field must been filled!"),
    confirmPassword: z.string().min(1,"Confirm Password field must been filled!"),
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Password didnt match!"
})

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchemaType>