"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
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
  const { theme } = useTheme();

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
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div className="flex items-center gap-2" variants={item}>
        <Image
          src={mounted && theme === "dark" ? "/dark_logo.svg" : "/logo.svg"}
          alt="dataprism logo"
          width={25}
          height={25}
        />
        <h1 className="text-3xl font-bold text-foreground">dataprism</h1>
      </motion.div>

      <div className="mb-12 mt-6">
        <motion.div className="text-sm mb-4" variants={item}>
          <p className="font-bold">We built dataprism using dataprism.</p>
          <p className="text-muted-foreground">
            We think you&apos;ll like it as much as we do.
          </p>
        </motion.div>

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
            >
              <motion.div className="flex gap-3 max-w-md items-stretch" layout>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e: unknown) => {
                    setEmail(
                      (e as React.ChangeEvent<HTMLInputElement>).target.value
                    );
                    if (error) setError("");
                  }}
                  className="rounded-none flex-1 text-sm"
                  required
                  disabled={isLoading}
                />
                <motion.div
                  layoutId="waitlist-cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground px-6 text-sm cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "Join Waitlist"}{" "}
                    <ArrowUpRight className="size-4" />
                  </Button>
                </motion.div>
              </motion.div>
              {error && (
                <motion.p
                  className="text-red-500 text-sm mt-2"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  variants={item}
                >
                  {error}
                </motion.p>
              )}
              <motion.p
                className="text-muted-foreground text-sm mt-3"
                variants={item}
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
                className="relative inline-flex items-center gap-2  px-4 py-1.5 text-sm text-primary-foreground bg-primary"
                initial={false}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Check className="size-4" />
                <span>you&apos;re on the waitlist</span>
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
                  initial={{ scale: 0.6, opacity: 0.25 }}
                  animate={{ scale: 1.35, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary"
                  initial={{ scale: 0.5, opacity: 0.35 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                />
              </motion.div>
              <motion.p className="text-muted-foreground text-sm mt-3">
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
      </div>
    </motion.div>
  );
}
