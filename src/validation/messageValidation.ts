import { z } from "zod";

export const MessageValidation = z.object({
  content: z.string(),
});
