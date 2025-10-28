import { generateTransactionId, signPayload, generateSessionToken } from "./utils"

// In a real implementation, this would interact with a database
// For now, we'll use a global Map that's exported so other modules can access it
export const sessions = new Map()

export interface TransactionDetails {
  amount: string
  bank: string
  accountNumber: string
  narration?: string
  personalNote?: string
  email?: string
}

export interface TransactionMetadata {
  txnId: string
  amount: string
  timestamp: string
  expiry: string
}

export interface TransactionSession {
  txnId: string
  metadata: TransactionMetadata
  signature: string
  details: TransactionDetails
  status: string
  paymentReference?: string
  transferReference?: string
}

export async function initializeTransaction(details: TransactionDetails): Promise<{ token: string; txnId: string }> {
  // Generate a transaction ID
  const txnId = generateTransactionId()

  // Generate a session token
  const token = generateSessionToken()

  // Create a signed metadata object
  const metadata: TransactionMetadata = {
    txnId,
    amount: details.amount,
    timestamp: new Date().toISOString(),
    expiry: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
  }

  // Sign the metadata
  const signature = signPayload(metadata, process.env.SIGNATURE_SECRET || "SECRET_KEY")

  // Store the session
  const session: TransactionSession = {
    txnId,
    metadata,
    signature,
    details,
    status: "pending",
  }

  sessions.set(token, session)

  return { token, txnId }
}

export async function getTransaction(token: string): Promise<TransactionSession | null> {
  return sessions.get(token) || null
}

export async function updateTransactionStatus(token: string, status: string): Promise<boolean> {
  const session = sessions.get(token)

  if (!session) {
    return false
  }

  session.status = status
  sessions.set(token, session)

  return true
}

export async function processPayment(token: string, paymentReference: string): Promise<boolean> {
  const session = sessions.get(token)

  if (!session) {
    return false
  }

  session.paymentReference = paymentReference
  session.status = "paid"
  sessions.set(token, session)

  return true
}

export async function processTransfer(token: string): Promise<{ success: boolean; transferReference?: string }> {
  const session = sessions.get(token)

  if (!session || session.status !== "paid") {
    return { success: false }
  }

  // In a real implementation, this would call the bank transfer API
  // For demo purposes, we'll simulate a successful transfer

  // Generate a transfer reference
  const transferReference = `TRF_${Date.now().toString(36).toUpperCase()}`

  // Update the session
  session.transferReference = transferReference
  session.status = "completed"
  sessions.set(token, session)

  return { success: true, transferReference }
}
