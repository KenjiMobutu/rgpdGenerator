import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', data.user.id)
        .single()

      // If profile doesn't have a full_name, redirect to complete profile
      if (!profile || !profile.full_name) {
        return NextResponse.redirect(`${origin}/complete-profile`)
      }

      // Otherwise redirect to app
      return NextResponse.redirect(`${origin}/app`)
    }
  }

  // If there's an error or no code, redirect to auth page
  return NextResponse.redirect(`${origin}/auth`)
}
