import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dataprism.app"),
  title: "Dataprism | Waitlist",
  description:
    "Join the waitlist for Dataprism, a powerful real-time analytics platform.",
  icons: {
    icon: { url: "/metadata_logo.svg" },
  },
  openGraph: {
    title: "Dataprism | Waitlist",
    description:
      "Join the waitlist for Dataprism, a powerful real-time analytics platform.",
    type: "website",
    images: [
      {
        url: "/x.jpg",
        width: 1200,
        height: 630,
        alt: "Dataprism - Website Analytics Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dataprism | Waitlist",
    description:
      "Join the waitlist for Dataprism, a powerful real-time analytics platform.",
    images: ["/x.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Analytics />
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
