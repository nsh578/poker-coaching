// src/components/AuthButton.tsx
'use client'

import { createBrowserSupabaseClient } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthButton() {
  const supabase = createBrowserSupabaseClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div>
      {/* TODO: Add session check + login button after /login page */}
      <Button onClick={handleLogout} variant="outline" size="sm">
        Logout (Test)
      </Button>
      <Link href="/login">
        <Button variant="ghost">Sign In</Button>
      </Link>
    </div>
  )
}