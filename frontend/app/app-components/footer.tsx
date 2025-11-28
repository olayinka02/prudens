import Link from "next/link"
import React from "react"
import { Youtube, Twitter, Facebook, Linkedin, Instagram } from "lucide-react"

const FooterCol = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => (
  <div>
    <h4 className="mb-3 text-sm font-semibold text-foreground/90">{title}</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="hover:underline">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <div className="container relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-lg font-bold text-foreground">Prudens</span>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">your business and friends in one place</p>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-6 sm:grid-cols-5">
            <FooterCol
              title="Why Prudens"
              links={[
                { href: "/business", label: "For Businesses" },
                { href: "/customers", label: "For Customers" },
                { href: "/creators", label: "For Creators" },
                { href: "/point-of-sale", label: "Point of Sale" },
              ]}
            />

            <FooterCol
              title="Company"
              links={[
                { href: "/about", label: "About" },
                { href: "/careers", label: "Careers" },
                { href: "/press", label: "Press & Media" },
                { href: "/ambassadors", label: "Ambassadors" },
              ]}
            />

            <FooterCol
              title="Resources"
              links={[
                { href: "/pricing", label: "Pricing" },
                { href: "/support", label: "Support" },
                { href: "/sales", label: "Sales" },
                { href: "/security", label: "Security" },
              ]}
            />

            <FooterCol
              title="Learn"
              links={[
                { href: "/blog", label: "Blog" },
                { href: "/faqs", label: "FAQs" },
                { href: "/how-tos", label: "How-Tos" },
                { href: "/testimonials", label: "Testimonials" },
              ]}
            />

            <FooterCol
              title="Contact"
              links={[
                { href: "/contact", label: "Email Support" },
                { href: "/twitter", label: "Twitter Support" },
                { href: "/legal/privacy", label: "Privacy Policy" },
                { href: "/legal/terms", label: "Terms of Service" },
              ]}
            />
          </div>
        </div>

        <div className="my-8 h-px bg-border/50" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex w-full items-center justify-center md:justify-start">
            <div className="inline-flex items-center gap-3 rounded-full bg-card/60 px-4 py-2 text-sm text-foreground/90">
              <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
              </svg>
              <span>English - Nigeria</span>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-6 md:justify-end">
            <div className="flex items-center gap-3">
              <a aria-label="youtube" className="rounded-full p-2 hover:bg-card/50" href="#">
                <Youtube className="h-5 w-5 text-muted-foreground" />
              </a>
              <a aria-label="twitter" className="rounded-full p-2 hover:bg-card/50" href="#">
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </a>
              <a aria-label="facebook" className="rounded-full p-2 hover:bg-card/50" href="#">
                <Facebook className="h-5 w-5 text-muted-foreground" />
              </a>
              <a aria-label="linkedin" className="rounded-full p-2 hover:bg-card/50" href="#">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </a>
              <a aria-label="instagram" className="rounded-full p-2 hover:bg-card/50" href="#">
                <Instagram className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
            <div className="w-full md:w-2/3">
              <p className="text-sm font-semibold text-foreground">© {new Date().getFullYear()} Prudens. All Rights Reserved.</p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Prudens is a technology company. The unauthorised reproduction or distribution of copyrighted materials from this website or Prudens's digital media pages is strictly prohibited. Clicking certain links will redirect you to third-party websites, where privacy practices may differ from Prudens's. We encourage you to review their privacy policies. For additional information, please refer to the legal section of our website.
              </p>
            </div>

            <div className="flex w-full items-center justify-end md:w-1/3">
              <span className="text-lg font-extrabold text-foreground"> Prudens</span>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark background */}
      <div className="mt-10 pointer-events-none absolute left-2/3 top-[70%] -translate-x-1/2 -translate-y-1/2 z-0 opacity-10">
        <span className="select-none whitespace-nowrap font-extrabold text-[220px] leading-none tracking-tight text-muted-foreground">Prudens</span>
      </div>
    </footer>
  )
}
