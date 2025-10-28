import { NextResponse } from "next/server"
import { getTransaction } from "@/lib/sendEngine"

// Mock bank data
const banks = {
  "044": "Access Bank",
  "063": "Access Bank (Diamond)",
  "050": "Ecobank Nigeria",
  "070": "Fidelity Bank",
  "011": "First Bank of Nigeria",
  "214": "First City Monument Bank",
  "058": "Guaranty Trust Bank",
  // ... other banks
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 })
    }

    // Get the session from our sendEngine
    const session = await getTransaction(token)

    if (!session) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 404 })
    }

    // Mock recipient name (in a real implementation, this would be fetched from the bank)
    const recipientName = "John Doe"

    // Return transaction details
    return NextResponse.json({
      amount: session.details.amount,
      recipient: recipientName,
      bank: banks[session.details.bank] || session.details.bank,
      reference: session.txnId,
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
