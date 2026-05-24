import z from "zod";

export const ForgotPasswordSchemaType = z.object({
    email : z.string().min(1,'this field must been filled!').email()
})

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchemaType>