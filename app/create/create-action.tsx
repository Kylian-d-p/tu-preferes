"use server";

import { z } from "zod";
import { createType } from "./create-type";
import { prisma } from "@/lib/prisma";

export default async function createAction(values: z.infer<typeof createType>) {
  const checkedValues = await createType.safeParseAsync(values)

  if (!checkedValues.success) {
    return { error: "Choix invalides", success: null }
  }

  await prisma.choice.create({
    data: {
      choice1: checkedValues.data.choice1,
      choice2: checkedValues.data.choice2,
    }
  })

  return { error: null, success: "Le choix a été mis en ligne avec succès !" }
}