import Link from "next/link";
import CreateForm from "./create-form";
import { Button } from "@/components/ui/button";

export default async function CreateChoice() {
  return (
    <main className="w-full max-w-xl mx-auto flex flex-col items-center gap-5 mt-4">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-3xl font-bold">Créer un dilemme</h1>
        <p className="text-muted-foreground">Remplissez le formulaire ci-dessous afin de publier un dilemme</p>
      </div>
      <CreateForm />
      <Link href={"/create/playlist"} className="w-full">
        <Button variant={"link"} className="w-full">Créer une playlist</Button>
      </Link>
    </main>
  )
}