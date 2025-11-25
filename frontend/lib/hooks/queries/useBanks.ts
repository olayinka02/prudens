import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Bank {
  id: number
  name: string
  code: string
}

interface PaystackBankResponse {
  status: boolean
  message: string
  data: Array<{
    id: number
    name: string
    slug: string
    code: string
    active: boolean
  }>
}

/**
 * Fetches list of Nigerian banks from Paystack API
 * Data is cached for 24 hours (banks don't change frequently)
 */
export function useBanks() {
  return useQuery({
    queryKey: ["banks"],
    queryFn: async (): Promise<Bank[]> => {
      const response = await axios.get<PaystackBankResponse>(
        "https://api.paystack.co/bank",
        {
          params: { country: "nigeria" },
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
          },
        }
      )

      // Remove duplicates and sort by name
      const uniqueBanks = Array.from(
        new Map(response.data.data.map((bank) => [bank.code, bank])).values()
      )

      return uniqueBanks.map((bank) => ({
        id: bank.id,
        name: bank.name,
        code: bank.code,
      }))
    },
    // Banks don't change frequently, cache for 24 hours
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  })
}
