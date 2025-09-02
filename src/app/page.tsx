"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen w-full bg-background bg-black flex items-center justify-center">
      <div className="flex flex-col h-screen pt-6 pb-6 max-w-screen-2xl mx-auto">
        {/* Üst çizgi */}
        <div
          className="h-px dashed-line-horizontal text-foreground/10 md:block hidden"
          style={{ width: "calc(50vw + 2px)" }}
        ></div>

        {/* Ana içerik ve çizgiler */}
        <div className="flex-1 flex">
          {/* Sol çizgi - sadece desktop */}
          <div className="w-px dashed-line text-foreground/10 md:block hidden"></div>

          {/* Orta bölüm - Üçgen ve Hero iç içe */}
          <div className="w-full md:w-[50vw] flex items-center justify-center relative px-4 md:px-0">
            {/* Üçgen bölümü - arka planda */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 md:opacity-30">
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

            {/* Hero bileşeni - ön planda */}
            <div className="relative z-10 w-full">
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

          {/* Sağ çizgi - sadece desktop */}
          <div className="w-px dashed-line text-foreground/10 md:block hidden"></div>
        </div>

        {/* Alt çizgi ve Footer - sol ve sağ çizgilerle birlikte */}
        <div className="flex">
          {/* Sol çizgi devamı - sadece desktop */}
          <div className="w-px dashed-line text-foreground/10 md:block hidden"></div>

          {/* Footer alanı */}
          <div className="w-full md:w-[50vw] relative px-4 md:px-0">
            <div className="h-px dashed-line-horizontal text-foreground/10 w-full md:block hidden"></div>
            <div className="flex justify-center mt-2">
              <Footer />
            </div>
            <div className="h-px dashed-line-horizontal text-foreground/10 w-full mt-2 md:block hidden"></div>
          </div>

          {/* Sağ çizgi devamı - sadece desktop */}
          <div className="w-px dashed-line text-foreground/10 md:block hidden"></div>
        </div>
      </div>
    </div>
  );
}
