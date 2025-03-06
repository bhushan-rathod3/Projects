import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Must be at least 3 char")
      .max(10, "Limit 10 exceeded"),
    email: z.string().email(),
    password: z.string().min(8, "Must be atleast 8 characters"),
    confirmpass: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmpass, {
    message: "Passwords must be same",
    path: ["confirmpass"],
  });

export type registerSchemaType = z.infer<typeof registerSchema>;
