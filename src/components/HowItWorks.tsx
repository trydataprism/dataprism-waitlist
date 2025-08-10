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
    <motion.section
      className="mb-12"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      aria-label="How DataPrism works"
    >
      <motion.h2
        className="text-lg font-bold mb-6 text-foreground"
        variants={item}
      >
        How_it_works
      </motion.h2>
      <ol className="space-y-4 text-sm list-none">
        <motion.li variants={item}>
          <span className="font-bold text-foreground">1. Add your site.</span>
          <br />
          <span className="text-muted-foreground ml-4">
            dataprism tracks it and sends analytics to your dashboard.
          </span>
        </motion.li>
        <motion.li variants={item}>
          <span className="font-bold text-foreground">2. Monitor visitors.</span>
          <br />
          <span className="text-muted-foreground ml-4">
            Each visitor gets you real-time data in an isolated workspace.
          </span>
        </motion.li>
        <motion.li variants={item}>
          <span className="font-bold text-foreground">3. Get insights.</span>
          <br />
          <span className="text-muted-foreground ml-4">
            See who&apos;s browsing, what needs attention, and review performance.
          </span>
        </motion.li>
      </ol>
    </motion.section>
  );
}
