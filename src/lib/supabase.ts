// src/lib/supabase.ts
import { createServerClient } from '@supabase/ssr'
import { createBrowserClient } from '@supabase/ssr'

// ──────────────── SERVER CLIENT (only used in server components / API routes) ────────────────
export async function createServerSupabaseClient() {
  // This import is dynamic so Next.js never tries to bundle it on the client
  const { cookies } = await import('next/headers')

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // ignore – middleware handles it
          }
        },
      },
    }
  )
}

// ──────────────── BROWSER CLIENT (safe to use in 'use client' components) ────────────────
export const createBrowserSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )