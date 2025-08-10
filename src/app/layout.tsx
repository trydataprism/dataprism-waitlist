import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import ClientThemeProvider from "@/components/ClientThemeProvider";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dataprism - Website Analytics Dashboard",
  description:
    "Join the waitlist for Dataprism, a powerful real-time analytics platform.",
  icons: {
    icon: "/dark_logo.svg",
  },
  openGraph: {
    title: "Dataprism - Website Analytics Dashboard",
    description:
      "Join the waitlist for Dataprism, a powerful real-time analytics platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dataprism - Website Analytics Dashboard",
    description:
      "Join the waitlist for Dataprism, a powerful real-time analytics platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.className} antialiased`}>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
