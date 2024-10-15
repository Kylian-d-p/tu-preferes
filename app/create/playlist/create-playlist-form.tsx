"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, Link2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import createPlaylistAction from "./create-playlist-action";
import searchChoices from "./search-choices";

export default function CreatePlaylistForm() {
  const [choices, setChoices] = useState<{ id: string, choice1: string, choice2: string }[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchedChoices, setSearchedChoices] = useState<{ id: string, choice1: string, choice2: string }[]>([])
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState<string>("")
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [createdDialogOpen, setCreatedDialogOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  const { toast } = useToast()

  const savePlaylist = async () => {
    const createdPlaylist = await createPlaylistAction({ choices: choices.map(choice => choice.id), title })

    if (createdPlaylist && createdPlaylist.error) {
      setError(createdPlaylist.error)
    }

    if (createdPlaylist && createdPlaylist.playlistId) {
      setPlaylistId(createdPlaylist.playlistId)
      setCreatedDialogOpen(true)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchQuery.length <= 0) {
        setSearchedChoices([])
        return
      }

      const res = await searchChoices(searchQuery)

      if (res && res.error) {
        setError(res.error)
        return
      }

      if (res && res.data) {
        setSearchedChoices(res.data)
      }
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [searchQuery])

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);


  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <Input placeholder="Titre de la playlist" className="w-full text-xl" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <Button variant={"secondary"} onClick={() => { setCreateDialogOpen(true) }} className="flex items-center gap-2"><Plus />Ajouter un dilemme</Button>
        <div className="flex flex-col gap-2">
          {
            choices.length <= 0 ?
              <p className="text-center py-5">Aucun dilemme ajouté à la playlist</p> :
              <div className="rounded overflow-hidden">
                {
                  choices.map(choice => (
                    <div key={choice.id} className="grid grid-cols-[1fr_24px_1fr] items-center gap-2 py-3 px-2 odd:bg-muted">
                      <p className="text-center">{choice.choice1}</p>
                      <p className="flex items-center justify-center">ou</p>
                      <p className="text-center">{choice.choice2}</p>
                    </div>
                  ))
                }
              </div>
          }
        </div>
        {error && <p className="text-destructive">{error}</p>}
        <Button disabled={choices.length <= 0} onClick={() => { savePlaylist() }}>Enregistrer la playlist</Button>
      </div>
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="flex flex-col gap-5 max-h-[calc(100vh-30px)] overflow-auto">
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>
              Ajouter un dilemme à la playlist
            </DialogTitle>
            <DialogDescription>
              Cherchez un dilemme à ajouter à la playlist
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input placeholder="Rechercher un dilemme" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} />
            {
              searchedChoices.length <= 0 ?
                <p className="text-muted-foreground text-center py-5">Aucun dilemme trouvé</p> :
                <div className="flex flex-col overflow-hidden rounded">
                  {
                    searchedChoices.map(choice => {
                      const alreadyAdded = choices.find(c => c.id === choice.id)
                      return (
                        <div key={choice.id} className={`relative cursor-pointer [&>div]:odd:bg-muted`} onClick={() => {
                          if (!alreadyAdded) {
                            return setChoices([...choices, choice])
                          }
                          setChoices(choices.filter(c => c.id !== choice.id))
                        }}>
                          <div className={`grid grid-cols-[1fr_24px_1fr] items-center gap-2 py-3 px-2 hover:bg-[hsl(var(--secondary)/50%)] transition-all ${choices.find(c => c.id === choice.id) && "opacity-30"}`}>
                            <p className="text-center">{choice.choice1}</p>
                            <p className="flex items-center justify-center">ou</p>
                            <p className="text-center">{choice.choice2}</p>
                          </div>
                          <Check className={`absolute top-1/2 left-1/2 -translate-x-1/2 transition-all opacity-0 bg-background p-2 w-8 h-8 rounded-full ${alreadyAdded && "-translate-y-1/2 opacity-100"}`} />
                        </div>
                      )
                    })
                  }
                </div>
            }
          </div>
          <DialogFooter>
            <DialogClose>Fermer</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={createdDialogOpen} onOpenChange={setCreatedDialogOpen}>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Playlist créée avec succès !</DialogTitle>
            <DialogDescription>Partagez le lien suivant pour que vos amis puissent voter</DialogDescription>
          </DialogHeader>
          <div className="flex items-center">
            <Input readOnly value={`${window ? window.location.origin : ""}/playlist/${playlistId}`} className="rounded-r-none" />
            <Button variant={"secondary"} className="flex items-center gap-2 rounded-l-none" onClick={() => {
              navigator.clipboard.writeText(`${window ? window.location.origin : ""}/playlist/${playlistId}`)
              setCopied(true)
              toast({ title: "Lien copié", description: "Collez-le dans le navigateur ou envoyez-le à vos amis" })
            }}>
              {copied ? <Check /> : <Link2 />}
            </Button>
          </div>
          <DialogFooter>
            <DialogClose>Fermer</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}