"use client"
import { useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Send, Eye, Lock, X, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import anosendImage from "../public/anosendImage.svg"
import logo from "../public/logo.svg"
import Header from "./app-components/header";


export default function Home() {
  

  return (
    <div className="w-full flex flex-col min-h-screen">

    <Header />

      <main className="flex-1">
        <section className="pt-28 md:pt-24 lg:pt-32 bg-body">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Send Money <span className="text-primary">Anonymously</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  Transfer funds securely without revealing your identity. Fast, reliable, and private.
                </p>
              </div>

              <div className="flex flex-row gap-4">
                <Link href="/send">
                  <Button size="lg"  >
                    <Send className="h-4 w-4" />
                    Send Now
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" className="border border-primary " variant="outline" >
                  <span className="text-primary">
                    Learn More
                    </span>
                  </Button>
                </Link>
              </div>

              <div className="bg-[#D0EEFC] dark:bg-[#1F2F4B] w-3xl sm:w-5xl md:w-7xl lg:w-2/3 rounded-md">
                <Image src={anosendImage} alt="landing-image" height={300} className="float-right"/>
              </div>
            </div>
          </div>
        </section>


        <section className="py-12 px-5 md:px-24 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Private & Secure</h3>
                  <p className="text-muted-foreground">Your identity remains completely anonymous to the recipient.</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Fast Transfers</h3>
                  <p className="text-muted-foreground">Money is transferred quickly and securely to the recipient.</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Transparent</h3>
                  <p className="text-muted-foreground">
                    Recipients are notified of the transfer without revealing your identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 AnonSend. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm font-medium hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
