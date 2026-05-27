import z from "zod";

export const MenuProfileSchemaType = z.object({
  username: z.string().min(1, "Username must be filled!").optional(),
  email: z.string().min(1, "Email must be filled!").email().optional(),
  fullname: z.string().min(1, "Fullname must be filled!").optional(),
  number_phone: z
    .string()
    .min(10, "Number phone must be 10 or 12 characters")
    .max(12, "Number phone not valid, too long!"),
  image: z
    .any()
    .refine((val) => {
      if (!val) return false;
      if (typeof val === "string") return val.length > 0;
      if (val instanceof FileList) return val.length > 0;
      return true;
    }, "Photo Icon must be filled!")
    .refine((val) => {
      if (typeof val === "string") return true;
      const file = val instanceof FileList ? val[0] : val;
      return file ? file.size <= 2 * 1024 * 1024 : false;
    }, "Max file size is 2MB")
    // Validasi Ekstensi
    .refine((val) => {
      if (typeof val === "string") return true;
      const file = val instanceof FileList ? val[0] : val;
      return file
        ? ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
            file.type,
          )
        : false;
    }, "Only .jpg, .png and .webp format are supported!")
    .optional(),
});

export type MenuProfileSchemaType = z.infer<typeof MenuProfileSchemaType>;

export type InputProfilDataType = {
  label: string;
  name: keyof MenuProfileSchemaType;
};
