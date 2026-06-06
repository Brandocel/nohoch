import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cenote Nohoch",
  description: "Aventura, naturaleza y descanso en Cenote Nohoch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}