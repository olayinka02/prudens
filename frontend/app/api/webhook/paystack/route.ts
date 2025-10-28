import { NextResponse } from "next/server"

// In a real implementation, this would be stored in a database
const sessions = new Map()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Verify the webhook signature
    // In a real implementation, this would verify the signature from Paystack

    const { event, data } = body

    if (event === "charge.success") {
      // Find the session by payment reference
      let sessionToken = null
      let session = null

      for (const [token, s] of sessions.entries()) {
        if (s.paymentReference === data.reference) {
          sessionToken = token
          session = s
          break
        }
      }

      if (!session) {
        return NextResponse.json({ message: "Session not found" }, { status: 404 })
      }

      // Update the session status
      session.status = "paid"
      sessions.set(sessionToken, session)

      // In a real implementation, this would initiate the transfer to the recipient
      // For demo purposes, we'll simulate a successful transfer

      // Generate a transfer reference
      const transferReference = `TRF_${Date.now().toString(36).toUpperCase()}`

      // Update the session
      session.transferReference = transferReference
      session.status = "completed"
      sessions.set(sessionToken, session)

      // In a real implementation, this would send a notification to the recipient
      // For demo purposes, we'll skip this step
    }

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
