import z from "zod";

export const UserProfileSchema = z.object({
  username: z.string().min(3,"Username wajib diisi setidaknya 3 huruf!"),
  fullname: z.string().min(5,"Nama Lengkap wajib diisi setidaknya 5!"),
  email: z.string().regex(/.+@.+\..+/, "Email harus valid"),
  image: z.any().optional()
})
export type IOUserProfileSchema = z.infer<typeof UserProfileSchema>