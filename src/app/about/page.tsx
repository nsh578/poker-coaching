// src/app/about/page.tsx
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen bg-neutral-950 py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
          About Michael Nam
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Your real photo */}
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-neutral-800">
            <Image
              src="/me.jpg" // ← path to your photo in /public
              alt="[YourName] Poker Coach"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6 text-lg text-neutral-300">
            <p>
              Top-200 GPI player with over $1 million in live earnings and
              multiple five to six-digit scores
            </p>
            <p>
              I’ve been crushing multi-table tournaments for 2+ years — from the
              micro stakes to nosebleed Sunday majors and WSOP final tables.
            </p>
            <p>
              My students range from complete beginners to established
              high-stakes regulars who have collectively won millions since
              working with me.
            </p>
            <p className="text-emerald-400 font-semibold text-xl">
              My mission: simple, modern, solver-backed, exploitative poker that
              actually works in today’s games.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <Card className="bg-neutral-900/80 border-neutral-800 p-8 text-center">
            <div className="text-5xl font-black text-emerald-400">#269</div>
            <div className="text-neutral-400 mt-2">Peak GPI Rank</div>
          </Card>
          <Card className="bg-neutral-900/80 border-neutral-800 p-8 text-center">
            <div className="text-5xl font-black text-emerald-400">$1M+</div>
            <div className="text-neutral-400 mt-2">Live Cashes</div>
          </Card>
        </div>
      </div>
    </main>
  );
}
