import Choices from "@/app/choices"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"

export default async function Playlist(props: { params: { id: string }, searchParams: { query: string } }) {
  const checkedIdParams = await z.string().min(1).safeParseAsync(props.params.id)

  if (!checkedIdParams.success) {
    return notFound()
  }

  const playlist = await prisma.playlist.findUnique({
    where: {
      id: checkedIdParams.data
    }
  })

  if (!playlist) {
    return notFound()
  }

  const searchParams = new URLSearchParams(props.searchParams)

  const playlistIndex = parseInt(searchParams.get("index") || "NaN")

  if (isNaN(playlistIndex)) {
    redirect(`/playlist/${playlist.id}?index=0`)
  }

  const choice = await prisma.playlistChoice.findMany({
    where: {
      playlistId: playlist.id
    },
    select: {
      choice: {
        select: {
          id: true,
          choice1: true,
          choice2: true,
          counter1: true,
          counter2: true
        }
      }
    },
    orderBy: {
      choiceId: "asc"
    },
  })

  if (choice.length < playlistIndex + 1) {
    return notFound()
  }

  return (
    <main className="relative flex-1">
      <Choices choice={{
        id: choice[playlistIndex].choice.id,
        choice1: {
          label: choice[playlistIndex].choice.choice1,
          votes: choice[playlistIndex].choice.counter1,
        },
        choice2: {
          label: choice[playlistIndex].choice.choice2,
          votes: choice[playlistIndex].choice.counter2,
        },
      }} playlist={{id: checkedIdParams.data, index: playlistIndex, length: choice.length}} />
      <Link href="/create/playlist" className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Button variant={"secondary"} className="border border-background">Créer une playlist</Button>
      </Link>
    </main>
  )
}