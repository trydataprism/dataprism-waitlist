"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Prism from "@/components/ui/prism";

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
  const { mounted } = useTheme();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/waitlist/count");
        const data = await response.json();
        setJoinedCount(data.count);
        // reduced delay to prevent long white screen
        setTimeout(() => setInitialLoad(false), 500);
      } catch (error) {
        console.error("Error fetching count:", error);
        setJoinedCount(1247);
        setTimeout(() => setInitialLoad(false), 500);
      }
    };

    if (mounted) {
      fetchCount();
    }
  }, [mounted]);

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
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // show loading state until theme is mounted
  if (!mounted) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col bg-black">
      {/* Üst çizgi */}

      {/* Ana içerik */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-start">
          {/* Sol çizgi */}
          <div className="w-px h-screen dashed-line text-foreground/10"></div>

          {/* Orta bölüm - Üçgen ve Hero */}
          <div className="w-[50vw] flex flex-col">
            {/* Üçgen bölümü */}
            <div className="h-[50vh] flex items-center justify-center">
              <Prism
                animationType="rotate"
                timeScale={0.5}
                height={3.5}
                baseWidth={5.5}
                scale={1.5}
                hueShift={0}
                colorFrequency={1}
                noise={0.5}
                glow={1}
              />
            </div>

            {/* Orta yatay çizgi */}
            <div className="w-full h-px dashed-line-horizontal text-foreground/10"></div>

            {/* Hero bileşeni - Waitlist formu */}
            <div className="h-[50vh] flex items-center justify-center mb-8">
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
            </div>
          </div>

          {/* Sağ çizgi */}
          <div className="w-px h-screen dashed-line text-foreground/10"></div>
        </div>
      </div>

      {/* Alt çizgi */}
      <div className="w-full h-px dashed-line-horizontal text-foreground/10"></div>
    </div>
  );
}
