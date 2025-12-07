import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import {
  Climate_Crisis,
  Inter,
  Poppins,
  Zalando_Sans_Expanded,
} from "next/font/google";
import ConvexClientProvider from "@/components/ConvexProviderWithClerk";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const zalandoSansExpanded = Zalando_Sans_Expanded({
  variable: "--font-zalando-sans-expanded",
  subsets: ["latin"],
  fallback: ["Inter"],
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
        className={`${inter.variable} ${poppins.variable} ${climateCrisis.variable} ${zalandoSansExpanded.variable} dark font-sans antialiased`}
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
