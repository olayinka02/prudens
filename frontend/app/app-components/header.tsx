"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, Calendar, Zap, Layers, Box, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import logo from "../../public/logo.svg"

interface HeaderProps {
  type?: "full" | "logo-only"
}

export default function Header({ type = "full" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<null | "features" | "solutions">(
    null
  )
  const containerRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null)
    }

    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [])

  // Close any open mega menu when mobile menu is closed
  useEffect(() => {
    if (!isMenuOpen) setOpenMenu(null)
  }, [isMenuOpen])

  return (
    <header className="border-b w-full fixed bg-background z-50">
      <div className="mx-auto max-w-6xl px-4 md:px-10 flex h-16 items-center justify-between py-4">
        <Link href="/" className="cursor-pointer">
        <div className="flex items-center gap-2 font-bold text-xl">
          {/* <Image src={logo} width={42} alt="logo" /> */}
          <svg
    width={42}
    height={42}
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    
  >
    <path d="M7 7H58V19C58 40.5391 40.5391 58 19 58H7V7Z" fill="#1E1E1E" />
    <path
      opacity={0.5}
      d="M0 0H51V12C51 33.5391 33.5391 51 12 51H0V0Z"
      fill="#B8B8B8"
    />
  </svg>

          <span>Prudens</span>
        </div>
        </Link>

        {type === "full" && (
          <>
            {/* Desktop nav */}
            <div ref={containerRef} className="hidden md:flex items-center gap-4">
              <nav className="flex items-center gap-4">
                <button
                  className={cn(
                    "text-sm font-medium hover:underline transition-colors flex items-center gap-2",
                    openMenu === "features" ? "text-primary" : ""
                  )}
                  aria-expanded={openMenu === "features"}
                  onClick={() => setOpenMenu(openMenu === "features" ? null : "features")}
                >
                  Features
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  className={cn(
                    "text-sm font-medium hover:underline transition-colors flex items-center gap-2",
                    openMenu === "solutions" ? "text-primary" : ""
                  )}
                  aria-expanded={openMenu === "solutions"}
                  onClick={() => setOpenMenu(openMenu === "solutions" ? null : "solutions")}
                >
                  Solutions
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <Link
                  href="/about"
                  className={cn(
                    "text-sm font-medium hover:underline transition-colors",
                    pathname === "/about" ? "text-primary" : ""
                  )}
                >
                  About
                </Link>
                <Link
                  href="/faq"
                  className={cn(
                    "text-sm font-medium hover:underline transition-colors",
                    pathname === "/faq" ? "text-primary" : ""
                  )}
                >
                  FAQ
                </Link>
              </nav>

              <Link href="/send">
                <Button size={"sm"}>Send Money</Button>
              </Link>
            </div>

            {/* Mega dropdown panels */}
            <AnimatePresence>
              {openMenu === "features" && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 right-0 top-0 w-full z-40"
                >
                  <div className="border-t bg-background shadow-sm">
                    <div className="mx-auto max-w-6xl px-6">
                      <div className="py-6">
                        <h3 className="text-lg font-semibold mb-4">Take a page out of these pre-built playbooks designed for all teams</h3>
                        <hr className="border-t mb-6" />

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">🔔</span> Marketing teams</h4>
                              <p className="text-sm text-muted-foreground">Whether launching a new product, campaign, or creating content, this helps marketing teams succeed.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">📦</span> Product management</h4>
                              <p className="text-sm text-muted-foreground">Use management boards and roadmap features to simplify complex projects and processes.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">⚡</span> Engineering teams</h4>
                              <p className="text-sm text-muted-foreground">Ship more code, faster, and give your developers the freedom to be more agile.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">✏️</span> Design teams</h4>
                              <p className="text-sm text-muted-foreground">Empower your design teams by using Trello to streamline creative requests and cross-team collaboration.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">🏷️</span> Startups</h4>
                              <p className="text-sm text-muted-foreground">From hitting revenue goals to managing workflows, small businesses thrive with these patterns.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">🌐</span> Remote teams</h4>
                              <p className="text-sm text-muted-foreground">Keep your remote team connected and motivated, no matter where they’re located around the world.</p>
                            </div>
                          </div>

                          <aside className="w-full md:w-1/3 pl-0 md:pl-6 mt-4 md:mt-0">
                            <div className="bg-muted/10 p-6 rounded">
                              <h4 className="text-sm font-semibold mb-3">Our product in action</h4>
                              <hr className="border-t mb-4 border-violet-200" />
                              <div className="space-y-4">
                                <div>
                                  <h5 className="font-medium">Use case: Task management</h5>
                                  <p className="text-sm text-muted-foreground">Track progress of tasks in one convenient place with a visual layout that adds "ta-da" to your to-dos.</p>
                                </div>

                                <div>
                                  <h5 className="font-medium">Use case: Resource hub</h5>
                                  <p className="text-sm text-muted-foreground">Save hours when you give teams a well-designed hub to find information easily and quickly.</p>
                                </div>

                                <div>
                                  <h5 className="font-medium">Use case: Project management</h5>
                                  <p className="text-sm text-muted-foreground">Keep projects organized, deadlines on track, and teammates aligned.</p>
                                </div>

                                <a href="#" className="inline-flex items-center text-primary font-medium">See all use cases →</a>
                              </div>
                            </div>
                          </aside>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {openMenu === "solutions" && (
                <motion.div
                  key="solutions"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 right-0 top-0 w-full z-40"
                >
                  <div className="border-t bg-background shadow-sm">
                    <div className="mx-auto max-w-6xl px-6">
                      <div className="py-6">
                        <h3 className="text-lg font-semibold mb-4">Take a page out of these pre-built playbooks designed for all teams</h3>
                        <hr className="border-t mb-6" />

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">🔔</span> Marketing teams</h4>
                              <p className="text-sm text-muted-foreground">Whether launching a new product, campaign, or creating content, this helps marketing teams succeed.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">📦</span> Product management</h4>
                              <p className="text-sm text-muted-foreground">Use management boards and roadmap features to simplify complex projects and processes.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">⚡</span> Engineering teams</h4>
                              <p className="text-sm text-muted-foreground">Ship more code, faster, and give your developers the freedom to be more agile.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">✏️</span> Design teams</h4>
                              <p className="text-sm text-muted-foreground">Empower your design teams by using Trello to streamline creative requests and cross-team collaboration.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">🏷️</span> Startups</h4>
                              <p className="text-sm text-muted-foreground">From hitting revenue goals to managing workflows, small businesses thrive with these patterns.</p>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold mb-2 flex items-center gap-3"><span className="w-6 h-6 bg-muted/30 rounded flex items-center justify-center">🌐</span> Remote teams</h4>
                              <p className="text-sm text-muted-foreground">Keep your remote team connected and motivated, no matter where they’re located around the world.</p>
                            </div>
                          </div>

                          <aside className="w-full md:w-1/3 pl-0 md:pl-6 mt-4 md:mt-0">
                            <div className="bg-muted/10 p-6 rounded">
                              <h4 className="text-sm font-semibold mb-3">Our product in action</h4>
                              <hr className="border-t mb-4 border-violet-200" />
                              <div className="space-y-4">
                                <div>
                                  <h5 className="font-medium">Use case: Task management</h5>
                                  <p className="text-sm text-muted-foreground">Track progress of tasks in one convenient place with a visual layout that adds "ta-da" to your to-dos.</p>
                                </div>

                                <div>
                                  <h5 className="font-medium">Use case: Resource hub</h5>
                                  <p className="text-sm text-muted-foreground">Save hours when you give teams a well-designed hub to find information easily and quickly.</p>
                                </div>

                                <div>
                                  <h5 className="font-medium">Use case: Project management</h5>
                                  <p className="text-sm text-muted-foreground">Keep projects organized, deadlines on track, and teammates aligned.</p>
                                </div>

                                <a href="#" className="inline-flex items-center text-primary font-medium">See all use cases →</a>
                              </div>
                            </div>
                          </aside>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
              className="md:hidden px-4 pb-4 space-y-5 origin-top max-h-[calc(100vh-4rem)] overflow-auto touch-pan-y"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Mobile: show feature/solution triggers with collapsible panels */}
              <div>
                <button
                  className={cn(
                    "w-full text-left block text-sm font-medium py-2",
                    openMenu === "features" ? "text-primary" : ""
                  )}
                  onClick={() => setOpenMenu(openMenu === "features" ? null : "features")}
                >
                  Features
                </button>

                <AnimatePresence>
                  {openMenu === "features" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-3 bg-muted/5 rounded">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <h4 className="font-semibold">Marketing teams</h4>
                            <p className="text-sm text-muted-foreground">Whether launching a new product, campaign, or creating content, this helps teams succeed.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Product management</h4>
                            <p className="text-sm text-muted-foreground">Use management boards and roadmap features to simplify complex projects and processes.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Engineering teams</h4>
                            <p className="text-sm text-muted-foreground">Ship more code, faster, and give your developers the freedom to be more agile.</p>
                          </div>
                          <div>
                            <a href="#" className="text-primary font-medium">See all teams →</a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <button
                  className={cn(
                    "w-full text-left block text-sm font-medium py-2",
                    openMenu === "solutions" ? "text-primary" : ""
                  )}
                  onClick={() => setOpenMenu(openMenu === "solutions" ? null : "solutions")}
                >
                  Solutions
                </button>

                <AnimatePresence>
                  {openMenu === "solutions" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-3 bg-muted/5 rounded">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <h4 className="font-semibold">Use case: Task management</h4>
                            <p className="text-sm text-muted-foreground">Track progress of tasks in one convenient place with a visual layout that adds "ta-da" to your to-dos.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Use case: Resource hub</h4>
                            <p className="text-sm text-muted-foreground">Save hours when you give teams a well-designed hub to find information easily and quickly.</p>
                          </div>
                          <div>
                            <a href="#" className="text-primary font-medium">See all use cases →</a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/about"
                className={cn(
                  "block text-sm font-medium hover:underline transition-colors",
                  pathname === "/about" ? "text-primary" : ""
                )}
              >
                About
              </Link>
              <Link
                href="/faq"
                className={cn(
                  "block text-sm font-medium hover:underline transition-colors",
                  pathname === "/faq" ? "text-primary" : ""
                )}
              >
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
