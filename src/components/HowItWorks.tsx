"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="mb-12"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h3
        className="text-lg font-bold mb-6 text-[#1E1E1E]"
        variants={item}
      >
        How_it_works
      </motion.h3>
      <div className="space-y-4 text-sm">
        <motion.div variants={item}>
          <span className="font-bold text-[#1E1E1E]">1. Add your site.</span>
          <br />
          <span className="text-gray-600 ml-4">
            dataprism tracks it and sends analytics to your dashboard.
          </span>
        </motion.div>
        <motion.div variants={item}>
          <span className="font-bold text-[#1E1E1E]">2. Monitor visitors.</span>
          <br />
          <span className="text-gray-600 ml-4">
            Each visitor gets you real-time data in an isolated workspace.
          </span>
        </motion.div>
        <motion.div variants={item}>
          <span className="font-bold text-[#1E1E1E]">3. Get insights.</span>
          <br />
          <span className="text-gray-600 ml-4">
            See who's browsing, what needs attention, and review performance.
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
