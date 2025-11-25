import { create } from "zustand"

interface TransactionFilters {
  searchQuery: string
  statusFilter: "all" | "pending" | "paid" | "completed" | "flagged" | "failed" | "refunded"
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
}

interface AdminState {
  // Transaction filters
  transactionFilters: TransactionFilters
  setSearchQuery: (query: string) => void
  setStatusFilter: (status: TransactionFilters["statusFilter"]) => void
  setSortBy: (sortBy: TransactionFilters["sortBy"]) => void
  setSortOrder: (order: TransactionFilters["sortOrder"]) => void
  resetFilters: () => void

  // Pagination
  currentPage: number
  pageSize: number
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void

  // View preferences
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
}

const defaultFilters: TransactionFilters = {
  searchQuery: "",
  statusFilter: "all",
  sortBy: "date",
  sortOrder: "desc",
}

/**
 * Admin Store - Manages admin dashboard UI state
 * Filters, pagination, and view preferences
 */
export const useAdminStore = create<AdminState>((set) => ({
  // Transaction filters
  transactionFilters: defaultFilters,
  setSearchQuery: (query) =>
    set((state) => ({
      transactionFilters: { ...state.transactionFilters, searchQuery: query },
    })),
  setStatusFilter: (status) =>
    set((state) => ({
      transactionFilters: { ...state.transactionFilters, statusFilter: status },
    })),
  setSortBy: (sortBy) =>
    set((state) => ({
      transactionFilters: { ...state.transactionFilters, sortBy },
    })),
  setSortOrder: (order) =>
    set((state) => ({
      transactionFilters: { ...state.transactionFilters, sortOrder: order },
    })),
  resetFilters: () => set({ transactionFilters: defaultFilters }),

  // Pagination
  currentPage: 1,
  pageSize: 20,
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),

  // View preferences
  viewMode: "list",
  setViewMode: (mode) => set({ viewMode: mode }),
}))
