import z from "zod";

export const MenuDashboardAddSchemaType = z.object({
  organization_name: z.string().min(1, "Organization name must been filled!"),
  organization_vision: z
    .string()
    .min(1, "Organization Vision must been filled!"),
  organization_mission: z
    .array(
      z.object({
        mission: z.string().min(1, "Mission cannot be empty"),
      }),
    )
    .min(1, "At least one mission must been added!"),
  organization_background: z
    .string()
    .min(1, "Organization Background must been filled!")
    .max(300, "Organization Background cant be more 300 characters"),
  short_name: z.string().min(1, "Short Organization name must been filled!"),
  area_operational: z.string().min(1, "Area operational must been filled!"),
  city_operational: z.string().min(1, "City Operational must been filled!"),
  created_date: z.string().date(),
  organization_icon: z
    .any()
    .refine((file) => file.length > 0, "Organization Icon must been filled!")
    .refine((file) => file[0]?.size <= 2 * 1024 * 1024, "Max file size is 2MB")
    .refine(
      (file) =>
        ["image/jpg", "image/png", "image/webp"].includes(file[0]?.type),
      "Only .jpg, .png and .webp format are supported!",
    )
    .optional(),
});

export type MenuDashboardAddSchemaType = z.infer<
  typeof MenuDashboardAddSchemaType
>;

export type MenuDashboardAddType = {
  label: string;
  name: keyof MenuDashboardAddSchemaType;
  type?: string;
};
