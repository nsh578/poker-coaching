// src/app/api/stripe/route.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-11-17.clover' })

// This line is required in Next.js 15 for POST routes
export const POST = async (request: Request) => {
  try {
    const { price_id } = await request.json()

    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // ignore
            }
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const origin = request.headers.get('origin') || 'https://poker-coaching-xi.vercel.app'

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: price_id.includes('recurring') ? 'subscription' : 'payment',
      customer_email: session.user.email ?? undefined,
      line_items: [{ price: price_id, quantity: 1 }],
      success_url: `${origin}/videos?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/coaching`,
      metadata: { supabase_user_id: session.user.id },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error: any) {
    console.error('Stripe route error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Required for Vercel to route POST correctly
export const config = {
  api: {
    bodyParser: false,   // Important! Stripe needs raw body for webhooks later too
  },
}