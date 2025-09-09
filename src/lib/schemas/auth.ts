import {z} from "zod"

export const sigupSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type SignupSchema = z.infer<typeof sigupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

