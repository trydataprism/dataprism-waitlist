"use client";

import { motion } from "framer-motion";

export default function Roadmap() {
  const roadmapItems = [
    {
      title: "Waitlist",
      description: "Early access signup system for product launch",
      status: "completed",
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Live visitor tracking with instant data updates",
      status: "in_progress",
    },
    {
      title: "Advanced User Segmentation",
      description: "Group visitors by behavior and demographics",
      status: "not_started",
    },
    {
      title: "Custom Event Tracking",
      description: "Track specific actions and conversions",
      status: "not_started",
    },
    {
      title: "AI-Powered Insights",
      description: "Automated recommendations and predictions",
      status: "not_started",
    },
  ];

  const getStatusStyle = (status: string) => {
    if (status === "completed") {
      return "w-2 h-2 bg-green-500 rounded-full";
    }
    if (status === "in_progress") {
      return "w-2 h-2 bg-blue-500 rounded-sm";
    }
    return "w-2 h-2 bg-gray-400 rounded-full";
  };

  const getStatusTextColor = (status: string) => {
    if (status === "completed") {
      return "text-green-600";
    }
    if (status === "in_progress") {
      return "text-blue-500";
    }
    return "text-gray-500";
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <motion.section
      className="mb-12"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      aria-label="Product development roadmap"
    >
      <motion.h2
        className="text-lg font-bold mb-6 text-foreground"
        variants={itemVariant}
      >
        Roadmap
      </motion.h2>
      <ul className="space-y-4 text-sm list-none">
        {roadmapItems.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-3"
            variants={itemVariant}
          >
            <motion.div
              className={`${getStatusStyle(item.status)} flex-shrink-0 mt-1.5`}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
              role="img"
              aria-label={`Status: ${item.status.replace("_", " ")}`}
            />
            <div>
              <h3 className="font-bold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground ml-0">
                {item.description}
              </p>
              <span
                className={`text-xs capitalize ${getStatusTextColor(
                  item.status
                )}`}
              >
                {item.status.replace("_", " ")}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
