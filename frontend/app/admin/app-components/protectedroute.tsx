"use client"

import { useAuthVerify } from "@/lib/hooks/queries/useAuthVerify"
import { useRouter, usePathname } from "next/navigation"


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const { data, isLoading, isError } = useAuthVerify()

  // Skip auth check for login page
  if (pathname.includes("/login")) return <>{children}</>

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    )
  }

  // Handle errors or unauthorized users
  if (isError || !data?.authenticated) {
    router.push("/admin/login")
    return null
  }

  // Authorized → render the protected content
  return <>{children}</>
}
