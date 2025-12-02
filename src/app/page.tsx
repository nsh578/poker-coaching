// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
            Crush MTTs with <br className="md:hidden" />
            <span className="text-emerald-400">[Michael]</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-10 max-w-3xl mx-auto">
            Top-300 GPI • $1.5M+ career cashes • 2 years crushing online & live tournaments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-10 bg-emerald-600 hover:bg-emerald-500">
              Book 1-on-1 Coaching
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10">
              Lifetime Video Library → $499
            </Button>
          </div>
        </div>
      </section>

      {/* Proof cards */}
      <section className="container mx-auto px-6 -mt-10 mb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-neutral-900/80 border-neutral-800 p-8 text-center backdrop-blur">
            <div className="text-5xl font-black text-emerald-400">$4.2M+</div>
            <div className="text-neutral-400 mt-2">Career Earnings</div>
          </Card>
          <Card className="bg-neutral-900/80 border-neutral-800 p-8 text-center backdrop-blur">
            <div className="text-5xl font-black text-emerald-400">Top 100</div>
            <div className="text-neutral-400 mt-2">GPI Ranking</div>
          </Card>
          <Card className="bg-neutral-900/80 border-neutral-800 p-8 text-center backdrop-blur">
            <div className="text-5xl font-black text-emerald-400">1,200+</div>
            <div className="text-neutral-400 mt-2">Students Coached</div>
          </Card>
        </div>
      </section>
    </main>
  );
}