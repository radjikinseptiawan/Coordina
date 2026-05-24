import z from "zod";

export const LoginSchemaType = z.object({
    email: z.string().min(1,"Email must been filled!").email("Email is`nt valid!"),
    password: z.string().min(8,"Password must containt 8 character or more!")
})

export type LoginSchemaType = z.infer<typeof LoginSchemaType>