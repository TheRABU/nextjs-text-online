import { z } from "zod";

export const SignInValidation = z.object({
  email: z.email("Email is needed"),
  password: z
    .string("Password is needed")
    .min(6, "At least 6 characters needed")
    .max(50, "maximum 50 characters allowed"),
});
