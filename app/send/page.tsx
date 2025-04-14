"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import Header from "../app-components/header"

const formSchema = z.object({
  amount: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val)
      return !isNaN(num) && num > 0 && num <= 100000
    },
    { message: "Amount must be between ₦1 and ₦100,000" },
  ),
  bank: z.string().min(1, { message: "Please select a bank" }),
  accountNumber: z.string().length(10, { message: "Account number must be 10 digits" }),
  narration: z.string().max(100, { message: "Narration must be less than 100 characters" }).optional(),
  personalNote: z.string().max(500, { message: "Personal note must be less than 500 characters" }).optional(),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
})

const banks = [
  { id: "044", name: "Access Bank" },
  { id: "063", name: "Access Bank (Diamond)" },
  { id: "050", name: "Ecobank Nigeria" },
  { id: "070", name: "Fidelity Bank" },
  { id: "011", name: "First Bank of Nigeria" },
  { id: "214", name: "First City Monument Bank" },
  { id: "058", name: "Guaranty Trust Bank" },
  { id: "030", name: "Heritage Bank" },
  { id: "301", name: "Jaiz Bank" },
  { id: "082", name: "Keystone Bank" },
  { id: "526", name: "Parallex Bank" },
  { id: "076", name: "Polaris Bank" },
  { id: "101", name: "Providus Bank" },
  { id: "221", name: "Stanbic IBTC Bank" },
  { id: "068", name: "Standard Chartered Bank" },
  { id: "232", name: "Sterling Bank" },
  { id: "100", name: "Suntrust Bank" },
  { id: "302", name: "TAJ Bank" },
  { id: "215", name: "Unity Bank" },
  { id: "035", name: "Wema Bank" },
  { id: "057", name: "Zenith Bank" },
]

export default function SendPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      bank: "",
      accountNumber: "",
      narration: "",
      personalNote: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to payment page with session token
        router.push(`/payment?token=${data.token}`)
      } else {
        throw new Error(data.message || "Failed to initiate transfer")
      }
    } catch (error) {
      console.error("Error:", error)
      // Handle error state
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
     <Header type="logo-only" />
    <div className="mx-auto px-4 max-w-2xl py-24">
      <Card>
        <CardHeader>
          <CardTitle>Send Money Anonymously</CardTitle>
          <CardDescription>Fill in the details below to send money without revealing your identity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle className="text-primary">Important</AlertTitle>
            <AlertDescription>
              Maximum transfer amount is ₦100,000 per transaction. Your identity will remain anonymous to the recipient.
            </AlertDescription>
          </Alert>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₦)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount" {...field} type="number" min="1" max="100000" />
                    </FormControl>
                    <FormDescription>Enter an amount between ₦1 and ₦100,000</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.id}>
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="10-digit account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="narration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Narration (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of the transfer" {...field} />
                    </FormControl>
                    <FormDescription>This will appear on the recipient's bank statement</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="personalNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Note (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a personal message to the recipient"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This will be sent to the recipient along with the notification</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="For receipt and confirmation" {...field} />
                    </FormControl>
                    <FormDescription>We'll send you a confirmation receipt</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Continue to Payment"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">Secured by AnonSend</p>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
