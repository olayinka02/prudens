"use client"

import { useState, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import {
  Shield,
  LayoutDashboard,
  FileText,
  AlertTriangle,
  RefreshCw,
  ArrowLeftRight,
  Menu,
  X,
  LogOut,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ProtectedRoute from "../app-components/protectedroute"



interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // If on login page, render children without layout
  if (pathname.includes("/login")) {
    return <>{children}</>
  }

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout", {}, {
        withCredentials: true,
      })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      // Even if the API call fails, redirect to login
      router.push("/admin/login")
      router.refresh()
    }
  }

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen flex-col">
      

      {/* Sidebar for large screens */}
      <div className="flex flex-1">
        <aside className="hidden lg:fixed lg:top-0 lg:left-0 lg:block w-52 h-[calc(100vh)] overflow-y-auto border-r bg-muted/40 z-10">
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

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:pl-60">
          <div >
            <header className="sticky md:hidden w-full top-0 z-20 border-b bg-background">
        <div className=" flex h-auto items-center justify-between py-2">
          <div className="flex items-center gap-2 font-bold text-xl ">
            {/* <Image src={logo} width={46} alt="logo" /> */}
            <svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#0C9FE5] dark:fill-[#45A9D8]">
          <path d="M3.13955 20.7551C3.08688 19.5493 3.41719 17.408 5.08468 15.5842L4.70606 14.4483C3.24201 15.8366 0.586522 18.901 0.162448 21.2637C-0.22737 22.4764 -0.115522 24.9304 2.79348 26.2917C3.86334 26.7924 5.04469 27.1555 6.22494 27.1076C7.73074 27.0465 10.1848 26.5536 13.7933 25.05C15.2321 24.5704 19.4728 23.0054 24.9251 17.1744C23.9911 17.9822 21.8657 19.4765 21.1388 19.9006C17.8825 21.5666 11.4306 24.4442 10.7642 24.4442C10.033 24.5404 8.55079 24.6308 7.29707 24.4268C6.56625 24.3078 5.81973 24.137 5.17424 23.7742C4.5517 23.4243 3.85343 22.794 3.37975 21.7409C3.23982 21.4298 3.15443 21.0959 3.13955 20.7551Z" />
          <path d="M22.3504 19.2948C21.6183 15.3065 21.2902 6.25465 25.8338 1.95337L21.5174 2.71064C20.6591 6.49697 20.3815 14.2968 22.3504 19.2948Z" />
          <path d="M20.3815 12.5551C20.0281 10.4852 19.7757 5.1036 21.5931 0.135925C17.7998 1.31827 9.77108 3.76977 7.30235 4.33792L7.12931 5.58825L18.3369 2.93781C18.3621 4.50283 18.5035 8.07209 18.867 9.82895C19.1446 11.8483 20.0786 16.6292 21.5931 19.5977C21.2902 17.9569 20.6238 14.2514 20.3815 12.5551Z" />
          <path d="M30.6507 6.17839C29.6192 5.65336 27.6561 5.03875 24.8494 5.13389L24.4707 7.02705C25.0765 7.22899 26.4093 7.76918 26.894 8.31441C27.3736 8.76877 28.2722 10.2379 28.0299 12.4794C27.8532 13.3881 27.106 15.7205 25.5309 17.7803C25.1623 18.2003 24.6003 18.8015 23.9263 19.4645C21.1227 22.2224 17.8425 24.5844 14.2116 26.0952C12.6198 26.7576 10.7038 27.3882 8.49239 27.8519C8.7116 27.8206 9.07164 27.7796 9.46406 27.7379C10.7326 27.6031 11.9967 27.4216 13.2264 27.082C14.6876 26.6784 16.7916 26.019 18.7155 25.1257C20.5329 24.217 24.7131 21.9149 26.894 19.9763C28.9134 18.1841 32.9521 13.8728 32.9521 10.9648C33.0879 10.3537 33.0045 8.81688 31.7626 7.15175C31.4643 6.75182 31.0953 6.40471 30.6507 6.17839Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M4.55463 7.17851L17.5039 4.07371C17.5039 11.6464 19.8262 17.8307 20.9873 19.9763C19.0941 21.5666 13.7823 23.9898 10.4613 24.5199C6.18227 18.6006 5.66444 14.9649 4.73311 8.42598C4.67553 8.02166 4.61636 7.60625 4.55463 7.17851ZM8.54851 11.7073C9.41439 11.4783 10.2966 10.7068 10.8273 9.92248C10.8362 9.91011 10.8491 9.9012 10.8638 9.8973C10.8785 9.89341 10.8942 9.89476 10.908 9.90111C11.7622 10.3234 12.9057 10.5549 13.7712 10.3259L14.4619 12.9373C14.6825 13.7714 14.5554 14.4538 14.225 15.0389C13.8877 15.6363 13.3262 16.1527 12.6473 16.6116L12.6473 16.6115L12.638 16.6108C11.8186 16.5501 11.0736 16.3799 10.4842 16.0276C9.9077 15.683 9.4598 15.1528 9.23919 14.3187L8.54851 11.7073ZM10.6665 9.1512C10.4737 9.20219 10.3054 9.32032 10.192 9.48432L10.1919 9.48431L10.1896 9.48783C9.72185 10.1801 8.97655 10.7958 8.35117 10.9612C8.15329 11.0135 7.98431 11.1423 7.8814 11.3193C7.77848 11.4962 7.75007 11.7068 7.80241 11.9046L8.49309 14.516C8.76581 15.5472 9.34077 16.2432 10.0882 16.69C10.8217 17.1285 11.7001 17.3149 12.5772 17.3802C12.752 17.3961 12.9272 17.352 13.0736 17.2549L13.0737 17.2549L13.0764 17.253C13.8051 16.761 14.4764 16.1633 14.8971 15.4184C15.3251 14.6603 15.4808 13.7711 15.208 12.74L14.5173 10.1286C14.465 9.93073 14.3362 9.76175 14.1593 9.65883C13.9823 9.55592 13.7718 9.52751 13.5739 9.57984C12.9483 9.74532 12.0007 9.58106 11.2476 9.20809L11.2476 9.20807L11.2437 9.20616C11.0639 9.1197 10.8593 9.10021 10.6665 9.1512ZM13.0073 12.4068C13.1144 12.2226 13.0519 11.9864 12.8677 11.8793C12.6835 11.7721 12.4473 11.8346 12.3401 12.0188L11.4366 13.5721L10.8267 13.2174C10.6425 13.1102 10.4063 13.1727 10.2992 13.3569C10.192 13.5411 10.2545 13.7773 10.4387 13.8845L11.3822 14.4333C11.4706 14.4847 11.5759 14.4989 11.6748 14.4728C11.7738 14.4466 11.8583 14.3822 11.9097 14.2937L13.0073 12.4068Z" />
          </svg>
            <span>AnonSend</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium hover:underline">
              Exit Admin
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium hover:underline"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
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
      <div className="mt-4 md:mt-2">
      {children}
      </div>
          </div></main>
      </div>
    </div>
    </ProtectedRoute>
  )
}

