import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import ClientThemeProvider from "@/components/ClientThemeProvider";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dataprism.app"),
  title: "Dataprism - Website Analytics Dashboard",
  description:
    "Join the waitlist for Dataprism, a powerful real-time analytics platform.",
  icons: {
    icon: { url: "/metadata_logo.svg" },
  },
  openGraph: {
    title: "Dataprism - Website Analytics Dashboard",
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
    title: "Dataprism - Website Analytics Dashboard",
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
        className={`${jetBrainsMono.className} antialiased`}
        suppressHydrationWarning
      >
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
