import { NextResponse } from "next/server"

// In a real implementation, this would be stored in a database
const sessions = new Map()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 })
    }

    // Get the session
    const session = sessions.get(token)

    if (!session) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 404 })
    }

    // In a real implementation, this would call the Paystack API to initialize a transaction
    // For demo purposes, we'll simulate a successful response

    const authorizationUrl = `https://checkout.paystack.com/${token}`
    const reference = `PAY_${Date.now().toString(36).toUpperCase()}`

    // Update the session
    session.paymentReference = reference
    sessions.set(token, session)

    return NextResponse.json({
      status: true,
      message: "Authorization URL created",
      data: {
        authorizationUrl,
        reference,
      },
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
