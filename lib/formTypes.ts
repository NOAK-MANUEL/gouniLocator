import * as z from "zod";

export const addLocationSchema = z.object({
  name: z.string().min(3, "Name is too short").max(30, "Name too long"),
  description: z.string().optional(),
  category: z.string().min(3, "Name is too short"),
  aliases: z.string().min(3, "Name too short"),
  lat: z.number().gt(0),
  long: z.number().gt(0),
});

export type locationType = z.infer<typeof addLocationSchema>;
