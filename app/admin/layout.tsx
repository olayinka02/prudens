"use client"

import { useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Shield,
  LayoutDashboard,
  FileText,
  AlertTriangle,
  RefreshCw,
  ArrowLeftRight,
  Menu,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import logo from "../../public/logo.svg"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAsideOpen, setIsAsideOpen] = useState(false)

 

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl ">
            <Image src={logo} width={46} alt="logo" />
            <span>AnonSend</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium hover:underline">
              Exit Admin
            </Link>
            {/* Hamburger for small screens */}
            <button
              className="lg:hidden"
              onClick={() => setIsAsideOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </header>

      {/* Sidebar for large screens */}
      <div className="flex flex-1">
        <aside className="hidden lg:fixed lg:top-16 lg:left-0 lg:block w-64 h-[calc(100vh-4rem)] overflow-y-auto border-r bg-muted/40 z-10">
          <SidebarContent />
        </aside>

        {/* Slide-in Sidebar on mobile */}
        <AnimatePresence>
          {isAsideOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-30 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAsideOpen(false)}
              />

              {/* Sidebar panel */}
              <motion.aside
                className="fixed z-40 top-0 left-0 h-full w-64 border-r bg-muted/90 backdrop-blur-md p-4"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Menu</span>
                  <button onClick={() => setIsAsideOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:pl-72">{children}</main>
      </div>
    </div>
  )
}

function SidebarContent() {

  const pathname = usePathname()

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/transactions", label: "Transactions", icon: FileText },
    { href: "/admin/approvals", label: "Approval Queue", icon: AlertTriangle },
    { href: "/admin/manual-transfers", label: "Manual Transfers", icon: ArrowLeftRight },
    { href: "/admin/refunds", label: "Refunds", icon: RefreshCw },
  ]

  return (
    <div className="flex flex-col gap-2 px-0 md:px-4 pt-7">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
              isActive ? "bg-muted text-primary" : ""
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        )
      })}
    </div>
  )
}
