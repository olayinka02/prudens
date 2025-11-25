import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

interface ProcessRefundInput {
  transactionId: string
  reason: string
}

interface ProcessRefundResponse {
  success: boolean
  message: string
  refundReference?: string
}

/**
 * Mutation hook to process transaction refund
 * Used by admin for refund processing
 */
export function useProcessRefund() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      input: ProcessRefundInput
    ): Promise<ProcessRefundResponse> => {
      const response = await axios.post("/api/admin/process-refund", input)

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to process refund")
      }

      return response.data
    },
    // Invalidate transaction queries after successful refund
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transaction", variables.transactionId],
      })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
  })
}
