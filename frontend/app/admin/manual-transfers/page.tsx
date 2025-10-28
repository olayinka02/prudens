"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, CheckCircle, Clock, XCircle } from "lucide-react"

// Mock data for failed transfers
const failedTransfers = [
  {
    id: "TXN_123459",
    amount: "₦10,000",
    recipient: "John Doe",
    accountNumber: "0123456789",
    bank: "First Bank",
    date: "Apr 8, 2023",
    failureReason: "Bank server error",
  },
  {
    id: "TXN_123466",
    amount: "₦35,000",
    recipient: "Jane Smith",
    accountNumber: "9876543210",
    bank: "Access Bank",
    date: "Apr 7, 2023",
    failureReason: "Invalid account number",
  },
  {
    id: "TXN_123467",
    amount: "₦20,000",
    recipient: "Robert Johnson",
    accountNumber: "5678901234",
    bank: "UBA",
    date: "Apr 6, 2023",
    failureReason: "Network timeout",
  },
]

export default function ManualTransfersPage() {
  const [selectedTransfer, setSelectedTransfer] = useState<string | null>(null)
  const [transferReference, setTransferReference] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!selectedTransfer || !transferReference) return

    setIsSubmitting(true)

    // In a real implementation, this would call an API
    setTimeout(() => {
      // Remove the completed transfer from the list
      setSelectedTransfer(null)
      setTransferReference("")
      setIsSubmitting(false)
      // Show success message or update UI
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Manual Transfers</h2>
          <p className="text-muted-foreground text-sm">Process failed transfers manually</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            {failedTransfers.length} Failed
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="failed">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="failed">Failed Transfers</TabsTrigger>
          <TabsTrigger value="manual">Manual Transfer Form</TabsTrigger>
        </TabsList>
        <TabsContent value="failed" className="space-y-4">
          <div className="grid gap-4">
            {failedTransfers.map((transfer) => (
              <Card key={transfer.id} className={selectedTransfer === transfer.id ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Transaction {transfer.id}</CardTitle>
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      <XCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  </div>
                  <CardDescription>
                    Failure Reason: <span className="font-medium text-red-800">{transfer.failureReason}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Amount</p>
                      <p>{transfer.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date</p>
                      <p>{transfer.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Recipient</p>
                      <p>{transfer.recipient}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                      <p>{transfer.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Bank</p>
                      <p>{transfer.bank}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/admin/transactions/${transfer.id}`} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      View Details
                    </a>
                  </Button>
                  <Button variant="default" size="sm" onClick={() => setSelectedTransfer(transfer.id)}>
                    Process Manually
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {failedTransfers.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium">No Failed Transfers</h3>
                  <p className="text-muted-foreground mt-2">All transfers have been processed successfully.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Transfer Form</CardTitle>
              <CardDescription>Complete this form after manually processing a transfer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transaction">Transaction ID</Label>
                <Input
                  id="transaction"
                  placeholder="Enter transaction ID"
                  value={selectedTransfer || ""}
                  onChange={(e) => setSelectedTransfer(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Transfer Reference</Label>
                <Input
                  id="reference"
                  placeholder="Enter bank transfer reference"
                  value={transferReference}
                  onChange={(e) => setTransferReference(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  This is the reference number from your bank after completing the manual transfer.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!selectedTransfer || !transferReference || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Mark as Completed"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
