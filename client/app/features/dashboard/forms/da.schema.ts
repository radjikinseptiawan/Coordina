import z from "zod"
export const OrganizationAddSchema = z.object({
    comity_area_of_operational: z.string().min(1, "Pilih Area Operasional"),
    comity_name: z.string().min(1, "Masukan Nama Organisasi"),
    comity_short_name: z.string().min(1, "Masukan Singkatan Organisasi"),
    comity_background: z.string().min(1, "Masukan Background"),
    comity_city_of_operational: z.string().min(1, "Masukan Tanggal"),
    comity_created_date: z.string().min(1, "Masukan Tanggal"),
})

export type IOrganizationAddSchema = z.infer<typeof OrganizationAddSchema>