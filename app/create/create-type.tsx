import { z } from "zod";

export const createType = z.object({
  choice1: z.string().min(1).max(255),
  choice2: z.string().min(1).max(255),
})