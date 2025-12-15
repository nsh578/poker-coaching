// src/app/coaching/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

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
      ctaLink: "mailto:nsh5784@example.com",
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
      name: "Group Coaching",
      price: "$199/mo",
      popular: false,
      features: [
        "Weekly group sessions (live Zoom)",
        "Access to all video content",
        "Group Discord channel",
        "Q&A and hand reviews with the group",
        "Cancel anytime",
      ],
      cta: "Join Group Coaching",
      ctaLink: "mailto:you@example.com", // Change to Stripe price ID later if you want paid group
    },
  ];

  const handleCheckout = async (priceId: string) => {
    if (!priceId) {
      alert("Missing price ID — add your Stripe price ID in the code");
      return;
    }

    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price_id: priceId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`Error ${res.status}: ${err.error || "Please log in first"}`);
        return;
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Network error — try again");
    }
  };

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
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              {/* Fixed readability: bright text for price and name */}
              <div className="text-5xl font-black mb-4 text-emerald-400">
                {pkg.price}
              </div>
              <h3 className="text-3xl font-bold mb-6 text-white">{pkg.name}</h3>

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
  );
}
