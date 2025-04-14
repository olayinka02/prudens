"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowUpRight, CheckCircle, XCircle } from "lucide-react"

// Mock data for flagged transactions
const flaggedTransactions = [
  {
    id: "TXN_123458",
    amount: "₦75,000",
    flagReason: "Suspicious narration",
    recipient: "John Smith",
    accountNumber: "0123456789",
    bank: "Zenith Bank",
    date: "Apr 8, 2023",
    narration: "Payment for services",
    personalNote: "This is for the work you did last week.",
  },
  {
    id: "TXN_123460",
    amount: "₦90,000",
    flagReason: "Multiple transfers to same recipient",
    recipient: "Sarah Johnson",
    accountNumber: "9876543210",
    bank: "UBA",
    date: "Apr 8, 2023",
    narration: "Monthly payment",
    personalNote: "Here's your monthly payment as agreed.",
  },
  {
    id: "TXN_123461",
    amount: "₦100,000",
    flagReason: "Maximum amount limit",
    recipient: "Michael Brown",
    accountNumber: "5678901234",
    bank: "Fidelity Bank",
    date: "Apr 7, 2023",
    narration: "Investment",
    personalNote: "This is for our investment project.",
  },
]

export default function ApprovalsPage() {
  const [transactions, setTransactions] = useState(flaggedTransactions)

  const handleApprove = (id: string) => {
    // In a real implementation, this would call an API
    setTransactions(transactions.filter((transaction) => transaction.id !== id))
    // Show success message or update UI
  }

  const handleReject = (id: string) => {
    // In a real implementation, this would call an API
    setTransactions(transactions.filter((transaction) => transaction.id !== id))
    // Show success message or update UI
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Approval Queue</h2>
          <p className="text-muted-foreground">Review and approve flagged transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            <AlertTriangle className="mr-1 h-3 w-3" />
            {transactions.length} Pending
          </Badge>
        </div>
      </div>

      {transactions.length > 0 ? (
        <div className="grid gap-6">
          {transactions.map((transaction) => (
            <Card key={transaction.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Transaction {transaction.id}</CardTitle>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Flagged
                  </Badge>
                </div>
                <CardDescription>
                  Flag Reason: <span className="font-medium text-amber-800">{transaction.flagReason}</span>
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
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/transactions/${transaction.id}`}>
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900"
                    onClick={() => handleReject(transaction.id)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
                    onClick={() => handleApprove(transaction.id)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-medium">No Pending Approvals</h3>
            <p className="text-muted-foreground mt-2">All flagged transactions have been reviewed.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
