import { useQuery } from "@tanstack/react-query"

interface Transaction {
  id: string
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
  paymentReference?: string
  transferReference?: string
}

interface TransactionsResponse {
  transactions: Transaction[]
  total: number
  page: number
  pageSize: number
}

/**
 * Fetches all transactions for admin dashboard
 * Supports filtering and pagination
 */
export function useTransactions(filters?: {
  status?: string
  searchQuery?: string
  page?: number
  pageSize?: number
}) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async (): Promise<TransactionsResponse> => {
      const params = new URLSearchParams()

      if (filters?.status && filters.status !== "all") {
        params.append("status", filters.status)
      }
      if (filters?.searchQuery) {
        params.append("search", filters.searchQuery)
      }
      if (filters?.page) {
        params.append("page", filters.page.toString())
      }
      if (filters?.pageSize) {
        params.append("pageSize", filters.pageSize.toString())
      }

      const response = await fetch(`/api/admin/transactions?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch transactions")
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch transactions")
      }

      return data
    },
    // Refetch every minute for admin dashboard
    refetchInterval: 60000,
    // Consider data stale after 30 seconds
    staleTime: 30000,
  })
}
