// src/app/videos/page.tsx
export default function Videos() {
  return (
    <main className="min-h-screen bg-neutral-950 py-20 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
          Video Library
        </h1>
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-20">
          <p className="text-2xl text-neutral-500">
            Log in to access 150+ hours of premium training videos
          </p>
          <button className="mt-8 px-8 py-4 bg-emerald-600 rounded-lg text-lg font-semibold hover:bg-emerald-500 transition">
            Sign In / Purchase Access
          </button>
        </div>
      </div>
    </main>
  );
}