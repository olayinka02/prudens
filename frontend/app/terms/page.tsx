"use client"

import Header from "../app-components/header"
import FooterSection from "../app-components/footer"

export default function TermsPage() {
  return (
    <>
      <Header type="full" />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 md:px-10">
          {/* Header */}
          <div className="mb-12 text-left">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Terms of Use
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              Welcome to <strong>AnonSend</strong>. These Terms of Use govern your access to and use of our
              anonymous money transfer services. By using AnonSend, you agree to be bound by these terms.
            </p>

            <hr className="my-8 border-t border-border" />

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Eligibility</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                To use AnonSend, you must meet the following requirements:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
                <li>Be at least 18 years of age or the legal age of majority in your jurisdiction</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be prohibited from using financial services under Nigerian law or international sanctions</li>
                <li>Provide accurate and truthful information when using our services</li>
              </ul>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Use of Our Services</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                <strong>AnonSend</strong> provides anonymous money transfer services within Nigeria. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
                <li>Use the service only for lawful purposes</li>
                <li>Not use the service for money laundering, fraud, or any illegal activity</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Ensure recipient bank details are accurate before submitting transfers</li>
                <li>Accept that transfers are final and cannot be reversed once processed</li>
              </ul>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Prohibited Activities</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                You may not use AnonSend to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
                <li>Engage in fraudulent, illegal, or deceptive activities</li>
                <li>Send funds obtained through illegal means</li>
                <li>Circumvent anti-money laundering or counter-terrorism financing regulations</li>
                <li>Harass, threaten, or harm others through the service</li>
                <li>Interfere with or disrupt the operation of our platform</li>
                <li>Attempt to gain unauthorized access to our systems or data</li>
              </ul>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Payment and Fees</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                All payments are processed through our secure payment gateway partner, <strong>Paystack</strong>.
                Transaction fees, if any, will be clearly displayed before you confirm your transfer. All payments
                are final and non-refundable except in cases of technical error or service failure on our part.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Privacy and Anonymity</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We are committed to protecting your anonymity. Your personal information will not be shared with
                recipients. However, we may collect and process certain data to comply with legal obligations,
                prevent fraud, and improve our services. Please refer to our Privacy Policy for detailed information.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                All content, trademarks, logos, and intellectual property on the AnonSend platform are owned by
                or licensed to us. You may not reproduce, distribute, modify, or create derivative works without
                our express written permission.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Third-Party Services</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We integrate with third-party services including payment processors and banking systems. We are
                not responsible for the availability, accuracy, or reliability of these third-party services.
                Your use of third-party services is governed by their respective terms and policies.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Warranties and Disclaimers</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                AnonSend is provided "as is" without warranties of any kind, either express or implied. We do
                not guarantee uninterrupted, error-free, or secure service. While we strive to ensure accurate
                and timely transfers, we cannot guarantee specific delivery times or outcomes.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                To the maximum extent permitted by law, AnonSend shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your use of the service. Our total liability
                shall not exceed the amount of the transaction in question.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Suspension and Termination</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                We reserve the right to suspend or terminate your access to AnonSend at any time if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
                <li>You violate these Terms of Use</li>
                <li>We suspect fraudulent or illegal activity</li>
                <li>Required by law or regulatory authorities</li>
                <li>Your actions pose a risk to other users or our platform</li>
              </ul>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                These Terms of Use shall be governed by and construed in accordance with the laws of the
                <strong> Federal Republic of Nigeria</strong>. Any disputes arising from these terms shall be
                subject to the exclusive jurisdiction of Nigerian courts.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We may update these Terms of Use from time to time. We will notify users of material changes
                by posting the updated terms on our website with a new "Last Updated" date. Your continued use
                of AnonSend after changes become effective constitutes acceptance of the revised terms.
              </p>
            </section>

            <hr className="my-8 border-t border-border" />

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                If you have questions about these Terms of Use, please contact us at{" "}
                <a href="mailto:support@anonsend.com" className="text-primary hover:underline font-medium">
                  support@anonsend.com
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
