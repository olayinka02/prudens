import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

interface ResendNotificationInput {
  transactionId: string
  customMessage?: string
}

interface ResendNotificationResponse {
  success: boolean
  message: string
}

/**
 * Mutation hook to resend SMS notification to recipient
 * Used by admin for manual notification retry
 */
export function useResendNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      input: ResendNotificationInput
    ): Promise<ResendNotificationResponse> => {
      const response = await axios.post("/api/admin/resend-notification", input)

      if (!response.data.success) {
        throw new Error(
          response.data.error || "Failed to resend notification"
        )
      }

      return response.data
    },
    // Invalidate transaction queries after successful notification
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["transaction", variables.transactionId],
      })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
  })
}
