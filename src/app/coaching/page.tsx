// src/app/coaching/page.tsx
'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function Coaching() {
  const packages = [
    {
      name: "1-on-1 Coaching",
      price: "$399/hr",
      popular: false,
      features: [
        "Live or recorded hand history review",
        "Solver + exploitative adjustments",
        "Mental game & tilt control",
        "Tournament schedule planning",
      ],
      cta: "Book a session",
      ctaLink: "mailto:you@example.com",
    },
    {
      name: "Lifetime Video Library",
      price: "$499",
      popular: true,
      priceId: "price_1YOUR_LIFETIME_PRICE_ID_HERE", // ← replace with your real test price ID
      features: [
        "150+ hours of advanced training videos",
        "New videos every month",
        "Private Discord community",
        "Range charts & PDFs",
        "Lifetime updates",
      ],
      cta: "Buy Lifetime Access",
    },
    {
      name: "Monthly Membership",
      price: "$99/mo",
      popular: false,
      priceId: "", // optional — add your monthly price ID later
      features: [
        "All current videos",
        "New videos every month",
        "Discord access",
        "Cancel anytime",
      ],
      cta: "Start Monthly",
    },
  ]

  const handleCheckout = async (priceId: string) => {
    if (!priceId) return
    const res = await fetch('/api/stripe', {
      method: 'POST',
      body: JSON.stringify({ price_id: priceId }),
      headers: { 'Content-Type': 'application/json' },
    })
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <main className="min-h-screen bg-neutral-950 py-20 px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
          Coaching Packages
        </h1>
        <p className="text-xl text-neutral-400 mb-16 max-w-2xl mx-auto">
          Choose the option that fits your goals and budget
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`relative p-8 rounded-2xl border ${
                pkg.popular
                  ? "border-emerald-500 shadow-2xl shadow-emerald-500/20 scale-105"
                  : "border-neutral-800"
              } bg-neutral-900/50 backdrop-blur`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <div className="text-4xl font-black mb-4">{pkg.price}</div>
              <h3 className="text-2xl font-bold mb-6">{pkg.name}</h3>
              <ul className="space-y-4 mb-8 text-left">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-400" />
                    <span className="text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {pkg.priceId ? (
                <Button
                  onClick={() => handleCheckout(pkg.priceId)}
                  className={`w-full ${
                    pkg.popular
                      ? "bg-emerald-600 hover:bg-emerald-500"
                      : "bg-neutral-800 hover:bg-neutral-700"
                  }`}
                  size15="lg"
                  size="lg"
                >
                  {pkg.cta}
                </Button>
              ) : (
                <Button asChild className="w-full" size="lg">
                  <a href={pkg.ctaLink}>{pkg.cta}</a>
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}