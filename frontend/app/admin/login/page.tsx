"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Header from "../../app-components/header"
import api from "../utils/api"
import { handleError } from "@/app/app-components/errorHandling"
import { toast } from "react-toastify"
import LoadingBtn from "../app-components/Loadingbtn"

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      // Call the JWT authentication API
      const response = await api.post("/auth/login", {
        username: values.username,
        password: values.password,
      }, {
        withCredentials: true, // Important: include cookies for JWT
      })

      if (response.data.success) {
        // Login successful, redirect to admin dashboard
        toast.success("Logged in successfully!")
        router.push("/admin")
        router.refresh() // Refresh to update auth state
      } else {
        setError(response.data.error || "Invalid username or password")
      }
    } catch (error: any) {
      handleError(error)
      
      const errorMessage = error.response?.data?.error || "An error occurred during login. Please try again."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header type="logo-only" />
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 p-5">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
          

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <br/>

                <Button type="submit" size={"sm"} className="w-full" disabled={isLoading}>
                  {isLoading ? <LoadingBtn loadingText="Signing in..." /> : "Sign In"}
                </Button>

                {/* Development Credentials Info */}
                {/* {process.env.NODE_ENV === "development" && (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs dark:border-amber-800 dark:bg-amber-950">
                    <p className="font-semibold text-amber-900 dark:text-amber-100">
                      Development Mode
                    </p>
                    <p className="mt-1 text-amber-800 dark:text-amber-200">
                      Default credentials: admin / admin123
                    </p>
                  </div>
                )} */}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
