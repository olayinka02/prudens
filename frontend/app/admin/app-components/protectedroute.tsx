"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import axios from "axios"

interface ProtectedRouteProps {
  children: React.ReactNode
}

interface User {
  userId: string
  email: string
  role: string
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname.includes("/login")) {
      setIsAuthorized(true)
      return
    }

    // Check for admin authentication with JWT
    const checkAuth = async () => {
      try {
        // Verify token with backend (token is in HTTP-only cookie)
        const response = await axios.get("/api/admin/verify", {
          withCredentials: true, // Important: include cookies
        })

        if (response.data.authenticated && response.data.user) {
          setUser(response.data.user)
          setIsAuthorized(true)
        } else {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [pathname, router])

  // Show loading state while checking authentication
  if (isAuthorized === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    )
  }

  // Render children if authorized
  if (isAuthorized) {
    return <>{children}</>
  }

  // Return null while redirecting
  return null
}
