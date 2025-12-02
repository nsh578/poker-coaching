import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Michael Nam Poker Coaching",
  description: "Top-100 GPI MTT crusher • $4M+ cashes • Private coaching & video library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-neutral-950 text-white min-h-screen`}>
        <Navbar />
        {children}
        <footer className="border-t border-neutral-800 py-8 mt-20">
          <div className="container mx-auto px-4 text-center text-neutral-500">
            © 2025 Michael Nam Poker • All rights reserved
          </div>
        </footer>
      </body>
    </html>
  );
}