import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tu préfères",
  description: "Des dilemmes à la con",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`font-body antialiased flex flex-col justify-between min-h-screen gap-2`}>
        <div className="h-full flex flex-col flex-1">
          <header className="p-4 border border-bottom flex">
            <Link href="/">
              <h1 className="text-2xl font-bold">Tu préfères ?</h1>
            </Link>
          </header>
          {children}
        </div>
        <footer className="flex flex-col items-center py-2">
          <p>Ce site n&apos;utilise pas de cookies</p>
          <p>Les informations ne sont ni cédées ni revendues, ou alors pour très très cher.</p>
        </footer>
      </body>
    </html>
  );
}
