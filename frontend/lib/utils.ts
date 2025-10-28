import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string): string {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(num)
}

export function generateTransactionId(): string {
  return `TXN_${Date.now().toString(36).toUpperCase()}`
}

export function signPayload(payload: any, secretKey: string): string {
  const crypto = require("crypto")
  return crypto.createHmac("sha256", secretKey).update(JSON.stringify(payload)).digest("hex")
}

export function verifySignature(payload: any, signature: string, secretKey: string): boolean {
  const expectedSignature = signPayload(payload, secretKey)
  return expectedSignature === signature
}

export function generateSessionToken(): string {
  const crypto = require("crypto")
  return crypto.randomUUID()
}
