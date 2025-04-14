import type { TransactionSession } from "./sendEngine"
import { sessions } from "./sendEngine"

export interface TransactionLog {
  timestamp: string
  event: string
  data?: any
}

export async function getAllTransactions(): Promise<TransactionSession[]> {
  return Array.from(sessions.values())
}

export async function getTransactionById(txnId: string): Promise<TransactionSession | null> {
  for (const session of sessions.values()) {
    if (session.txnId === txnId) {
      return session
    }
  }

  return null
}

export async function getFlaggedTransactions(): Promise<TransactionSession[]> {
  return Array.from(sessions.values()).filter((session) => session.status === "flagged")
}

export async function getFailedTransactions(): Promise<TransactionSession[]> {
  return Array.from(sessions.values()).filter((session) => session.status === "failed")
}

export async function approveTransaction(txnId: string): Promise<boolean> {
  for (const [token, session] of sessions.entries()) {
    if (session.txnId === txnId && session.status === "flagged") {
      session.status = "approved"
      sessions.set(token, session)
      return true
    }
  }

  return false
}

export async function rejectTransaction(txnId: string): Promise<boolean> {
  for (const [token, session] of sessions.entries()) {
    if (session.txnId === txnId && session.status === "flagged") {
      session.status = "rejected"
      sessions.set(token, session)
      return true
    }
  }

  return false
}

export async function processManualTransfer(txnId: string, transferReference: string): Promise<boolean> {
  for (const [token, session] of sessions.entries()) {
    if (session.txnId === txnId && session.status === "failed") {
      session.transferReference = transferReference
      session.status = "completed"
      sessions.set(token, session)
      return true
    }
  }

  return false
}

export async function processRefund(txnId: string, reason: string): Promise<boolean> {
  for (const [token, session] of sessions.entries()) {
    if (session.txnId === txnId) {
      session.status = "refunded"
      // In a real implementation, this would call the payment processor's refund API
      sessions.set(token, session)
      return true
    }
  }

  return false
}

export async function resendNotification(txnId: string, customMessage?: string): Promise<boolean> {
  for (const session of sessions.values()) {
    if (session.txnId === txnId) {
      // In a real implementation, this would send an SMS or email to the recipient
      return true
    }
  }

  return false
}

export async function getTransactionLogs(txnId: string): Promise<TransactionLog[]> {
  // In a real implementation, this would fetch logs from a database
  // For demo purposes, we'll return mock logs

  return [
    { timestamp: "2023-04-09T14:28:00Z", event: "Transaction initiated" },
    { timestamp: "2023-04-09T14:29:00Z", event: "Payment received" },
    { timestamp: "2023-04-09T14:30:00Z", event: "Transfer initiated" },
    { timestamp: "2023-04-09T14:32:00Z", event: "Transfer completed" },
    { timestamp: "2023-04-09T14:33:00Z", event: "Notification sent to recipient" },
  ]
}
