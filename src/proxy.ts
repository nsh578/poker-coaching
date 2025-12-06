// middleware.ts (at project root)
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(req: NextRequest) {
  try {
    // Early exit for static files (prevents unnecessary Supabase calls)
    if (req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.pathname.includes('/static') || req.nextUrl.pathname.includes('/favicon.ico')) {
      return NextResponse.next()
    }

    // Check env vars exist (fail gracefully if not)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      console.error('Missing Supabase env vars in middleware')
      return NextResponse.next() // Or redirect to error page: return NextResponse.redirect(new URL('/error', req.url))
    }

    const res = NextResponse.next()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              res.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Refresh session if expired
    await supabase.auth.getSession()

    // Protect /videos (redirect if no session)
    if (req.nextUrl.pathname.startsWith('/videos')) {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        const redirectUrl = new URL('/login', req.url)
        return NextResponse.redirect(redirectUrl)
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // Don't crash the whole request — just log and continue
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    // Only run on dynamic routes (safer for Edge)
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}