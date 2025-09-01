"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Prism from "@/components/ui/prism";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Roadmap() {
  const { mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background bg-black flex items-center justify-center">
      <div className="flex flex-col h-screen pt-6 pb-6">
        {/* Üst çizgi */}
        <div
          className="h-px dashed-line-horizontal text-foreground/10"
          style={{ width: "calc(50vw + 2px)" }}
        ></div>

        {/* Ana içerik ve çizgiler */}
        <div className="flex-1 flex">
          {/* Sol çizgi */}
          <div className="w-px dashed-line text-foreground/10"></div>

          {/* Orta bölüm - Üçgen ve içerik iç içe */}
          <div className="w-[50vw] flex items-center justify-center relative">
            {/* Back button */}
            <Link
              href="/"
              className="absolute top-6 left-6 z-20 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </Link>
            {/* Üçgen bölümü - arka planda */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <Prism
                animationType="rotate"
                timeScale={0.3}
                height={3.5}
                baseWidth={5.5}
                scale={1.5}
                hueShift={0}
                colorFrequency={1}
                noise={0.3}
                glow={0.8}
                suspendWhenOffscreen={true}
              />
            </div>

            {/* İçerik - ön planda */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-xl mx-auto font-sans"
              >
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div
                    className="inline-block bg-teal-400/20 rounded-lg px-3 py-1.5 mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <p className="text-teal-400 font-mono text-xs font-bold tracking-wide">
                      BUILDING THE FUTURE OF DATA
                    </p>
                  </motion.div>

                  <h1 className="text-4xl font-bold text-white mb-6">
                    Roadmap
                  </h1>
                  <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                    <p>
                      We're building Dataprism with transparency and your
                      feedback in mind. Here's what we're working on and what's
                      coming next.
                    </p>
                    <div className="flex gap-8 mt-6 justify-center">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          <span className="text-white font-medium">
                            Waitlist & Early Access
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span className="text-white font-medium">
                            Real-time Dashboard
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span className="text-white font-medium">
                            Advanced User Segmentation
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-white font-medium">
                            Custom Event Tracking
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-white font-medium">
                            AI-Powered Insights
                          </span>
                        </div>
                      </div>

                      <div className="w-px bg-white/10"></div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-white font-medium">
                            Team Collaboration
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-white font-medium">
                            API Integration
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-white font-medium">
                            White-label Solutions
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-white font-medium">
                            Mobile App
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-white font-medium">
                            Enterprise Features
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Sağ çizgi */}
          <div className="w-px dashed-line text-foreground/10"></div>
        </div>

        {/* Alt çizgi ve Footer */}
        <div className="flex">
          {/* Sol çizgi devamı */}
          <div className="w-px dashed-line text-foreground/10"></div>

          {/* Footer alanı */}
          <div className="w-[50vw] relative">
            <div className="h-px dashed-line-horizontal text-foreground/10 w-full"></div>
            <div className="flex justify-center mt-2">
              <Footer />
            </div>
            <div className="h-px dashed-line-horizontal text-foreground/10 w-full mt-2"></div>
          </div>

          {/* Sağ çizgi devamı */}
          <div className="w-px dashed-line text-foreground/10"></div>
        </div>
      </div>
    </div>
  );
}
