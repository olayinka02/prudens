import { useQuery } from "@tanstack/react-query"

interface Transaction {
  sessionToken: string
  amount: number
  recipientBank: string
  recipientAccountNumber: string
  recipientAccountName: string
  senderNote?: string
  status: "pending" | "paid" | "completed" | "flagged" | "failed" | "refunded"
  createdAt: string
  expiresAt: string
  signature: string
}

/**
 * Fetches transaction details by session token
 * Used on payment page and tracking pages
 */
export function useTransactionDetails(token: string | null) {
  return useQuery({
    queryKey: ["transaction", token],
    queryFn: async (): Promise<Transaction> => {
      if (!token) {
        throw new Error("Token is required")
      }

      const response = await fetch(`/api/transaction?token=${token}`)

      if (!response.ok) {
        throw new Error("Failed to fetch transaction details")
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Transaction not found")
      }

      return data.transaction
    },
    // Only run query if token is provided
    enabled: !!token,
    // Refetch every 30 seconds for status updates
    refetchInterval: 30000,
    // Don't cache for too long (5 minutes)
    staleTime: 1000 * 60 * 5,
  })
}
