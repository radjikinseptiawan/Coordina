import z from "zod";

const permissionActionSchema = z.object({
  create: z.boolean().default(false),
  read: z.boolean().default(false),
  update: z.boolean().default(false),
  delete: z.boolean().default(false),
});

export const FormRoleBasedAccessSchema = z.object({
  roleName: z.string().min(1, "Role Name must been filled!"),
  permissions: z.record(z.string(), permissionActionSchema),
});

export type FormRoleBasedAccessSchema = z.infer<
  typeof FormRoleBasedAccessSchema
>;
