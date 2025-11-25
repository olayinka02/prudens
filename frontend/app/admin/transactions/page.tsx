"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, ArrowUpRight, CheckCircle, Clock, Download, RefreshCw, Search, XCircle, Loader2 } from "lucide-react"
import { useAdminStore } from "@/lib/stores"
import { useTransactions } from "@/lib/hooks"

export default function TransactionsPage() {
  // Use Zustand store for filter state
  const {
    transactionFilters,
    setSearchQuery,
    setStatusFilter,
    currentPage,
    pageSize,
  } = useAdminStore()

  // Fetch transactions using TanStack Query
  const {
    data: transactionsData,
    isLoading,
    error,
    refetch,
  } = useTransactions({
    status: transactionFilters.statusFilter,
    searchQuery: transactionFilters.searchQuery,
    page: currentPage,
    pageSize,
  })

  const transactions = transactionsData?.transactions || []

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground text-sm">
            View and manage all transactions in the system
            {transactionsData && ` (${transactionsData.total} total)`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
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
            value={transactionFilters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={transactionFilters.statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-muted-foreground">Loading transactions...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-red-500">
                    Error loading transactions: {error.message}
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">{transaction.sessionToken.slice(0, 12)}...</td>
                    <td className="px-4 py-3">₦{transaction.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {transaction.status === "completed" && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </span>
                      )}
                      {(transaction.status === "pending" || transaction.status === "paid") && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          <Clock className="mr-1 h-3 w-3" />
                          {transaction.status === "paid" ? "Paid" : "Pending"}
                        </span>
                      )}
                      {transaction.status === "flagged" && (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Flagged
                        </span>
                      )}
                      {transaction.status === "failed" && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                          <XCircle className="mr-1 h-3 w-3" />
                          Failed
                        </span>
                      )}
                      {transaction.status === "refunded" && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          Refunded
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {transaction.recipientBank} - {transaction.recipientAccountNumber.slice(-4)}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/transactions/${transaction.sessionToken}`}>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
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
