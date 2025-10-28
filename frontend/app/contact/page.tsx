"use client"

import { Mail, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Header from "../app-components/header"
import FooterSection from "../app-components/footer"

export default function ContactPage() {
  return (
    <>
      <Header type="full" />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          {/* Header */}
          <div className="mb-8 text-left">
            <h1 className="mb-1 text-4xl font-bold tracking-tight md:text-4xl">
              Get In Touch
            </h1>
            <p className="text-sm text-muted-foreground">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
           

            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardHeader className="p-4">
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <form className="space-y-3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your question or concern..."
                      className="min-h-[150px] resize-none"
                    />
                  </div>
                  
                  <div className="w-full">
                     <Button type="submit" size={"sm"} className="flex px-4">
                    Send Message
                  </Button>
                  </div>
                 
                </form>
              </CardContent>
            </Card>

             {/* Contact Cards */}
            <div className="space-y-8">
              <Card className="p-2">
                <CardHeader>
                  <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Email</CardTitle>
                  <CardDescription> <a
                    href="mailto:support@anonsend.com"
                    className="text-sm font-medium text-primary hover:underline "
                  >support@anonsend.com
                  </a></CardDescription>
                </CardHeader>
               
              </Card>

             
              <Card className="p-2">
                <CardHeader>
                  <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Phone</CardTitle>
                  <CardDescription> <a
                    href="tel:+2348012345678"
                    className="text-sm font-medium text-primary hover:underline "
                  >
                    +234 803 395 5912
                  </a></CardDescription>
                </CardHeader>
                
              </Card>
            </div>


          </div>
        </div>
      </div>
      <FooterSection />
    </>
  )
}
