// src/app/api/stripe/route.ts
import { createRouteHandlerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { price_id } = await request.json()
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  const origin = request.headers.get('origin')

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: price_id.includes('price_') && price_id.includes('month') ? 'subscription' : 'payment',
    customer_email: session.user.email,
    line_items: [{ price: price_id, quantity: 1 }],
    success_url: `${origin}/videos?success=true`,
    cancel_url: `${origin}/coaching`,
    metadata: { supabase_user_id: session.user.id },
  })

  return NextResponse.json({ url: checkoutSession.url })
}