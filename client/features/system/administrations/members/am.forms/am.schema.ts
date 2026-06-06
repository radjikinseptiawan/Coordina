import z from "zod";

export const FoundSchemaByEmailorUsername = z.object({
  text: z.string().min(1, "Must been filled!"),
});

export type FoundBySchemaEmailorUsernameType = z.infer<
  typeof FoundSchemaByEmailorUsername
>;
