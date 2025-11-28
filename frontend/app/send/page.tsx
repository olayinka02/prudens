"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useBanks, useVerifyAccount, useInitiatePayment } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { InfoIcon, CheckCircle2, Loader2, XCircle, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Header from "../app-components/header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify"

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

interface Bank {
  id: number
  name: string
  code: string
}

export default function SendPage() {
  const [accountName, setAccountName] = useState<string | null>(null)
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const router = useRouter()

  // TanStack Query hooks
  const { data: banks = [], isLoading: isFetchingBanks } = useBanks()
  const verifyAccountMutation = useVerifyAccount()
  const initiatePaymentMutation = useInitiatePayment()

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

  // Watch bank and account number for verification
  const bank = form.watch("bank")
  const accountNumber = form.watch("accountNumber")

  // Verify account name when bank and account number are valid
  useEffect(() => {
    // Reset states
    setAccountName(null)
    setVerificationError(null)

    // Check if both bank and account number are provided
    if (!bank || !accountNumber || accountNumber.length !== 10) {
      return
    }

    // Debounce the verification to avoid too many API calls
    const timeoutId = setTimeout(() => {
      verifyAccountMutation.mutate(
        {
          accountNumber,
          bankCode: bank,
        },
        {
          onSuccess: (data) => {
            setAccountName(data.accountName)
            setVerificationError(null)
          },
          onError: (error: any) => {
            setVerificationError(
              error.message || "Failed to verify account. Please check details."
            )
          },
        }
      )
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [bank, accountNumber, verifyAccountMutation])

  function onSubmit(values: z.infer<typeof formSchema>) {
    initiatePaymentMutation.mutate(
      {
        amount: Number.parseFloat(values.amount),
        recipientBank: values.bank,
        recipientAccountNumber: values.accountNumber,
        recipientAccountName: accountName || "",
        senderNote: values.personalNote,
        email: values.email || undefined,
      },
      {
        onSuccess: (data) => {
          // Redirect to payment page with session token
          router.push(`/payment?token=${data.sessionToken}`)
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to initiate transfer")
        },
      }
    )
  }

  return (
    <>
     <Header type="logo-only" />
    <div className="mx-auto px-4 max-w-2xl py-24">
      <Card>
        <CardHeader className="p-4">
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
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isFetchingBanks}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={isFetchingBanks ? "Loading banks..." : "Select bank"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                          {banks.map((bank) => (
                            <SelectItem key={bank.code} value={bank.code}>
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isFetchingBanks && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Loading banks...</span>
                        </div>
                      )}
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
                        <Input placeholder="10-digit account number" {...field} maxLength={10} />
                      </FormControl>

                      {/* Account Name Verification Display */}
                      {/* {verifyAccountMutation.isPending && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-[0.72rem]">Verifying account...</span>
                        </div>
                      )} */}
{/* 
                      {accountName && !verifyAccountMutation.isPending && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500 mt-2">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="font-medium text-[0.72rem]">{accountName}</span>
                        </div>
                      )} */}
{/* 
                      {verificationError && !verifyAccountMutation.isPending && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <XCircle className="h-4 w-4" />
                          <span className="text-[0.72rem]">{verificationError}</span>
                        </div>
                      )} */}

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

              <div className="w-full">
                 <Button
                type="submit"
                size={"sm"}
                className="w-auto px-4"
                // disabled={
                //   initiatePaymentMutation.isPending ||
                //   verifyAccountMutation.isPending ||
                //   (accountNumber.length === 10 && !accountName)
                // }
              >
                <span className="text-[0.79rem]">Continue to Payment</span>
                {/* {initiatePaymentMutation.isPending ? "Processing..." : "Continue to Payment"} */}
              </Button>

              </div>

             
              {/* {accountNumber.length === 10 && !accountName && !verifyAccountMutation.isPending && (
                <p className="text-sm text-muted-foreground text-left">
                  Please verify the account details before proceeding
                </p>
              )} */}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">Secured by Prudens</p>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
