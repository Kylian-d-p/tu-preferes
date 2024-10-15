"use server";

import { z } from "zod";
import { createPlaylistType } from "./create-playlist-type";
import { prisma } from "@/lib/prisma";

export default async function createPlaylistAction(values: z.infer<typeof createPlaylistType>) {
  const checkedValues = await createPlaylistType.safeParseAsync(values);

  if (!checkedValues.success) {
    return {error: "Valeurs invalides", playlistId: null}
  }

  for (const choiceId of checkedValues.data.choices) {
    const dbChoice = await prisma.choice.findUnique({
      where: {
        id: choiceId,
      }
    })

    if (!dbChoice) {
      return {error: "Vous avez renseigné un dilemme qui n'existe pas", playlistId: null}
    }
  }

  const playlist = await prisma.playlist.create({
    data: {
      title: checkedValues.data.title,
    },
  })

  if (!playlist) {
    return {error: "Erreur lors de la création de la playlist", playlistId: null}
  }
  
    await prisma.playlistChoice.createMany({
      data: checkedValues.data.choices.map(choiceId => {
        return {
          playlistId: playlist.id,
          choiceId,
        }
      })
    })

  return {error: null, playlistId: playlist.id}
}