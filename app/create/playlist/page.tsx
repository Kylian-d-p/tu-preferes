import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePlaylistForm from "./create-playlist-form";

export default async function CreatePlaylist() {
  return (
    <main className="w-full max-w-xl mx-auto flex flex-col items-center gap-5 mt-4">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-3xl font-bold">Créer une playlist</h1>
        <p className="text-muted-foreground">Ajoutez plusieurs dilemmes pour créer une playlist et la partager avec vos amis</p>
        <CreatePlaylistForm />
        <Link href={"/create"} className="w-full">
          <Button variant={"link"} className="w-full">Créer un dilemme</Button>
        </Link>
      </div>
    </main>
  )
}