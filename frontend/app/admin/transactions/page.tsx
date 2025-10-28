"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, ArrowUpRight, CheckCircle, Clock, Download, RefreshCw, Search, XCircle } from "lucide-react"

// Mock data for transactions
const transactions = [
  {
    id: "TXN_123456",
    amount: "₦50,000",
    status: "completed",
    recipient: "GTBank ****1234",
    date: "Apr 9, 2023",
  },
  {
    id: "TXN_123457",
    amount: "₦25,000",
    status: "processing",
    recipient: "Access Bank ****5678",
    date: "Apr 9, 2023",
  },
  {
    id: "TXN_123458",
    amount: "₦75,000",
    status: "flagged",
    recipient: "Zenith Bank ****9012",
    date: "Apr 8, 2023",
  },
  {
    id: "TXN_123459",
    amount: "₦10,000",
    status: "failed",
    recipient: "First Bank ****3456",
    date: "Apr 8, 2023",
  },
  {
    id: "TXN_123460",
    amount: "₦90,000",
    status: "flagged",
    recipient: "UBA ****7890",
    date: "Apr 8, 2023",
  },
  {
    id: "TXN_123461",
    amount: "₦100,000",
    status: "flagged",
    recipient: "Fidelity Bank ****2345",
    date: "Apr 7, 2023",
  },
  {
    id: "TXN_123462",
    amount: "₦30,000",
    status: "completed",
    recipient: "Sterling Bank ****6789",
    date: "Apr 7, 2023",
  },
  {
    id: "TXN_123463",
    amount: "₦45,000",
    status: "completed",
    recipient: "Wema Bank ****0123",
    date: "Apr 6, 2023",
  },
  {
    id: "TXN_123464",
    amount: "₦20,000",
    status: "completed",
    recipient: "Polaris Bank ****4567",
    date: "Apr 6, 2023",
  },
  {
    id: "TXN_123465",
    amount: "₦15,000",
    status: "completed",
    recipient: "Ecobank ****8901",
    date: "Apr 5, 2023",
  },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter transactions based on search query and status filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground text-sm">View and manage all transactions in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by transaction ID or recipient..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Transaction ID</th>
                <th className="px-4 py-3 text-left font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Recipient</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">{transaction.id}</td>
                    <td className="px-4 py-3">{transaction.amount}</td>
                    <td className="px-4 py-3">
                      {transaction.status === "completed" && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </span>
                      )}
                      {transaction.status === "processing" && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          <Clock className="mr-1 h-3 w-3" />
                          Processing
                        </span>
                      )}
                      {transaction.status === "flagged" && (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Flagged
                        </span>
                      )}
                      {transaction.status === "failed" && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                          <XCircle className="mr-1 h-3 w-3" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{transaction.recipient}</td>
                    <td className="px-4 py-3">{transaction.date}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/transactions/${transaction.id}`}>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-3 text-center text-muted-foreground">
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
