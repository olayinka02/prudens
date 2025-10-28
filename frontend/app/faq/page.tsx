"use client"

import Link from "next/link"
import { Zap, Lightbulb, ShieldCheck, Lock, CreditCard, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header from "../app-components/header"
import FooterSection from "../app-components/footer"
import ContactSection from "../app-components/contactSection"

interface FAQItem {
  icon: React.ElementType
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    icon: ShieldCheck,
    question: "Is my identity really anonymous?",
    answer:
      "Yes! We use advanced encryption and tokenization to ensure your identity remains completely hidden from the recipient. Your personal information is never shared or revealed during the transfer process.",
  },
  {
    icon: Lightbulb,
    question: "How does the transfer work?",
    answer:
      "Simply enter the recipient's bank details and amount, make payment through our secure gateway, and we'll transfer the money to their account. They'll receive an SMS notification without knowing who sent it.",
  },
  {
    icon: CreditCard,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major debit cards, bank transfers, and online payment methods through our secure Paystack integration. All transactions are encrypted and PCI-DSS compliant.",
  },
  {
    icon: Zap,
    question: "How fast is the transfer?",
    answer:
      "Transfers are processed instantly after payment confirmation. Recipients typically receive their funds within minutes, and an SMS notification is sent immediately upon successful transfer.",
  },
  {
    icon: Lock,
    question: "Is it safe and secure?",
    answer:
      "Absolutely! We use bank-level encryption, secure payment gateways, and comply with all financial regulations. Your payment information is never stored on our servers.",
  },
  {
    icon: HelpCircle,
    question: "What are the transfer limits?",
    answer:
      "Currently, you can send between ₦1 and ₦100,000 per transaction. This ensures security while meeting most gifting and support needs. Higher limits may be available in the future.",
  },
]

export default function FAQPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header type="full" />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 md:px-16">
          {/* Header Section */}
          <div className="mb-12 text-left">
            <h1 className="mb-1 text-3xl font-bold tracking-tight md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="text-[0.79rem] text-muted-foreground">
              Here are the most asked questions based from our users.
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {faqs.map((faq, index) => (
              <div key={index} className="flex flex-col">
                {/* Icon */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <faq.icon strokeWidth={1.7} className="h-5 w-5 text-primary" />
                </div>

                {/* Question */}
                <h3 className="mb-1 text-lg font-semibold">{faq.question}</h3>

                {/* Answer */}
                <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Support Section */}
          <ContactSection />

        </div>
      </div>

       <FooterSection />
    </div>
  )
}
