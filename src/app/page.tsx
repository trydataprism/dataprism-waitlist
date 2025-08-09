"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

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
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex gap-8 items-start">
            <div className="flex-1">
              <Hero
                email={email}
                setEmail={setEmail}
                isSubmitted={isSubmitted}
                joinedCount={joinedCount}
                handleSubmit={handleSubmit}
              />
              <HowItWorks />
            </div>
            <div className="w-px bg-gray-200 self-stretch min-h-96"></div>
            <div className="flex-1">
              <Roadmap />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
