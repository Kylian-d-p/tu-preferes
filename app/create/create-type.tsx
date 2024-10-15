import { z } from "zod";

export const createType = z.object({
  choice1: z.string({ required_error: "Le choix ne peut pas êtres vide", invalid_type_error: "Le choix ne peut pas êtres vide" }).min(1, "Le choix ne peut pas êtres vide").max(255, "Le choix doit faire moins de 255 caractères"),
  choice2: z.string({ required_error: "Le choix ne peut pas êtres vide", invalid_type_error: "Le choix ne peut pas êtres vide" }).min(1, "Le choix ne peut pas êtres vide").max(255, "Le choix doit faire moins de 255 caractères"),
})