"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <div className="h-64 w-full" />,
});

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [joinedCount, setJoinedCount] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/waitlist/count");
        const data = await response.json();
        setJoinedCount(data.count);
        // Set initial load to false after a delay to allow animation
        setTimeout(() => setInitialLoad(false), 3000);
      } catch (error) {
        console.error("Error fetching count:", error);
        setJoinedCount(1247);
        setTimeout(() => setInitialLoad(false), 3000);
      }
    };
    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setJoinedCount(data.count);
        setEmail("");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          className="max-w-6xl mx-auto px-6 py-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex gap-8 items-start">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <Hero
                email={email}
                setEmail={setEmail}
                isSubmitted={isSubmitted}
                joinedCount={joinedCount}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
                setError={setError}
                initialLoad={initialLoad}
              />
              <HowItWorks />
            </motion.div>
            <motion.div
              className="w-px bg-border self-stretch min-h-96"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            ></motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <Roadmap />
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
