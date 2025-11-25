# State Management Documentation

This document explains the state management architecture for the AnonSend application, which uses **Zustand** for UI state management and **TanStack Query (React Query)** for server data fetching and caching.

## Table of Contents

1. [Overview](#overview)
2. [Zustand - UI State Management](#zustand---ui-state-management)
3. [TanStack Query - Server State Management](#tanstack-query---server-state-management)
4. [Project Structure](#project-structure)
5. [Usage Examples](#usage-examples)
6. [Best Practices](#best-practices)
7. [Common Patterns](#common-patterns)

---

## Overview

### Why Two State Management Solutions?

We use a **dual-state management** approach to handle different types of state:

- **Zustand**: For **UI/client state** (filters, modals, toggles, preferences)
  - Lightweight and simple
  - No boilerplate
  - Persists across page navigation

- **TanStack Query**: For **server state** (API data, transactions, user data)
  - Automatic caching
  - Request deduplication
  - Background refetching
  - Loading/error states built-in

### When to Use What?

| State Type | Tool | Examples |
|------------|------|----------|
| UI State | Zustand | Modal open/closed, filters, sort order, view mode |
| Server Data | TanStack Query | Transaction list, bank list, user data |
| Form State | React Hook Form | Form inputs, validation |
| Theme | next-themes | Light/dark mode |

---

## Zustand - UI State Management

### Setup

Zustand stores are located in `/lib/stores/`. The QueryProvider is already set up in the root layout.

### Available Stores

#### 1. Auth Store (`useAuthStore`)

Manages authentication state and persists to localStorage.

```typescript
import { useAuthStore } from "@/lib/stores"

// In a component
const { user, isAuthenticated, login, logout } = useAuthStore()

// Login
login({ id: "1", email: "admin@example.com", role: "admin" })

// Logout
logout()

// Check auth status
if (isAuthenticated) {
  console.log("User is logged in:", user.email)
}
```

**State:**
- `user`: Current user object or null
- `isAuthenticated`: Boolean flag
- `login(user)`: Function to set user and mark as authenticated
- `logout()`: Function to clear user and mark as unauthenticated

**Persistence:** This store is persisted to localStorage under the key `anonsend-auth`.

#### 2. Admin Store (`useAdminStore`)

Manages admin dashboard UI state (filters, pagination, view preferences).

```typescript
import { useAdminStore } from "@/lib/stores"

// In a component
const {
  transactionFilters,
  setSearchQuery,
  setStatusFilter,
  setSortBy,
  setSortOrder,
  resetFilters,
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
  viewMode,
  setViewMode,
} = useAdminStore()

// Update search query
setSearchQuery("TXN_123")

// Update status filter
setStatusFilter("completed")

// Reset all filters
resetFilters()

// Change page
setCurrentPage(2)

// Change view mode
setViewMode("grid")
```

**State:**
- `transactionFilters`: Object containing search query, status filter, sort settings
- `currentPage`: Current page number for pagination
- `pageSize`: Number of items per page
- `viewMode`: "grid" or "list" view mode

**Note:** This store is NOT persisted (resets on page refresh).

#### 3. Modal Store (`useModalStore`)

Manages global modal state for coordinating multiple modals.

```typescript
import { useModalStore } from "@/lib/stores"

// In a component
const { activeModal, modalData, isOpen, openModal, closeModal } = useModalStore()

// Open a modal with data
openModal("resend-notification", { transactionId: "TXN_123" })

// Close modal
closeModal()

// Check active modal
if (activeModal === "resend-notification") {
  // Render resend notification modal
}
```

**Modal Types:**
- `"resend-notification"`
- `"process-refund"`
- `"manual-transfer"`
- `"approve-transaction"`
- `"reject-transaction"`

---

## TanStack Query - Server State Management

### Setup

TanStack Query is configured in `/app/app-components/QueryProvider.tsx` and wrapped around the entire app in the root layout.

**Default Configuration:**
```typescript
{
  queries: {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,   // 10 minutes
    retry: 1,                  // Retry once on failure
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
  },
  mutations: {
    retry: 0, // Don't retry mutations
  },
}
```

### Query Hooks (Fetching Data)

All query hooks are located in `/lib/hooks/queries/`.

#### 1. `useBanks()`

Fetches list of Nigerian banks from Paystack API.

```typescript
import { useBanks } from "@/lib/hooks"

function BankSelector() {
  const { data: banks, isLoading, error } = useBanks()

  if (isLoading) return <div>Loading banks...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <select>
      {banks.map((bank) => (
        <option key={bank.code} value={bank.code}>
          {bank.name}
        </option>
      ))}
    </select>
  )
}
```

**Returns:**
- `data`: Array of banks `{ id, name, code }`
- `isLoading`: Boolean
- `error`: Error object or null

**Cache:** 24 hours (banks don't change frequently)

#### 2. `useTransactionDetails(token)`

Fetches transaction details by session token.

```typescript
import { useTransactionDetails } from "@/lib/hooks"

function PaymentPage() {
  const token = searchParams.get("token")
  const { data: transaction, isLoading, error } = useTransactionDetails(token)

  if (isLoading) return <div>Loading transaction...</div>
  if (error) return <div>Transaction not found</div>

  return <div>Amount: ₦{transaction.amount}</div>
}
```

**Returns:**
- `data`: Transaction object
- `isLoading`: Boolean
- `error`: Error object or null

**Features:**
- Only runs if token is provided (`enabled: !!token`)
- Refetches every 30 seconds for status updates
- Cached for 5 minutes

#### 3. `useTransactions(filters?)`

Fetches all transactions for admin dashboard with filtering and pagination.

```typescript
import { useTransactions } from "@/lib/hooks"

function AdminTransactionsPage() {
  const { transactionFilters, currentPage, pageSize } = useAdminStore()

  const {
    data: transactionsData,
    isLoading,
    error,
    refetch
  } = useTransactions({
    status: transactionFilters.statusFilter,
    searchQuery: transactionFilters.searchQuery,
    page: currentPage,
    pageSize,
  })

  const transactions = transactionsData?.transactions || []
  const total = transactionsData?.total || 0

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {transactions.map((txn) => (
        <div key={txn.id}>{txn.id}</div>
      ))}
    </div>
  )
}
```

**Parameters:**
- `filters.status`: Filter by status ("all", "pending", "completed", etc.)
- `filters.searchQuery`: Search by ID or recipient
- `filters.page`: Page number
- `filters.pageSize`: Items per page

**Returns:**
- `data.transactions`: Array of transactions
- `data.total`: Total count
- `data.page`: Current page
- `data.pageSize`: Items per page

**Features:**
- Refetches every 60 seconds
- Cached for 30 seconds

### Mutation Hooks (Modifying Data)

All mutation hooks are located in `/lib/hooks/mutations/`.

#### 1. `useInitiatePayment()`

Initiates a new payment/transaction.

```typescript
import { useInitiatePayment } from "@/lib/hooks"
import { useRouter } from "next/navigation"

function SendForm() {
  const router = useRouter()
  const initiatePaymentMutation = useInitiatePayment()

  const handleSubmit = (values) => {
    initiatePaymentMutation.mutate(
      {
        amount: parseFloat(values.amount),
        recipientBank: values.bank,
        recipientAccountNumber: values.accountNumber,
        recipientAccountName: accountName,
        senderNote: values.personalNote,
      },
      {
        onSuccess: (data) => {
          router.push(`/payment?token=${data.sessionToken}`)
        },
        onError: (error) => {
          alert(error.message)
        },
      }
    )
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={initiatePaymentMutation.isPending}
    >
      {initiatePaymentMutation.isPending ? "Processing..." : "Continue"}
    </button>
  )
}
```

**Input:**
```typescript
{
  amount: number
  recipientBank: string
  recipientAccountNumber: string
  recipientAccountName: string
  senderNote?: string
}
```

**Output:**
```typescript
{
  success: boolean
  sessionToken: string
  paymentUrl: string
  expiresAt: string
}
```

#### 2. `useVerifyAccount()`

Verifies bank account details via Paystack API.

```typescript
import { useVerifyAccount } from "@/lib/hooks"

function AccountNumberInput() {
  const [accountName, setAccountName] = useState(null)
  const verifyAccountMutation = useVerifyAccount()

  const handleVerify = () => {
    verifyAccountMutation.mutate(
      { accountNumber: "0123456789", bankCode: "058" },
      {
        onSuccess: (data) => {
          setAccountName(data.accountName)
        },
        onError: (error) => {
          alert("Verification failed")
        },
      }
    )
  }

  return (
    <div>
      <button onClick={handleVerify}>Verify</button>
      {verifyAccountMutation.isPending && <div>Verifying...</div>}
      {accountName && <div>Account Name: {accountName}</div>}
    </div>
  )
}
```

#### 3. `useResendNotification()`

Resends SMS notification to recipient.

```typescript
import { useResendNotification } from "@/lib/hooks"

function ResendButton({ transactionId }) {
  const resendMutation = useResendNotification()

  const handleResend = () => {
    resendMutation.mutate(
      { transactionId, customMessage: "Your money is ready!" },
      {
        onSuccess: () => {
          alert("Notification sent!")
        },
      }
    )
  }

  return (
    <button onClick={handleResend} disabled={resendMutation.isPending}>
      {resendMutation.isPending ? "Sending..." : "Resend Notification"}
    </button>
  )
}
```

**Features:**
- Automatically invalidates transaction queries after success
- Updates UI with fresh data

#### 4. `useProcessRefund()`

Processes a transaction refund.

```typescript
import { useProcessRefund } from "@/lib/hooks"

function RefundButton({ transactionId }) {
  const processRefundMutation = useProcessRefund()

  const handleRefund = () => {
    processRefundMutation.mutate(
      {
        transactionId,
        reason: "Customer requested refund"
      },
      {
        onSuccess: (data) => {
          alert(`Refund processed: ${data.refundReference}`)
        },
      }
    )
  }

  return (
    <button onClick={handleRefund} disabled={processRefundMutation.isPending}>
      Process Refund
    </button>
  )
}
```

**Features:**
- Automatically invalidates transaction queries after success
- Updates UI with refund status

---

## Project Structure

```
lib/
├── stores/
│   ├── authStore.ts         # Authentication state
│   ├── adminStore.ts        # Admin dashboard UI state
│   ├── modalStore.ts        # Global modal state
│   └── index.ts             # Export all stores
│
├── hooks/
│   ├── queries/
│   │   ├── useBanks.ts            # Fetch banks
│   │   ├── useTransactionDetails.ts # Fetch transaction by token
│   │   ├── useTransactions.ts     # Fetch all transactions (admin)
│   │   └── ...
│   ├── mutations/
│   │   ├── useInitiatePayment.ts      # Create transaction
│   │   ├── useVerifyAccount.ts        # Verify account
│   │   ├── useResendNotification.ts   # Resend SMS
│   │   ├── useProcessRefund.ts        # Process refund
│   │   └── ...
│   └── index.ts             # Export all hooks
│
app/
└── app-components/
    └── QueryProvider.tsx    # TanStack Query setup
```

---

## Usage Examples

### Example 1: Simple Data Fetching

```typescript
"use client"

import { useBanks } from "@/lib/hooks"

export default function BankList() {
  const { data: banks, isLoading, error } = useBanks()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {banks.map((bank) => (
        <li key={bank.code}>{bank.name}</li>
      ))}
    </ul>
  )
}
```

### Example 2: Form Submission with Mutation

```typescript
"use client"

import { useState } from "react"
import { useInitiatePayment } from "@/lib/hooks"

export default function PaymentForm() {
  const [amount, setAmount] = useState("")
  const initiatePayment = useInitiatePayment()

  const handleSubmit = (e) => {
    e.preventDefault()

    initiatePayment.mutate(
      {
        amount: parseFloat(amount),
        // ... other fields
      },
      {
        onSuccess: (data) => {
          console.log("Payment initiated:", data.sessionToken)
        },
        onError: (error) => {
          console.error("Failed:", error.message)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button disabled={initiatePayment.isPending}>
        {initiatePayment.isPending ? "Processing..." : "Submit"}
      </button>
    </form>
  )
}
```

### Example 3: Combining Zustand + TanStack Query

```typescript
"use client"

import { useAdminStore } from "@/lib/stores"
import { useTransactions } from "@/lib/hooks"

export default function AdminDashboard() {
  // UI state from Zustand
  const {
    transactionFilters,
    setSearchQuery,
    setStatusFilter
  } = useAdminStore()

  // Server data from TanStack Query
  const { data, isLoading, refetch } = useTransactions({
    status: transactionFilters.statusFilter,
    searchQuery: transactionFilters.searchQuery,
  })

  return (
    <div>
      {/* Filters update Zustand store */}
      <input
        value={transactionFilters.searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        value={transactionFilters.statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
      </select>

      {/* Data from TanStack Query */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.transactions.map((txn) => (
            <li key={txn.id}>{txn.id}</li>
          ))}
        </ul>
      )}

      <button onClick={() => refetch()}>Refresh</button>
    </div>
  )
}
```

---

## Best Practices

### 1. Always Use Hooks at Component Top Level

```typescript
// ✅ GOOD
function MyComponent() {
  const { data } = useBanks()

  return <div>{data?.length}</div>
}

// ❌ BAD
function MyComponent() {
  if (someCondition) {
    const { data } = useBanks() // Error: conditional hook
  }
}
```

### 2. Handle Loading and Error States

```typescript
// ✅ GOOD
function MyComponent() {
  const { data, isLoading, error } = useBanks()

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return null

  return <BankList banks={data} />
}

// ❌ BAD
function MyComponent() {
  const { data } = useBanks()

  return <BankList banks={data} /> // data might be undefined
}
```

### 3. Use Query Keys Consistently

Query keys are automatically managed in custom hooks, but if you need to manually invalidate:

```typescript
import { useQueryClient } from "@tanstack/react-query"

function RefreshButton() {
  const queryClient = useQueryClient()

  const handleRefresh = () => {
    // Invalidate all transactions queries
    queryClient.invalidateQueries({ queryKey: ["transactions"] })

    // Invalidate specific transaction
    queryClient.invalidateQueries({ queryKey: ["transaction", "TOKEN_123"] })
  }

  return <button onClick={handleRefresh}>Refresh</button>
}
```

### 4. Avoid Storing Server Data in Zustand

```typescript
// ❌ BAD - Don't store API data in Zustand
const useBadStore = create((set) => ({
  transactions: [],
  setTransactions: (txns) => set({ transactions: txns }),
}))

// ✅ GOOD - Use TanStack Query for API data
const { data: transactions } = useTransactions()
```

### 5. Use Mutations for Write Operations

```typescript
// ✅ GOOD
const createTransaction = useInitiatePayment()
createTransaction.mutate({ amount: 5000 })

// ❌ BAD - Don't use manual fetch in components
fetch("/api/send", {
  method: "POST",
  body: JSON.stringify({ amount: 5000 })
})
```

---

## Common Patterns

### Pattern 1: Debounced Search

```typescript
import { useEffect } from "react"
import { useAdminStore } from "@/lib/stores"
import { useTransactions } from "@/lib/hooks"

function SearchableList() {
  const { transactionFilters, setSearchQuery } = useAdminStore()
  const { data, isLoading } = useTransactions({
    searchQuery: transactionFilters.searchQuery,
  })

  // TanStack Query automatically handles debouncing via cache
  // No manual debounce needed!

  return (
    <div>
      <input
        value={transactionFilters.searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading && <div>Searching...</div>}
      {data?.transactions.map((txn) => <div key={txn.id}>{txn.id}</div>)}
    </div>
  )
}
```

### Pattern 2: Optimistic Updates

```typescript
import { useQueryClient } from "@tanstack/react-query"
import { useProcessRefund } from "@/lib/hooks"

function RefundButton({ transactionId }) {
  const queryClient = useQueryClient()
  const processRefund = useProcessRefund()

  const handleRefund = () => {
    processRefund.mutate(
      { transactionId, reason: "Customer request" },
      {
        // Optimistically update UI before server responds
        onMutate: async () => {
          // Cancel ongoing queries
          await queryClient.cancelQueries({ queryKey: ["transaction", transactionId] })

          // Snapshot previous value
          const previousData = queryClient.getQueryData(["transaction", transactionId])

          // Optimistically update
          queryClient.setQueryData(["transaction", transactionId], (old) => ({
            ...old,
            status: "refunded",
          }))

          return { previousData }
        },
        // Revert on error
        onError: (err, variables, context) => {
          queryClient.setQueryData(
            ["transaction", transactionId],
            context.previousData
          )
        },
      }
    )
  }

  return <button onClick={handleRefund}>Refund</button>
}
```

### Pattern 3: Polling for Updates

```typescript
import { useTransactionDetails } from "@/lib/hooks"

function TransactionStatus({ token }) {
  // Automatically refetches every 30 seconds
  const { data: transaction } = useTransactionDetails(token)

  return (
    <div>
      Status: {transaction?.status}
      {/* UI updates automatically when status changes */}
    </div>
  )
}
```

### Pattern 4: Conditional Queries

```typescript
import { useTransactionDetails } from "@/lib/hooks"

function ConditionalFetch({ shouldFetch, token }) {
  // Only fetches if shouldFetch is true
  const { data } = useTransactionDetails(shouldFetch ? token : null)

  return <div>{data?.amount}</div>
}
```

### Pattern 5: Manual Refetch

```typescript
import { useTransactions } from "@/lib/hooks"

function TransactionList() {
  const { data, isLoading, refetch } = useTransactions()

  return (
    <div>
      <button onClick={() => refetch()} disabled={isLoading}>
        {isLoading ? "Refreshing..." : "Refresh"}
      </button>
      {data?.transactions.map((txn) => <div key={txn.id}>{txn.id}</div>)}
    </div>
  )
}
```

---

## Debugging

### TanStack Query Devtools

In development mode, the React Query Devtools are automatically enabled. Press the TanStack Query icon in the bottom-right corner to:

- View all queries and their states
- Inspect cached data
- Manually refetch or invalidate queries
- Monitor network requests

### Zustand DevTools

To debug Zustand stores, install the Redux DevTools browser extension. Zustand stores can be configured to work with it:

```typescript
import { create } from "zustand"
import { devtools } from "zustand/middleware"

const useStore = create(
  devtools((set) => ({
    // ... store logic
  }))
)
```

---

## Troubleshooting

### Issue: Query Not Refetching

**Solution:** Check if `enabled` option is set correctly
```typescript
const { data } = useTransactionDetails(token) // Won't fetch if token is null
```

### Issue: Mutation Not Updating UI

**Solution:** Ensure query invalidation in mutation hooks
```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["transactions"] })
}
```

### Issue: Filters Not Persisting

**Solution:** Use Zustand store instead of local useState
```typescript
// ❌ BAD
const [searchQuery, setSearchQuery] = useState("")

// ✅ GOOD
const { transactionFilters, setSearchQuery } = useAdminStore()
```

---

## Migration Guide

If you have existing code using `useState` and manual `fetch`:

### Before:
```typescript
const [data, setData] = useState(null)
const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  setIsLoading(true)
  fetch("/api/transactions")
    .then(res => res.json())
    .then(setData)
    .finally(() => setIsLoading(false))
}, [])
```

### After:
```typescript
const { data, isLoading } = useTransactions()
```

---

## Summary

- **Zustand**: Simple, lightweight UI state (filters, modals, toggles)
- **TanStack Query**: Powerful server state with caching and refetching
- **Store files**: `/lib/stores/`
- **Hook files**: `/lib/hooks/queries/` and `/lib/hooks/mutations/`
- **Always handle**: Loading, error, and empty states
- **DevTools**: Available in development for debugging

For more information:
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
