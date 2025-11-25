import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AdminUser {
  id: string
  email: string
  role: "admin" | "super_admin"
}

interface AuthState {
  user: AdminUser | null
  isAuthenticated: boolean
  login: (user: AdminUser) => void
  logout: () => void
}

/**
 * Auth Store - Manages authentication state
 * Persisted to localStorage to maintain login across page refreshes
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "anonsend-auth", // localStorage key
    }
  )
)
