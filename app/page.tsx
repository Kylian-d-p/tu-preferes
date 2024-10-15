import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Choices from "./choices";
import { z } from "zod";

export const revalidate = 0;

export default async function Home(props: { searchParams: string }) {

  const searchParams = new URLSearchParams(props.searchParams);

  const choice = searchParams.get("id") ?
    await prisma.choice.findMany({
      where: {
        id: searchParams.get("id") ?? "",
      }
    })
    : await prisma.$queryRaw`SELECT * FROM choice ORDER BY RAND() LIMIT 2`;

  const checkedChoice = await z.array(z.object({
    id: z.string(),
    choice1: z.string(),
    choice2: z.string(),
    counter1: z.number(),
    counter2: z.number(),
  })).safeParseAsync(choice);

  if (!checkedChoice.success || checkedChoice.data.length !== 2) {
    return (
      <main>Une erreur est survenue</main>
    )
  }

  if (checkedChoice.data[0].id === searchParams.get("skip")) {
    checkedChoice.data.shift();
  }

  return (
    <main className="relative flex-1">
      <Choices choice={{
        id: checkedChoice.data[0].id,
        choice1: {
          label: checkedChoice.data[0].choice1,
          votes: checkedChoice.data[0].counter1,
        },
        choice2: {
          label: checkedChoice.data[0].choice2,
          votes: checkedChoice.data[0].counter2,
        },
      }} />
      <Link href="/create" className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Button variant={"secondary"} className="border border-background">Créer un dilemme</Button>
      </Link>
    </main>
  );
}
