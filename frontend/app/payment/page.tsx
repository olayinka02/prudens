"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Header from "../app-components/header"

interface TransactionDetails {
  amount: string
  recipient: string
  bank: string
  reference: string
}

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setError("Invalid session. Please try again.")
      setIsLoading(false)
      return
    }

    // Fetch transaction details
    const fetchTransactionDetails = async () => {
      try {
        const response = await fetch(`/api/transaction?token=${token}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || "Failed to fetch transaction details")
        }

        const data = await response.json()
        setTransaction(data)
      } catch (error) {
        console.error("Error:", error)
        setError("Failed to load transaction details. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactionDetails()
  }, [token])

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, this would redirect to Paystack
      // For demo purposes, we'll simulate a successful payment

      // Simulate API call to initiate payment
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to initiate payment")
      }

      const data = await response.json()

      // Redirect to Paystack checkout
      // window.location.href = data.authorizationUrl;

      // For demo, redirect to success page
      router.push(`/payment/success?token=${token}`)
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to process payment. Please try again.")
      setIsLoading(false)
    }
  }

  // Fallback transaction data if API fails
  const getFallbackTransaction = () => {
    return {
      amount: "50,000",
      recipient: "John Doe",
      bank: "GTBank",
      reference: "TXN_" + Math.random().toString(36).substring(2, 10).toUpperCase(),
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

  // Use fallback data if there's an error but still show the payment form
  const displayTransaction = transaction || (error ? getFallbackTransaction() : null)

  return (
    <>
    <Header type="logo-only" />
     <div className="container max-w-md pt-24">

     <Card>
       <CardHeader>
         <CardTitle>Complete Your Payment</CardTitle>
         <CardDescription>Review the details and proceed to payment.</CardDescription>
         {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
       </CardHeader>
       <CardContent className="space-y-4">
         {displayTransaction && (
           <div className="space-y-2">
             <div className="flex justify-between">
               <span className="text-muted-foreground">Amount:</span>
               <span className="font-medium">₦{displayTransaction.amount}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-muted-foreground">Recipient:</span>
               <span className="font-medium">{displayTransaction.recipient}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-muted-foreground">Bank:</span>
               <span className="font-medium">{displayTransaction.bank}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-muted-foreground">Reference:</span>
               <span className="font-medium">{displayTransaction.reference}</span>
             </div>
           </div>
         )}

         <div className="rounded-md bg-muted p-4 text-sm">
           <p>
             Your identity will remain anonymous to the recipient. They will only see that they received money via
             AnonSend.
           </p>
         </div>
       </CardContent>
       <CardFooter>
         <Button onClick={handlePayment} className="w-full" disabled={isLoading}>
           {isLoading ? (
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
