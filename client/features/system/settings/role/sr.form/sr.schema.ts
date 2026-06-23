import z from "zod";

const permissionsValue = z.enum([
  "CREATE_AGENDA",
  "UPDATE_AGENDA",
  "DELETE_AGENDA",
  "SUBMIT_ATTENDANCE",
  "MANAGE_JOIN_REQUEST",
  "INVITE_USER",
  "UPDATE_MEMBER_ROLE",
  "CREATE_ROLE",
  "UPDATE_ROLE",
  "DELETE_ROLE",
]);

export const FormRoleBasedAccessSchema = z.object({
  roleName: z.string().min(1, "Role Name must been filled!"),
  description: z.string().min(1, "Description of role must been filled!"),
  permissions: z.array(permissionsValue).default([]),
});

export type FormRoleBasedAccessSchema = z.infer<
  typeof FormRoleBasedAccessSchema
>;
