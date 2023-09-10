import { NextResponse } from 'next/server'
import { verifyToken } from '../lib/utils'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookie = request ? request.cookies.get('token') : null
  const { pathname } = request.nextUrl

  if (cookie) {
    const token = cookie.value
    const userId = await verifyToken(token)

    console.log((token && userId) || pathname.includes('/api/login'))
    console.log(!token && pathname !== '/login')
    if ((token && userId) || pathname.includes('/api/login')) {
      console.log('here')
      return NextResponse.next()
    }
  }

  if (!cookie && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/browse/:path*', '/'],
}
