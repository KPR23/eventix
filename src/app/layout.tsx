import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Climate_Crisis, Geist, Geist_Mono } from "next/font/google";
import ConvexClientProvider from "@/components/ConvexProviderWithClerk";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const climateCrisis = Climate_Crisis({
  variable: "--font-climate-crisis",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventix",
  description: "Buy tickets to concerts and events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${climateCrisis.variable} dark font-sans antialiased`}
      >
        <ClerkProvider
          // Development
          appearance={{
            layout: { unsafe_disableDevelopmentModeWarnings: true },
          }}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
