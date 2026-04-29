import * as z from "zod";

export const addLocationSchema = z.object({
  name: z.string().min(3, "Name is too short").max(30, "Name too long"),
  description: z.string().optional(),
  category: z.string().min(3, "Name is too short"),
  aliases: z.string().min(3, "Name too short").optional(),
  lat: z.number().gt(0),
  long: z.number().gt(0),
});
export const addAdminSchema = z
  .object({
    name: z.string().min(3, "Username is too short").max(30, "Name too long"),
    email: z.email("Email not found"),
    password: z.string().min(6, "Password is too short"),
    confirmPassword: z.string().min(6, "Password is too short"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: "Passwords don't Match",
    path: ["confirmPassword"],
  });

export type locationType = z.infer<typeof addLocationSchema>;
export type adminType = z.infer<typeof addAdminSchema>;
