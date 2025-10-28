import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function ContactSection() {
  return (
     <div className="mx-auto max-w-4xl rounded-2xl bg-muted/40 px-8 py-10 text-center">
            {/* Avatar Stack */}
            <div className="mb-4 flex justify-center">
              <div className="flex -space-x-4">
                <div className="h-12 w-12 rounded-full border-4 border-background bg-gradient-to-br from-blue-500 to-blue-600" />
                <div className="h-12 w-12 rounded-full border-4 border-background bg-gradient-to-br from-purple-500 to-purple-600" />
                <div className="h-12 w-12 rounded-full border-4 border-background bg-gradient-to-br from-pink-500 to-pink-600" />
                <div className="h-12 w-12 rounded-full border-4 border-background bg-gradient-to-br from-orange-500 to-orange-600" />
                <div className="h-12 w-12 rounded-full border-4 border-background bg-gradient-to-br from-teal-500 to-teal-600" />
              </div>
            </div>

            {/* Text */}
            <h2 className="mb-1 text-2xl font-bold">Join Our Support Live Chat</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              If you still have other questions, why not join our live chat channel?
            </p>

            {/* CTA Button */}
            <Link href="/contact">
              <Button size={"sm"} className="gap-2">
                Get In Touch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
  )
}
