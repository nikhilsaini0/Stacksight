import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StackSight AI — AI Spend Audit & Optimization",
    template: "%s | StackSight AI",
  },
  description:
    "Audit your team's AI tool subscriptions and find instant savings. Most startups overspend 20-40% on AI tools like ChatGPT, Cursor, Claude, and Copilot.",
  keywords: [
    "AI spend audit",
    "AI cost optimization",
    "ChatGPT savings",
    "Cursor pricing",
    "Claude pricing",
    "AI tools comparison",
    "startup AI budget",
  ],
  openGraph: {
    title: "StackSight AI — Stop Overpaying for AI Tools",
    description:
      "Free AI spend audit for startups. Find savings across ChatGPT, Cursor, Claude, Copilot & more.",
    siteName: "StackSight AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackSight AI — AI Spend Audit",
    description:
      "Free AI spend audit for startups. Find savings across ChatGPT, Cursor, Claude, Copilot & more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
