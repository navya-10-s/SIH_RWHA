import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard, /profile)
  const path = request.nextUrl.pathname

  // Define protected paths
  const protectedPaths = ["/dashboard", "/profile", "/settings"]

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((protectedPath) => path.startsWith(protectedPath))

  if (isProtectedPath) {
    // In a real app, you would check for a valid session token here
    // For now, we'll let the client-side protection handle it
    // since we're using placeholder authentication
    // You can add server-side token validation here when integrating with Supabase/Firebase
    // const token = request.cookies.get('auth-token')?.value
    // if (!token) {
    //   return NextResponse.redirect(new URL('/', request.url))
    // }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
