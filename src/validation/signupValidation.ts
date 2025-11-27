import { z } from "zod";

export const UsernameValidation = z
  .string("Username must be string")
  .min(2, "Username should be at least 2 characters")
  .max(20, "Max length is 20 characters");

export const SignUpValidation = z.object({
  username: UsernameValidation,
  email: z.email("Email is needed"),
  password: z
    .string("Password is needed")
    .min(6, "At least 6 characters needed")
    .max(50, "maximum 50 characters allowed"),
  verifyCode: z
    .string("Verification Code is needed")
    .length(6, "Code should be 6 digit!"),
});
