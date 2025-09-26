import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SideBar from "@/components/sideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SoundverseAI - Build DNA",
  description: "Build a DNA on Soundverse and earn passive income as your DNA is used by other creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="flex flex-row h-screen">
          <SideBar />
          <div className="flex-1 lg:ml-0 ml-0">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
