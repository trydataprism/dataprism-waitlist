"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [joinedCount, setJoinedCount] = useState(1247);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setJoinedCount((prev) => prev + 1);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
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
              />
              <HowItWorks />
            </motion.div>
            <motion.div
              className="w-px bg-gray-200 self-stretch min-h-96"
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
