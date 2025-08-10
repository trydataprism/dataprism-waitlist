"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // immediately set mounted to true to prevent hydration mismatch
    setMounted(true);

    // get theme from localStorage or system preference
    const stored = localStorage.getItem("theme") as Theme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (stored) {
      setTheme(stored);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Create overlay element for transition animation
    const overlay = document.createElement("div");
    overlay.className = "theme-transition-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${
        newTheme === "dark" ? "oklch(0.145 0 0)" : "oklch(1 0 0)"
      };
      z-index: 9999;
      transform: translateY(-100%);
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    `;

    document.body.appendChild(overlay);

    // Start animation
    requestAnimationFrame(() => {
      overlay.style.transform = "translateY(0%)";
    });

    // Change theme at halfway point
    setTimeout(() => {
      setTheme(newTheme);
    }, 250);

    // Complete animation and cleanup
    setTimeout(() => {
      overlay.style.transform = "translateY(100%)";
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 500);
    }, 250);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
