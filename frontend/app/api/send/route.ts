import { NextResponse } from "next/server"
import { initializeTransaction } from "@/lib/sendEngine"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request
    if (!body.amount || !body.bank || !body.accountNumber) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Initialize the transaction using our sendEngine
    const { token, txnId } = await initializeTransaction({
      amount: body.amount,
      bank: body.bank,
      accountNumber: body.accountNumber,
      narration: body.narration || "",
      personalNote: body.personalNote || "",
      email: body.email || "",
    })

    return NextResponse.json({ token, txnId })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
