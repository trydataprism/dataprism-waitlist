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
      className="text-center max-w-lg mx-auto font-sans px-4 md:px-0"
    >
      <motion.div className="mb-6" variants={item}>
        {/* Waitlist banner */}
        <div className="inline-block bg-teal-400/20 rounded-lg px-2.5 py-1 mb-4">
          <p className="text-teal-400 font-mono text-xs font-bold tracking-wide">
            WAITLIST IS NOW OPEN
          </p>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
          Dataprism is launching soon.
        </h1>
        <p className="text-white/80 text-xs sm:text-sm leading-relaxed px-2 whitespace-nowrap">
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
                className="flex flex-row gap-3 max-w-sm items-stretch mx-auto"
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
                  className="rounded-lg flex-1 text-sm bg-gray-800 text-white placeholder-gray-400 border-0 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/40 focus:outline-none"
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
                    className="bg-white text-black px-4 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:brightness-107 transition-all duration-300"
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
                  key={`form-${joinedCount}-${mounted}`}
                  start={0}
                  end={joinedCount}
                  duration={2}
                  delay={0.5}
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
                className="relative inline-flex items-center gap-2 px-4 py-1.5 text-sm text-black bg-white rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <Check className="size-4 text-black" />
                </motion.div>
                <span>you&apos;re on the waitlist</span>
              </motion.div>
              <motion.p
                className="text-white/60 text-sm mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <CountUp
                  key={`success-${joinedCount}`}
                  start={joinedCount > 1 ? joinedCount - 1 : 0}
                  end={joinedCount}
                  duration={0.8}
                  delay={0.3}
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
