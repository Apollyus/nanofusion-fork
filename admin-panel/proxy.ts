import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Static files bypass
  if (pathname.includes('.') || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  // 2. Update session
  try {
    const { supabaseResponse, user } = await updateSession(request)

    // 3. Simple auth logic
    if (pathname.startsWith('/admin')) {
      const isLoginPath = pathname === '/admin/login' || pathname === '/admin/auth/callback'
      
      if (!user && !isLoginPath) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      
      if (user && isLoginPath) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    }

    return supabaseResponse
  } catch (e) {
    // If supabase fails, just let it pass to the page handler
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
