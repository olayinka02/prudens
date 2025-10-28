"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, ArrowLeft, CheckCircle, Clock, FileText, RefreshCw, Send, XCircle } from "lucide-react"

// Mock transaction data
const getTransactionById = (id: string) => {
  const statusMap: Record<string, string> = {
    TXN_123456: "completed",
    TXN_123457: "processing",
    TXN_123458: "flagged",
    TXN_123459: "failed",
  }

  return {
    id,
    amount: "₦50,000",
    status: statusMap[id] || "completed",
    recipient: "John Doe",
    accountNumber: "0123456789",
    bank: "GTBank",
    narration: "Gift",
    personalNote: "Happy birthday! Enjoy your special day.",
    date: "Apr 9, 2023 14:30",
    paymentReference: "PAY_987654321",
    transferReference: "TRF_123456789",
    metadata: {
      txnId: id,
      amount: "50000",
      timestamp: "2023-04-09T14:30:00Z",
      expiry: "2023-04-09T15:00:00Z",
      signature: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    },
    logs: [
      { timestamp: "2023-04-09T14:28:00Z", event: "Transaction initiated" },
      { timestamp: "2023-04-09T14:29:00Z", event: "Payment received" },
      { timestamp: "2023-04-09T14:30:00Z", event: "Transfer initiated" },
      { timestamp: "2023-04-09T14:32:00Z", event: "Transfer completed" },
      { timestamp: "2023-04-09T14:33:00Z", event: "Notification sent to recipient" },
    ],
  }
}

export default function TransactionDetailPage() {
  const params = useParams()
  const id = params.id as string
  const transaction = getTransactionById(id)

  const [isResendingNotification, setIsResendingNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  const handleResendNotification = () => {
    setIsResendingNotification(true)

    // Simulate API call
    setTimeout(() => {
      setIsResendingNotification(false)
      // Show success message or update UI
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/transactions">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Transactions
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transaction Details</CardTitle>
              {transaction.status === "completed" && (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              )}
              {transaction.status === "processing" && (
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  <Clock className="mr-1 h-3 w-3" />
                  Processing
                </Badge>
              )}
              {transaction.status === "flagged" && (
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Flagged
                </Badge>
              )}
              {transaction.status === "failed" && (
                <Badge variant="outline" className="bg-red-100 text-red-800">
                  <XCircle className="mr-1 h-3 w-3" />
                  Failed
                </Badge>
              )}
            </div>
            <CardDescription>
              Transaction ID: <span className="font-mono">{transaction.id}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Amount</p>
                <p>{transaction.amount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p>{transaction.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recipient</p>
                <p>{transaction.recipient}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                <p>{transaction.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bank</p>
                <p>{transaction.bank}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Narration</p>
                <p>{transaction.narration}</p>
              </div>
            </div>

            {transaction.personalNote && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Personal Note</p>
                <p className="mt-1 rounded-md bg-muted p-2 text-sm">{transaction.personalNote}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Reference</p>
                <p className="font-mono text-xs">{transaction.paymentReference}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transfer Reference</p>
                <p className="font-mono text-xs">{transaction.transferReference}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Resend Notification
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Resend Notification</DialogTitle>
                  <DialogDescription>
                    Send a new notification to the recipient about this transaction.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recipient</p>
                    <p>
                      {transaction.recipient} ({transaction.accountNumber})
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Custom Message (Optional)</p>
                    <Textarea
                      placeholder="Add a custom message to the notification..."
                      value={notificationMessage}
                      onChange={(e) => setNotificationMessage(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleResendNotification} disabled={isResendingNotification}>
                    {isResendingNotification ? "Sending..." : "Send Notification"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {transaction.status === "failed" && (
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry Transfer
              </Button>
            )}
          </CardFooter>
        </Card>

        <Tabs defaultValue="metadata">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="metadata">Signed Metadata</TabsTrigger>
            <TabsTrigger value="logs">Transaction Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="metadata" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Signed Metadata</CardTitle>
                <CardDescription>Cryptographically signed transaction metadata for verification.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-xs overflow-auto">{JSON.stringify(transaction.metadata, null, 2)}</pre>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Verify Signature
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Logs</CardTitle>
                <CardDescription>Chronological record of events for this transaction.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transaction.logs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="h-2 w-2 mt-1.5 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium">{log.event}</p>
                        <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
