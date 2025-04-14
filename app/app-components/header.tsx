"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from "../../public/logo.svg"

interface HeaderProps {
  type?: "full" | "logo-only"
}

export default function Header({ type = "full" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b w-full fixed bg-background z-50">
      <div className="mx-auto px-4 md:px-10 flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Image src={logo} width={42} alt="logo" />
          <span>AnonSend</span>
        </div>

        {type === "full" && (
          <>
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/about" className="text-sm font-medium hover:underline">
                About
              </Link>
              <Link href="/faq" className="text-sm font-medium hover:underline">
                FAQ
              </Link>
              <Link href="/send">
                <Button>Send Money</Button>
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </>
        )}
      </div>

      {type === "full" && (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden px-4 pb-4 space-y-5 origin-top"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Link href="/about" className="block text-sm font-medium hover:underline">
                About
              </Link>
              <Link href="/faq" className="block text-sm font-medium hover:underline">
                FAQ
              </Link>
              <Link href="/send" className="mt-4 block">
                <Button className="w-full">Send Money</Button>
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      )}
    </header>
  )
}
