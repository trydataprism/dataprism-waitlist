"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}