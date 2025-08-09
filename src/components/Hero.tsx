"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitted: boolean;
  joinedCount: number;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function Hero({
  email,
  setEmail,
  isSubmitted,
  joinedCount,
  handleSubmit,
}: HeroProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Image src="/logo2.png" alt="Hero Image" width={25} height={25} />
        <h1 className="text-3xl font-bold">dataprism</h1>
      </div>

      <div className="mb-12 mt-6">
        <div className="text-sm mb-4">
          <p className="font-bold">We built dataprism using dataprism.</p>
          <p className="text-gray-600">
            We think you'll like it as much as we do.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-3 max-w-md">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e: unknown) =>
                  setEmail(
                    (e as React.ChangeEvent<HTMLInputElement>).target.value
                  )
                }
                className="rounded-none flex-1 text-sm border-gray-300 focus:border-black focus:ring-black"
                required
              />
              <Button
                type="submit"
                className="rounded-none bg-black hover:bg-gray-800 text-white px-6 text-sm"
              >
                Join Waitlist <ArrowUpRight className="size-4" />
              </Button>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              {joinedCount.toLocaleString()} people waiting
            </p>
          </form>
        ) : (
          <div className="bg-black text-white px-6 py-3 rounded text-sm inline-block mb-4">
            ✓ You're on the waitlist!
          </div>
        )}
      </div>
    </div>
  );
}
