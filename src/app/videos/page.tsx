// src/app/videos/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function Videos() {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  // ← NEW: check if user has paid
  const { data: paid } = await supabase
    .from('paid_users')
    .select('plan')
    .eq('user_id', session.user.id)
    .single()

  if (!paid) {
    redirect('/coaching?error=not_paid')
  }

  return (
    <main className="min-h-screen bg-neutral-950 py-20 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-6xl font-bold text-emerald-400 mb-8">
          Welcome back, {session.user.email?.split('@')[0]}!
        </h1>
        <p className="text-2xl text-neutral-300 mb-12">
          You have <span className="text-emerald-400 font-bold">{paid.plan === 'lifetime' ? 'LIFETIME' : 'MONTHLY'}</span> access
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="aspect-video bg-neutral-800 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl text-neutral-600">Video {i}</span>
              </div>
              <h3 className="text-xl font-semibold">Advanced Tournament Strategy</h3>
              <p className="text-neutral-400 text-sm mt-2">2h 14m • Updated Dec 2025</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}