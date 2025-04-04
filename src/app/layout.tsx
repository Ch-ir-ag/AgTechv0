import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daisy AI | Milk Yield Analytics",
  description: "Professional AgTech platform for dairy cooperative analytics and insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script id="reset-scroll-position">
        {`
          if (typeof window !== 'undefined') {
            // Set manual scroll restoration
            if ('scrollRestoration' in history) {
              history.scrollRestoration = 'manual';
            }
            
            // Reset scroll position on page load
            window.addEventListener('load', function() {
              window.scrollTo(0, 0);
            });
            
            // Force initial scroll position
            window.scrollTo(0, 0);
          }
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
