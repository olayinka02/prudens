"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowUpRight, Clock, RefreshCw, Search } from "lucide-react"

export default function RefundsPage() {
  const [transactionId, setTransactionId] = useState("")
  const [searchResult, setSearchResult] = useState<any | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [refundReason, setRefundReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSearch = () => {
    if (!transactionId) return

    setIsSearching(true)

    // In a real implementation, this would call an API
    setTimeout(() => {
      // Mock search result
      setSearchResult({
        id: transactionId,
        amount: "₦50,000",
        recipient: "John Doe",
        accountNumber: "0123456789",
        bank: "GTBank",
        date: "Apr 9, 2023",
        status: "completed",
        paymentReference: "PAY_987654321",
      })
      setIsSearching(false)
    }, 1500)
  }

  const handleRefund = () => {
    if (!searchResult || !refundReason) return

    setIsProcessing(true)

    // In a real implementation, this would call an API
    setTimeout(() => {
      // Reset form
      setTransactionId("")
      setSearchResult(null)
      setRefundReason("")
      setIsProcessing(false)
      // Show success message or update UI
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Refunds</h2>
          <p className="text-muted-foreground">Process refunds for completed transactions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Transaction</CardTitle>
          <CardDescription>Enter a transaction ID to search for a transaction to refund.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>
            <Button className="bg-primary" onClick={handleSearch} disabled={!transactionId || isSearching}>
              {isSearching ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>

          {searchResult && (
            <div className="rounded-md border p-4 mt-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Transaction Found</h3>
                  <p className="text-sm text-muted-foreground">
                    Transaction ID: <span className="font-mono">{searchResult.id}</span>
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/admin/transactions/${searchResult.id}`} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Amount</p>
                  <p>{searchResult.amount}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Date</p>
                  <p>{searchResult.date}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Recipient</p>
                  <p>{searchResult.recipient}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Account</p>
                  <p>
                    {searchResult.bank} {searchResult.accountNumber}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Payment Reference</p>
                  <p className="font-mono text-xs">{searchResult.paymentReference}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Status</p>
                  <p className="capitalize">{searchResult.status}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">Refund Reason</Label>
                  <Select onValueChange={setRefundReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason for refund" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wrong_account">Wrong account details</SelectItem>
                      <SelectItem value="failed_transfer">Failed transfer</SelectItem>
                      <SelectItem value="customer_request">Customer request</SelectItem>
                      <SelectItem value="fraud">Suspected fraud</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {refundReason === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Provide additional details about the refund reason" />
                  </div>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full" disabled={!refundReason}>
                      Process Refund
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Refund</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to process a refund for transaction {searchResult.id} for{" "}
                        {searchResult.amount}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRefund} disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Confirm Refund"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
