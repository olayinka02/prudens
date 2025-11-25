"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Header from "../app-components/header"
import { useTransactionDetails } from "@/lib/hooks"
import { handleError } from "../app-components/errorHandling"
import api from "../admin/utils/api"
import { toast } from "react-toastify"

export default function PaymentPage() {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  // Fetch transaction details using TanStack Query
  const {
    data: transaction,
    isLoading,
    error,
  } = useTransactionDetails(token)

  const handlePayment = async () => {
    setIsProcessingPayment(true)

   try {
  // In a real implementation, this would redirect to Paystack
  // For demo purposes, we'll simulate a successful payment

  // Simulate API call to initiate payment
  const response = await api.post("/api/payment/initiate", { token })

  // Axios automatically throws an error for non-2xx responses,
  // so you don’t need to manually check `response.ok`

  const data = response.data

   if (data && data.paymentLink) {
        window.location.href = data.paymentLink; // Redirect to payment link
      } else {
        toast.error("Payment initialization failed. Please try again.");
      }

  // Redirect to Paystack checkout
  // window.location.href = data.authorizationUrl;

  // For demo, redirect to success page
  // router.push(`/payment/success?token=${token}`)
} catch (error) {
      console.error("Error:", error)
     handleError(error)
      setIsProcessingPayment(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <Header type="logo-only" />
        <div className="container max-w-md pt-24">
          <Card>
            <CardHeader>
              <CardTitle>Error</CardTitle>
              <CardDescription>Failed to load transaction details.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-500">{error.message || "Unknown error occurred"}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push("/send")} className="w-full">
                Start New Transfer
              </Button>
            </CardFooter>
          </Card>
        </div>
      </>
    )
  }

  if (!transaction) {
    return null
  }

  return (
    <>
      <Header type="logo-only" />
      <div className="container max-w-md pt-24">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Payment</CardTitle>
            <CardDescription>Review the details and proceed to payment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">₦{transaction.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recipient:</span>
                <span className="font-medium">{transaction.recipientAccountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank:</span>
                <span className="font-medium">{transaction.recipientBank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account:</span>
                <span className="font-medium">{transaction.recipientAccountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium capitalize">{transaction.status}</span>
              </div>
            </div>

            <div className="rounded-md bg-muted p-4 text-sm">
              <p>
                Your identity will remain anonymous to the recipient. They will only see that they
                received money via AnonSend.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handlePayment} className="w-full" disabled={isProcessingPayment}>
              {isProcessingPayment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
