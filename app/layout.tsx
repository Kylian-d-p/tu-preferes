import type { Metadata } from "next";
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
      <body className={`font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
