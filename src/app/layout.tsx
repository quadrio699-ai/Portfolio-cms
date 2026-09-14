import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quadri Marvellous Al-ameen",
  description: "Full-stack developer, EdTech writer, and civic-tech builder.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
