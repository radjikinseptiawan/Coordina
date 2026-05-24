import z from "zod";

export const RegisterSchemaType = z.object({
    email: z.string().min(1,"Email must been filled!").email(),
    password: z.string().min(8,"Password must containt 8 character or more!!"),
    username: z.string().min(1, "Username must been filled!"),
    confirmPassword: z.string().min(1,"Confirmation password must been filled!")
}).refine((data)=> data.confirmPassword === data.password,{
    message: "Password did`nt match!",
    path: ["confirmPassword"]
})

export type RegisterSchemaType = z.infer<typeof RegisterSchemaType>