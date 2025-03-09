import { createRouteHandler } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard/onboarding'
  
  if (code) {
    const supabase = createRouteHandler()
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)
    
    // Redirect to the verify page with success status
    return NextResponse.redirect(new URL('/verify?status=success', requestUrl.origin))
  }

  // If no code is provided, redirect to the home page
  return NextResponse.redirect(new URL('/', requestUrl.origin))
} 