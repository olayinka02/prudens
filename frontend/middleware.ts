import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Protect admin routes
  if (path.startsWith("/admin")) {
    // In a real implementation, this would check for authentication
    // For demo purposes, we'll allow access
    // Example of how to redirect if not authenticated:
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
