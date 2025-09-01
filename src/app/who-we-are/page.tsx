"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Prism from "@/components/ui/prism";

export default function WhoWeAre() {
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
                className="text-center max-w-lg mx-auto font-sans"
              >
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h1 className="text-4xl font-bold text-white mb-6">
                    Who We Are
                  </h1>
                  <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                    <p>
                      We are a team of data scientists, engineers, and designers passionate 
                      about making data analysis accessible to everyone.
                    </p>
                    <p>
                      Dataprism is built on the belief that powerful data insights shouldn't 
                      require complex tools or extensive technical knowledge.
                    </p>
                    <p>
                      Our mission is to democratize data visualization and analysis, 
                      empowering teams to make better decisions through intuitive, 
                      beautiful data experiences.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="inline-block bg-teal-400/20 rounded-lg px-3 py-1.5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <p className="text-teal-400 font-mono text-xs font-bold tracking-wide">
                    BUILDING THE FUTURE OF DATA
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Sağ çizgi */}
          <div className="w-px dashed-line text-foreground/10"></div>
        </div>

        {/* Alt çizgi */}
        <div className="flex">
          {/* Sol çizgi devamı */}
          <div className="w-px dashed-line text-foreground/10"></div>
          
          {/* Alt çizgi */}
          <div className="w-[50vw] relative">
            <div className="h-px dashed-line-horizontal text-foreground/10 w-full"></div>
          </div>
          
          {/* Sağ çizgi devamı */}
          <div className="w-px dashed-line text-foreground/10"></div>
        </div>
      </div>
    </div>
  );
}