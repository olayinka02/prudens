"use client"

import api from "@/app/admin/utils/api"
import { useQuery } from "@tanstack/react-query"


export interface AuthUser {
  userId: string
  email: string
  role: string
}

export interface AuthVerifyResponse {
  authenticated: boolean
  user?: AuthUser
}

export function useAuthVerify() {
  return useQuery<AuthVerifyResponse>({
    queryKey: ["authVerify"],
    queryFn: async () => {
      const response = await api.get("/auth/verify")
      return response.data
    },
    retry: false, // avoid retrying if unauthorized
    refetchOnWindowFocus: false, // optional, avoid recheck on tab switch
  })
}
