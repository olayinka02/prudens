"use client"

import { useMutation } from "@tanstack/react-query"

import { handleError } from "@/app/app-components/errorHandling"
import { toast } from "react-toastify"
import api from "@/app/admin/utils/api"
import { AxiosError } from "axios"

// Define the expected input and response types
interface LoginInput {
  username: string
  password: string
}

interface LoginResponse {
  success?: boolean
  accessToken?: string
  error?: string
}

export function useAdminLogin() {
  return useMutation<LoginResponse, AxiosError, LoginInput>({
    mutationFn: async (values) => {
      const response = await api.post(
        "/auth/login",
        {
          username: values.username,
          password: values.password,
        },
        { withCredentials: true }
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        toast.success("Logged in successfully!")
      } else {
        toast.error(data.error || "Invalid username or password")
      }
    },
    onError: (error) => {
      handleError(error)
     
    },
  })
}
