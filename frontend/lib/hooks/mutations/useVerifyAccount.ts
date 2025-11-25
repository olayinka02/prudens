import { useMutation } from "@tanstack/react-query"
import axios from "axios"

interface VerifyAccountInput {
  accountNumber: string
  bankCode: string
}

interface VerifyAccountResponse {
  success: boolean
  accountName: string
}

/**
 * Mutation hook to verify bank account details
 * Uses Paystack API to resolve account name
 */
export function useVerifyAccount() {
  return useMutation({
    mutationFn: async (
      input: VerifyAccountInput
    ): Promise<VerifyAccountResponse> => {
      const response = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${input.accountNumber}&bank_code=${input.bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
          },
        }
      )

      if (!response.data.status) {
        throw new Error(
          response.data.message || "Failed to verify account details"
        )
      }

      return {
        success: true,
        accountName: response.data.data.account_name,
      }
    },
  })
}
