import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import Choices from "./choices";

export const revalidate = 0;

export default async function Home(props: { searchParams: string }) {
  const searchParams = new URLSearchParams(props.searchParams);

  const excludeIds: string[] = searchParams.get("exclude") ? JSON.parse(searchParams.get("exclude") || "[]") : [];

  let choice: unknown;

  if (searchParams.get("id")) {
    choice = await prisma.choice.findMany({
      where: {
        id: searchParams.get("id") ?? "",
      },
    });
  } else {
    const excludeSql = excludeIds.length ? Prisma.sql`WHERE id NOT IN (${Prisma.join(excludeIds)})` : Prisma.empty;

    choice = await prisma.$queryRaw`
    SELECT * FROM choice
    ${excludeSql}
    ORDER BY RAND()
    LIMIT 2
  `;
  }

  const checkedChoice = await z
    .array(
      z.object({
        id: z.string(),
        choice1: z.string(),
        choice2: z.string(),
        counter1: z.number(),
        counter2: z.number(),
      })
    )
    .safeParseAsync(choice);

  if (
    !checkedChoice.success ||
    (!searchParams.get("id") && checkedChoice.data.length !== 2) ||
    (searchParams.get("id") && checkedChoice.data.length !== 1)
  ) {
    return (
      <main>
        <div className="flex flex-col gap-2 mx-auto max-w-xl border rounded-lg p-5 mt-10">
          <p className="font-bold text-xl">Vous avez parcouru tous les dilemmes</p>
          <Link href="/">
            <Button variant={"secondary"} className="flex items-center gap-2 w-full">
              <RotateCcw />
              Recommencer
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (checkedChoice.data[0].id === searchParams.get("skip")) {
    checkedChoice.data.shift();
  }

  excludeIds.push(checkedChoice.data[0].id);

  return (
    <main className="relative flex-1">
      <Choices
        choice={{
          id: checkedChoice.data[0].id,
          choice1: {
            label: checkedChoice.data[0].choice1,
            votes: checkedChoice.data[0].counter1,
          },
          choice2: {
            label: checkedChoice.data[0].choice2,
            votes: checkedChoice.data[0].counter2,
          },
        }}
      />
      <Link href="/create" className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Button variant={"secondary"} className="border border-background">
          Créer un dilemme
        </Button>
      </Link>
    </main>
  );
}
