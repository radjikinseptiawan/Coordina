import z from "zod";

export const OrganizationAgendaSchemaType = z
  .object({
    agenda_name: z.string().min(1, "Agenda name must been filled!"),
    tanggal_agenda: z.string().refine(
      (date) => {
        const today = new Date().toLocaleDateString("sv-SE");
        return date >= today;
      },
      {
        message: "Agenda date cant be in the past!",
      },
    ),
    is_online: z.enum(["online", "offline"], {
      error: "agenda type must been filled!",
    }),

    meetingLink: z.string().optional(),
    password: z.string().optional(),
    start_at: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format!"),
    end_at: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format!"),
    lokasi: z.string().optional(),
    link_lokasi: z.string().optional(),
    note: z
      .string()
      .min(1, "Note field must been filled!")
      .max(500, "Note field cant more than 500 characters"),
    lampiran: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.end_at < data.start_at) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end_at"],
        message: "End at must been more large than start at",
      });
    }

    if (data.is_online === "online") {
      if (!data.meetingLink?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["meetingLink"],
          message: "Meeting link required",
        });
      }

      if (!data.password?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "Password is required",
        });
      }
    }

    if (data.is_online == "offline") {
      if (!data.lokasi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["lokasi"],
          message: "Location is required!",
        });
      }

      if (!data.link_lokasi?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["link_lokasi"],
          message: "Location link is required!",
        });
      }
    }
  });

export type OrganizationAgendaSchemaType = z.infer<
  typeof OrganizationAgendaSchemaType
>;
