"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export default async function voteAction(choice: { id: string, value: 1 | 2 }) {
  const checkedChoice = z.object({
    id: z.string(),
    value: z.literal(1).or(z.literal(2)),
  }).safeParse(choice);

  if (!checkedChoice.success) {
    return { error: "Données invalides", success: null };
  }

  const { id, value } = checkedChoice.data;

  const choiceData = await prisma.choice.findUnique({
    where: {
      id,
    },
  });

  if (!choiceData) {
    return { error: "Choix introuvable", success: null };
  }

  await prisma.choice.update({
    where: {
      id,
    },
    data: {
      counter1: value === 1 ? choiceData.counter1 + 1 : choiceData.counter1,
      counter2: value === 2 ? choiceData.counter2 + 1 : choiceData.counter2,
    },
  });

  return { error: null, success: "Votre vote a été comptabilisé" };

}