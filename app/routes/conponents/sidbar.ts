import { z } from "zod";

export const sidbarSchema = z.object({
  title: z.string().trim().min(1).max(50),
  content: z.string().trim().min(1).max(140),
});
