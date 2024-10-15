import { z } from "zod";

export const createPlaylistType = z.object({
  title: z.string().min(1).max(100),
  choices: z.array(z.string()),
})