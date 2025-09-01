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
    // <div className="min-h-screen bg-background flex flex-col">
    //   <main className="flex-1 flex items-center justify-center">
    //     <motion.div
    //       className="max-w-6xl mx-auto px-6 py-12"
    //       initial={{ opacity: 0, y: 12 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    //     >
    //       <div className="flex gap-8 items-start">
    //         <motion.section
    //           className="flex-1"
    //           initial={{ opacity: 0, x: -12 }}
    //           whileInView={{ opacity: 1, x: 0 }}
    //           viewport={{ once: true, amount: 0.2 }}
    //           transition={{ duration: 0.5 }}
    //           aria-label="Hero and how it works section"
    //         >
    //           <Hero
    //             email={email}
    //             setEmail={setEmail}
    //             isSubmitted={isSubmitted}
    //             joinedCount={joinedCount}
    //             handleSubmit={handleSubmit}
    //             isLoading={isLoading}
    //             error={error}
    //             setError={setError}
    //             initialLoad={initialLoad}
    //           />
    //           <HowItWorks />
    //         </motion.section>
    //         <motion.div
    //           className="w-px bg-border self-stretch min-h-96"
    //           initial={{ opacity: 0 }}
    //           whileInView={{ opacity: 1 }}
    //           viewport={{ once: true }}
    //           transition={{ duration: 0.6 }}
    //           role="separator"
    //           aria-hidden="true"
    //         ></motion.div>
    //         <motion.section
    //           className="flex-1"
    //           initial={{ opacity: 0, x: 12 }}
    //           whileInView={{ opacity: 1, x: 0 }}
    //           viewport={{ once: true, amount: 0.2 }}
    //           transition={{ duration: 0.5 }}
    //           aria-label="Product roadmap section"
    //         >
    //           <Roadmap />
    //         </motion.section>
    //       </div>
    //     </motion.div>
    //   </main>
    //   <Footer />
    // </div>
    <div className="min-h-screen w-full bg-background flex justify-center items-center bg-black">
      <div className="flex items-start">
        <div className="w-px h-screen dashed-line text-foreground/10"></div>
        <div className="w-[50vw] flex flex-col">
          <div className="h-[50vh]">
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
          <div className="w-full h-px dashed-line-horizontal text-foreground/10"></div>
        </div>
        <div className="w-px h-screen dashed-line text-foreground/10"></div>
      </div>
    </div>
  );
}
