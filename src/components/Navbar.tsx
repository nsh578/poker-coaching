"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react"; // Works now!
import Link from "next/link";

export default function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Coaching", href: "/coaching" },
    { name: "Videos", href: "/videos" },
    { name: "Results", href: "/results" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
          Michael Nam Poker
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-primary-foreground">
            Book Coaching
          </Button>
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-border">
            <div className="flex flex-col gap-6 mt-10">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-foreground text-lg"
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-primary-foreground">
                Book Coaching
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}