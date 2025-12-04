// src/app/api/stripe/webhook/route.ts
import { createServerSupabaseClient } from '@/lib/supabase'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-11-17.clover' })

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!
  const body = await req.text()

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.supabase_user_id

    if (userId) {
      const supabase = await createServerSupabaseClient()
      await supabase.from('paid_users').upsert({
        user_id: userId,
        stripe_customer_id: session.customer as string,
        plan: session.mode === 'subscription' ? 'monthly' : 'lifetime',
      })
    }
  }

  return new Response('OK', { status: 200 })
}