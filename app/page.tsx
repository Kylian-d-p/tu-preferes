import Choice from "@/components/choice";
import { prisma } from "@/lib/prisma";

export default async function Home() {

  const choicesCount = await prisma.choice.count();

  const choice = await prisma.choice.findFirst({
    skip: Math.floor(Math.random() * choicesCount),
  })

  if (!choice) {
    return (
      <main>Une erreur est survenue</main>
    )
  }

  return (
    <main className="flex flex-col gap-2">
      <header className="p-4">
        <h1 className="text-4xl font-bold">Tu préfères ?</h1>
      </header>
      <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 justify-items-center">
        <Choice>
          <p className="text-xl font-bold">{choice.choice1}</p>
        </Choice>
        <Choice>
          <p className="text-xl font-bold">{choice.choice2}</p>
        </Choice>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">OU</div>
      </div>
    </main>
  );
}
