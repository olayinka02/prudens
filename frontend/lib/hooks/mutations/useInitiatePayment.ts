import api from "@/app/admin/utils/api"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

interface InitiatePaymentInput {
  amount: number
  recipientBank: string
  recipientAccountNumber: string
  recipientAccountName: string
  senderNote?: string
  email?: string
}

interface InitiatePaymentResponse {
  success: boolean
  sessionToken: string
  paymentUrl: string
  expiresAt: string
}

/**
 * Mutation hook to initiate a new payment/transaction
 * Returns session token and payment URL
 */
export function useInitiatePayment() {
  return useMutation({
    mutationFn: async (
      input: InitiatePaymentInput
    ): Promise<InitiatePaymentResponse> => {
      const response = await api.post("/payment/initiate", input)

      if (!response.data.success) {

        throw new Error(response.data.message[0] || "Failed to initiate payment")
      }

      return response.data
    },
  })
}
