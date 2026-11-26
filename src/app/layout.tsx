import type { Metadata } from "next";
import "@fontsource/libre-caslon-display/400.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import Provide from "./provider";

export const metadata: Metadata = {
  title: "Consultoradmin | Legal & Business Consulting",
  description:
    "Consultoradmin provides corporate and commercial law, regulatory compliance, contract drafting, litigation, and strategic business consulting, alongside a catalog of ready-to-use legal document kits and reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background antialiased">
        <div className="relative flex min-h-dvh flex-col bg-background">
          <Provide>
            <Header />
            <main className="flex-1 flex flex-col items-center">
              {children}
            </main>
            <Footer />
          </Provide>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
