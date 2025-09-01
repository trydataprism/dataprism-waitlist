"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import CountUp from "react-countup";

interface HeroProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitted: boolean;
  joinedCount: number;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
  setError: (error: string) => void;
  initialLoad: boolean;
}

export default function Hero({
  email,
  setEmail,
  isSubmitted,
  joinedCount,
  handleSubmit,
  isLoading,
  error,
  setError,
  initialLoad,
}: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="text-center max-w-md mx-auto"
    >
      <motion.div className="mb-6" variants={item}>
        {/* Waitlist banner */}
        <div className="inline-block bg-teal-400/20 border border-teal-400/30 rounded-lg px-4 py-2 mb-4 shadow-[0_0_20px_rgba(20,184,166,0.3)]">
          <p className="text-teal-400 font-mono text-sm font-bold tracking-wide drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]">
            WAITLIST IS NOW OPEN
          </p>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          Dataprism is launching soon.
        </h1>
        <p className="text-white/80 text-sm">
          Get on the waitlist and be among the first to get access to Dataprism.
        </p>
      </motion.div>

      <section aria-label="Waitlist signup">
        <AnimatePresence mode="popLayout" initial={false}>
          {!isSubmitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="mb-4"
              variants={item}
              initial={false}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              role="form"
              aria-label="Join Dataprism waitlist"
            >
              <motion.div
                className="flex gap-3 max-w-md items-stretch mx-auto"
                layout
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: unknown) => {
                    setEmail(
                      (e as React.ChangeEvent<HTMLInputElement>).target.value
                    );
                    if (error) setError("");
                  }}
                  className="rounded-lg flex-1 text-sm bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  required
                  disabled={isLoading}
                  aria-label="Email address"
                  aria-describedby={error ? "email-error" : "waitlist-count"}
                  aria-invalid={error ? "true" : "false"}
                />
                <motion.div
                  layoutId="waitlist-cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="rounded-lg bg-white hover:bg-white/90 text-black px-6 text-sm cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "Join now"}
                  </Button>
                </motion.div>
              </motion.div>
              {error && (
                <motion.p
                  id="email-error"
                  className="text-red-500 text-sm mt-2"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  variants={item}
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </motion.p>
              )}
              <motion.p
                id="waitlist-count"
                className="text-white/60 text-sm mt-3"
                variants={item}
                aria-live="polite"
              >
                <CountUp
                  key={`form-${joinedCount}-${initialLoad}`}
                  start={initialLoad ? 0 : joinedCount}
                  end={joinedCount}
                  duration={initialLoad ? 1.8 : 0}
                  delay={initialLoad ? 0.5 : 0}
                  separator=","
                  useEasing={true}
                />{" "}
                people waiting
              </motion.p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mb-4"
            >
              <motion.div
                layoutId="waitlist-cta"
                className="relative inline-flex items-center gap-2 px-4 py-1.5 text-sm text-black bg-white rounded-lg"
                initial={false}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Check className="size-4" />
                <span>you&apos;re on the waitlist</span>
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                  initial={{ scale: 0.6, opacity: 0.25 }}
                  animate={{ scale: 1.35, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
                  initial={{ scale: 0.5, opacity: 0.35 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                />
              </motion.div>
              <motion.p className="text-white/60 text-sm mt-3">
                <CountUp
                  key={`success-${joinedCount}`}
                  start={joinedCount > 0 ? joinedCount - 1 : 0}
                  end={joinedCount}
                  duration={0.8}
                  separator=","
                  useEasing={true}
                />{" "}
                people waiting
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}
