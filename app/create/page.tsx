import CreateForm from "./create-form";

export default async function CreateChoice() {
  return (
    <main className="max-w-3xl mx-auto flex flex-col gap-5 mt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Créer un Tu Préfères</h1>
        <p className="text-muted-foreground">Remplissez le formulaire ci-dessous afin de publier un &quot;Tu Préfères&quot;</p>
      </div>
      <CreateForm />
    </main>
  )
}