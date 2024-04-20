import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import "./globals.css";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Torba Split Cost",
  description: "Split expenses quickly and easily, online or offline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-cyan-950">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
