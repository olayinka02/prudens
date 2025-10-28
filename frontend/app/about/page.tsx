"use client";

import { useRef } from "react";
import Link from "next/link";
import { Shield, Zap, Lock, Users, HeartHandshake, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../app-components/header";
import FooterSection from "../app-components/footer";
import ContactSection from "../app-components/contactSection";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "100% Anonymous",
    description:
      "Your identity is completely protected. Recipients never know who sent the money.",
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description:
      "Funds are transferred immediately after payment confirmation. No delays.",
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description:
      "We use industry-standard encryption and secure payment gateways.",
  },
  {
    icon: Users,
    title: "No Account Needed",
    description:
      "Recipients don't need to sign up or create an account to receive funds.",
  },
  {
    icon: HeartHandshake,
    title: "Optional Messages",
    description:
      "Include a personal note with your transfer while staying anonymous.",
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description:
      "Advanced monitoring and verification to ensure safe transactions.",
  },
];

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Enter Recipient Details",
    description:
      "Provide the recipient's bank details, amount, and optional personal message.",
  },
  {
    number: 2,
    title: "Make Secure Payment",
    description:
      "Complete payment through our secure gateway. Your payment info is encrypted.",
  },
  {
    number: 3,
    title: "We Transfer Anonymously",
    description:
      "We send the money to the recipient's account with no trace back to you.",
  },
  {
    number: 4,
    title: "Recipient Gets Notified",
    description:
      "They receive an SMS notification about the transfer and your optional message.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Transform vertical scroll to horizontal movement
  // Each step is 50vw wide, so we need to move by 50% per step
  const x = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    ["0%", "0%", `-${(steps.length - 2) * 80}%`, `-${(steps.length - 2) * 80}%`]
  );

  // Progress line animation (0 to 100% of total line width)
  const lineProgress = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <>
      <Header type="full" />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 md:px-16">
          {/* Hero Section */}
          <div className="mb-8 md:mb-20">
            <p className="mb-4 text-[0.82rem] font-medium text-primary">
              We are AnonSend
            </p>

            <div className="grid gap-4 md:gap-12 grid-cols-1 lg:grid-cols-5 lg:gap-16">
              {/* Left Column - Text */}
              <div className="col-span-1 md:col-span-3">
                <h1 className=" text-4xl font-bold tracking-tight md:text-4xl lg:text-4xl">
                  We set out to build{" "}
                  <span className="text-muted-foreground">
                    a better way to send money anonymously
                  </span>
                </h1>
              </div>

              {/* Right Column - Description */}
              <div className="flex col-span-1 md:col-span-2 items-end lg:items-start ">
                <p className="max-w-md text-[0.8rem] text-muted-foreground md:text-[0.8rem] leading-relaxed">
                  We’re reshaping the future of anonymous money transfers,
                  empowering senders and recipients with absolute privacy,
                  instant speed, and total security
                </p>
              </div>
            </div>

            {/* Images Grid */}
            <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-5">
              {/* Image 1 - People celebrating */}
              <div className="relative col-span-1 md:col-span-3 h-[250px] md:h-[300px] overflow-hidden shadow-md bg-white [clip-path:polygon(20%_0%,80%_0%,100%_0%,100%_80%,80%_100%,20%_100%,0_100%,0_0%)]">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2532&auto=format&fit=crop"
                  alt="People celebrating financial success"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Image 2 - Secure transfer */}
              <div className="relative col-span-1 md:col-span-2 h-[250px] md:h-[300px] overflow-hidden shadow-md bg-white [clip-path:polygon(20%_0%,80%_0%,100%_0%,100%_80%,80%_100%,20%_100%,0_100%,0_0%)]">
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop"
                  alt="Secure money transfer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-20 rounded-sm bg-gradient-to-br from-primary/10 to-primary/5 p-8 md:p-8">
            <div className="grid gap-4 md:gap-12 grid-cols-1 lg:grid-cols-5 lg:gap-16">
              {/* Left Column - Text */}
              <div className="col-span-1 md:col-span-2">
                <h1 className=" text-4xl font-bold tracking-tight md:text-5xl lg:text-5xl">
                  Our <span className="text-muted-foreground">mission</span>
                </h1>
              </div>

              {/* Right Column - Description */}
              <div className="flex col-span-1 md:col-span-3 items-end lg:items-start ">
                <p className="w-full text-[0.8rem] text-muted-foreground md:text-[0.8rem] leading-relaxed">
                  To provide a safe, secure, and private way for people to
                  support others financially without the pressure of revealing
                  their identity. We believe in the power of anonymous giving
                  and want to make it accessible to everyone.{" "}
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="mb-12 text-start text-3xl font-bold">
              Why Choose AnonSend?
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-2 text-[0.88rem] font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-[0.76rem]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works - Horizontal Scroll */}
          <div
            ref={containerRef}
            className="relative hidden md:block"
            style={{ height: `${steps.length * 60}vh` }}
          >
            <div className="sticky top-0 h-[80vh] flex items-center overflow-hidden">
              <div className="w-full px-4 md:px-16">
                <h2 className="mb-12 text-left text-4xl font-bold">
                  How It Works
                </h2>

                {/* Container for steps and lines */}
                <div className="relative">
                  {/* Static connecting line (background) */}
                  <div className="absolute top-8 left-8 right-0 h-0.5 bg-primary/20 z-0"
                       style={{ width: `calc(${(steps.length - 1) * 50}vw - 8rem)` }} />

                  {/* Animated progress line */}
                  <motion.div
                    className="absolute top-8 left-8 h-0.5 bg-primary z-0"
                    style={{
                      width: lineProgress,
                      maxWidth: `calc(${(steps.length - 1) * 50}vw - 8rem)`
                    }}
                  />

                  {/* Steps */}
                  <motion.div style={{ x }} className="flex">
                    {steps.map((step, index) => (
                      <div
                        key={step.number}
                        className="flex items-start justify-start relative"
                        style={{ minWidth: '50vw', maxWidth: '50vw' }}
                      >
                        <div className="w-full pr-8">
                          <div className="flex flex-col items-start text-left space-y-6">
                            {/* Step Number */}
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground relative z-10 shadow-lg">
                              {step.number}
                            </div>

                            {/* Step Content */}
                            <div className="max-w-md">
                              <h3 className="mb-2 text-2xl font-bold">
                                {step.title}
                              </h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>


          <div className="block md:hidden mb-12">

             <h2 className="mb-10 text-left text-4xl font-bold">
                  How It Works
                </h2>

         {steps.map((step, index) => (
                      <div
                        key={step.number}
                        className="flex items-start justify-start w-full gap-2 mb-6"
                        
                      >
                        <div className="w-full ">
                          <div className="flex flex-col items-start text-left space-y-6">
                            {/* Step Number */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground relative z-10 shadow-lg">
                              {step.number}
                            </div>

                            {/* Step Content */}
                            <div className="max-w-md">
                              <h3 className="mb-2 text-2xl font-bold">
                                {step.title}
                              </h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
          </div>

          



          {/* CTA Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
            <div className="col-span-1 mt-12 md:mt-0">
              <h2 className="mb-3 text-5xl font-bold">
                Ready to Send <br /> Money Anonymously?
              </h2>
              <p className="mb-4 text-[0.8rem] opacity-90">
                Join thousands who trust AnonSend for their anonymous transfers.
              </p>
              <Link href="/send">
                <Button size="sm" variant="secondary">
                  <span className=" text-[0.78rem] font-medium">
                    Send Money Now
                  </span>
                </Button>
              </Link>
            </div>

            <div className="col-span-1">
              <div className="relative col-span-1 md:col-span-2 h-[250px] md:h-[300px] overflow-hidden shadow-md bg-white [clip-path:polygon(20%_0%,80%_0%,100%_0%,100%_80%,80%_100%,20%_100%,0_100%,0_0%)]">
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop"
                  alt="Secure money transfer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="w-full ">
        <ContactSection />
      </div>

      <br />
      <br />

      <FooterSection />
    </>
  );
}