function SidebarContent() {

  const pathname = usePathname()
  const router = useRouter()

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/transactions", label: "Transactions", icon: FileText },
    { href: "/admin/approvals", label: "Approval Queue", icon: AlertTriangle },
    { href: "/admin/manual-transfers", label: "Manual Transfers", icon: ArrowLeftRight },
    { href: "/admin/refunds", label: "Refunds", icon: RefreshCw },
  ]

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout", {}, {
        withCredentials: true,
      })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      // Even if the API call fails, redirect to login
      router.push("/admin/login")
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col gap-2 px-0 md:px-4 pt-7">

       <div className="hidden md:flex items-center gap-2 font-bold text-xl mb-7 ">
            {/* <Image src={logo} width={46} alt="logo" /> */}
            <svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#0C9FE5] dark:fill-[#45A9D8]">
          <path d="M3.13955 20.7551C3.08688 19.5493 3.41719 17.408 5.08468 15.5842L4.70606 14.4483C3.24201 15.8366 0.586522 18.901 0.162448 21.2637C-0.22737 22.4764 -0.115522 24.9304 2.79348 26.2917C3.86334 26.7924 5.04469 27.1555 6.22494 27.1076C7.73074 27.0465 10.1848 26.5536 13.7933 25.05C15.2321 24.5704 19.4728 23.0054 24.9251 17.1744C23.9911 17.9822 21.8657 19.4765 21.1388 19.9006C17.8825 21.5666 11.4306 24.4442 10.7642 24.4442C10.033 24.5404 8.55079 24.6308 7.29707 24.4268C6.56625 24.3078 5.81973 24.137 5.17424 23.7742C4.5517 23.4243 3.85343 22.794 3.37975 21.7409C3.23982 21.4298 3.15443 21.0959 3.13955 20.7551Z" />
          <path d="M22.3504 19.2948C21.6183 15.3065 21.2902 6.25465 25.8338 1.95337L21.5174 2.71064C20.6591 6.49697 20.3815 14.2968 22.3504 19.2948Z" />
          <path d="M20.3815 12.5551C20.0281 10.4852 19.7757 5.1036 21.5931 0.135925C17.7998 1.31827 9.77108 3.76977 7.30235 4.33792L7.12931 5.58825L18.3369 2.93781C18.3621 4.50283 18.5035 8.07209 18.867 9.82895C19.1446 11.8483 20.0786 16.6292 21.5931 19.5977C21.2902 17.9569 20.6238 14.2514 20.3815 12.5551Z" />
          <path d="M30.6507 6.17839C29.6192 5.65336 27.6561 5.03875 24.8494 5.13389L24.4707 7.02705C25.0765 7.22899 26.4093 7.76918 26.894 8.31441C27.3736 8.76877 28.2722 10.2379 28.0299 12.4794C27.8532 13.3881 27.106 15.7205 25.5309 17.7803C25.1623 18.2003 24.6003 18.8015 23.9263 19.4645C21.1227 22.2224 17.8425 24.5844 14.2116 26.0952C12.6198 26.7576 10.7038 27.3882 8.49239 27.8519C8.7116 27.8206 9.07164 27.7796 9.46406 27.7379C10.7326 27.6031 11.9967 27.4216 13.2264 27.082C14.6876 26.6784 16.7916 26.019 18.7155 25.1257C20.5329 24.217 24.7131 21.9149 26.894 19.9763C28.9134 18.1841 32.9521 13.8728 32.9521 10.9648C33.0879 10.3537 33.0045 8.81688 31.7626 7.15175C31.4643 6.75182 31.0953 6.40471 30.6507 6.17839Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M4.55463 7.17851L17.5039 4.07371C17.5039 11.6464 19.8262 17.8307 20.9873 19.9763C19.0941 21.5666 13.7823 23.9898 10.4613 24.5199C6.18227 18.6006 5.66444 14.9649 4.73311 8.42598C4.67553 8.02166 4.61636 7.60625 4.55463 7.17851ZM8.54851 11.7073C9.41439 11.4783 10.2966 10.7068 10.8273 9.92248C10.8362 9.91011 10.8491 9.9012 10.8638 9.8973C10.8785 9.89341 10.8942 9.89476 10.908 9.90111C11.7622 10.3234 12.9057 10.5549 13.7712 10.3259L14.4619 12.9373C14.6825 13.7714 14.5554 14.4538 14.225 15.0389C13.8877 15.6363 13.3262 16.1527 12.6473 16.6116L12.6473 16.6115L12.638 16.6108C11.8186 16.5501 11.0736 16.3799 10.4842 16.0276C9.9077 15.683 9.4598 15.1528 9.23919 14.3187L8.54851 11.7073ZM10.6665 9.1512C10.4737 9.20219 10.3054 9.32032 10.192 9.48432L10.1919 9.48431L10.1896 9.48783C9.72185 10.1801 8.97655 10.7958 8.35117 10.9612C8.15329 11.0135 7.98431 11.1423 7.8814 11.3193C7.77848 11.4962 7.75007 11.7068 7.80241 11.9046L8.49309 14.516C8.76581 15.5472 9.34077 16.2432 10.0882 16.69C10.8217 17.1285 11.7001 17.3149 12.5772 17.3802C12.752 17.3961 12.9272 17.352 13.0736 17.2549L13.0737 17.2549L13.0764 17.253C13.8051 16.761 14.4764 16.1633 14.8971 15.4184C15.3251 14.6603 15.4808 13.7711 15.208 12.74L14.5173 10.1286C14.465 9.93073 14.3362 9.76175 14.1593 9.65883C13.9823 9.55592 13.7718 9.52751 13.5739 9.57984C12.9483 9.74532 12.0007 9.58106 11.2476 9.20809L11.2476 9.20807L11.2437 9.20616C11.0639 9.1197 10.8593 9.10021 10.6665 9.1512ZM13.0073 12.4068C13.1144 12.2226 13.0519 11.9864 12.8677 11.8793C12.6835 11.7721 12.4473 11.8346 12.3401 12.0188L11.4366 13.5721L10.8267 13.2174C10.6425 13.1102 10.4063 13.1727 10.2992 13.3569C10.192 13.5411 10.2545 13.7773 10.4387 13.8845L11.3822 14.4333C11.4706 14.4847 11.5759 14.4989 11.6748 14.4728C11.7738 14.4466 11.8583 14.3822 11.9097 14.2937L13.0073 12.4068Z" />
          </svg>
            <span>AnonSend</span>
          </div>


      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[0.74rem] font-regular transition-colors hover:bg-muted ${
              isActive ? "bg-muted text-primary" : ""
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        )
      })}

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[0.74rem] font-regular transition-colors hover:bg-muted w-full text-left text-destructive hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
