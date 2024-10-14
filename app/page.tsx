import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Choices from "./choices";

export const revalidate = 0;

export default async function Home() {

  const choicesCount = await prisma.choice.count();

  const choice = await prisma.choice.findFirst({
    skip: Math.floor(Math.random() * choicesCount),
  });

  if (!choice) {
    return (
      <main>Une erreur est survenue</main>
    )
  }

  return (
    <main className="relative grid grid-cols-1 items-center justify-items-center flex-1 lg:grid-cols-2">
      <Choices choice={{
        id: choice.id,
        choice1: {
          label: choice.choice1,
          votes: choice.counter1,
        },
        choice2: {
          label: choice.choice2,
          votes: choice.counter2,
        },
      }} />
      <Link href="/create" className="absolute bottom-10">
        <Button variant={"secondary"} className="border border-background">Créer un Tu Préfères</Button>
      </Link>
    </main>
  );
}
