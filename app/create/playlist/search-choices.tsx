"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export default async function searchChoices(query: string) {
  const checkedQuery = await z.string().safeParseAsync(query);

  if (!checkedQuery.success) {
    return { error: "Recherche invalide", data: [] }
  }

  const search = await prisma.choice.findMany({
    where: {
      OR: [
        {
          choice1: {
            contains: checkedQuery.data,
          }
        },
        {
          choice2: {
            contains: checkedQuery.data,
          }
        },
        {
          id: {
            contains: checkedQuery.data,
          }
        }
      ]
    },
    take: 15,
  })

  return { error: null, data: search }
}