"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

export default function PaymentSuccessPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [transferStatus, setTransferStatus] = useState<string>("processing")
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setError("Invalid session. Please try again.")
      setIsLoading(false)
      return
    }

    // Simulate checking transfer status
    const checkTransferStatus = async () => {
      try {
        // In a real implementation, this would poll an API endpoint
        // For demo purposes, we'll simulate a successful transfer after a delay

        setTimeout(() => {
          setTransferStatus("completed")
          setIsLoading(false)
        }, 3000)
      } catch (error) {
        console.error("Error:", error)
        setError("Failed to process transfer. Please contact support.")
        setIsLoading(false)
      }
    }

    checkTransferStatus()
  }, [token])

  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            {isLoading ? (
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            ) : (
              <CheckCircle className="h-12 w-12 text-green-500" />
            )}
          </div>
          <CardTitle className="text-center">{isLoading ? "Processing Transfer" : "Transfer Successful"}</CardTitle>
          <CardDescription className="text-center">
            {isLoading
              ? "We're processing your anonymous transfer. This may take a moment."
              : "Your money has been sent anonymously to the recipient."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-2 text-center">
              <p>Please wait while we complete your transfer...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
                <p className="font-medium">Transfer completed successfully!</p>
                <p className="mt-2">
                  The recipient has been notified of the transfer. Your identity remains anonymous.
                </p>
              </div>

              <div className="rounded-md bg-muted p-4 text-sm">
                <p>If you provided an email address, you will receive a receipt with the transaction details.</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/")} className="w-full" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Return to Home"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
