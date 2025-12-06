// src/components/Navbar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const signInWithGoogle = async () => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://poker-coaching-xi.vercel.app";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`, // Explicit callback path
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Coaching", href: "/coaching" },
    { name: "Videos", href: "/videos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-emerald-400">
          [YourName] Poker
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral-300 hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          ) : (
            <Button
              onClick={signInWithGoogle}
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              Sign In
            </Button>
          )}
        </nav>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-neutral-950 border-neutral-800"
          >
            <div className="flex flex-col gap-6 mt-10">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xl text-neutral-300 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <Button onClick={signOut} variant="outline" className="w-full">
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={signInWithGoogle}
                  className="w-full bg-emerald-600 hover:bg-emerald-500"
                >
                  Sign In with Google
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
