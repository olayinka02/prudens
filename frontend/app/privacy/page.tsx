"use client"

import Header from "../app-components/header"
import FooterSection from "../app-components/footer"

export default function PrivacyPage() {
  return (
    <>
      <Header type="full" />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 md:px-10">
          {/* Header */}
          <div className="mb-12 text-left">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              At <strong>Prudens</strong>, we are committed to protecting your privacy while providing secure
              anonymous money transfer services. This Privacy Policy explains how we collect, use, and safeguard
              your information.
            </p>

            <hr className="my-8 border-t border-border" />

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                We collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
                <li>
                  <strong>Personal Information:</strong> Name, email address (optional), and payment information
                  required to process transactions
                </li>
                <li>
                  <strong>Transaction Data:</strong> Recipient bank details, transfer amounts, transaction dates,
                  and optional personal messages
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type, device information, and usage patterns
                  for security and service improvement
                </li>
                <li>
                  <strong>Payment Information:</strong> Payment card details processed securely through our payment
                  gateway partner Paystack (we do not store full card details)
                </li>
              </ul>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
                <li>Process and complete money transfers to recipients</li>
                <li>Send transaction confirmations and receipts</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services and user experience</li>
                <li>Respond to customer support inquiries</li>
                <li>Send service-related notifications</li>
              </ul>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                We maintain your anonymity to recipients but may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
                <li>
                  <strong>Service Providers:</strong> Payment processors (Paystack), banking partners, and SMS
                  notification services necessary to complete transfers
                </li>
                <li>
                  <strong>Legal Obligations:</strong> Law enforcement, regulatory authorities, or courts when
                  required by law or to prevent fraud and illegal activities
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets,
                  your information may be transferred to the new entity
                </li>
              </ul>
              <p className="text-base leading-relaxed text-muted-foreground mt-4">
                <strong>Important:</strong> We never share your identity with transfer recipients. They receive
                only the funds and optional message without knowing who sent it.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We implement industry-standard security measures to protect your information including:
                encryption of sensitive data, secure payment processing, regular security audits, and restricted
                access to personal information. However, no method of transmission over the internet is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Object to processing of your information</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="text-base leading-relaxed text-muted-foreground mt-4">
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@prudens.com" className="text-primary hover:underline font-medium">
                  privacy@prudens.com
                </a>
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
                <li>Remember your preferences and settings</li>
                <li>Analyze usage patterns and improve our services</li>
                <li>Prevent fraud and enhance security</li>
                <li>Provide personalized user experience</li>
              </ul>
              <p className="text-base leading-relaxed text-muted-foreground mt-4">
                You can control cookies through your browser settings. Disabling cookies may affect certain
                features of our service.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We retain your information for as long as necessary to provide our services and comply with legal
                obligations. Transaction records are retained for a minimum of 7 years as required by Nigerian
                financial regulations. After this period, we securely delete or anonymize your information unless
                longer retention is required by law.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our services are primarily provided within Nigeria. However, some of our service providers may
                process data outside Nigeria. When we transfer data internationally, we ensure appropriate
                safeguards are in place to protect your information in accordance with applicable data protection
                laws.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Prudens is not intended for use by individuals under 18 years of age. We do not knowingly
                collect personal information from children. If we become aware that we have collected information
                from a child, we will take steps to delete it promptly.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal
                requirements. We will notify you of material changes by posting the updated policy on our website
                with a new "Last Updated" date. We encourage you to review this policy regularly.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-base leading-relaxed text-muted-foreground mt-4">
                Email:{" "}
                <a href="mailto:privacy@prudens.com" className="text-primary hover:underline font-medium">
                  privacy@prudens.com
                </a>
                <br />
                Support:{" "}
                <a href="mailto:support@prudens.com" className="text-primary hover:underline font-medium">
                  support@prudens.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  )
}
