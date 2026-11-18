import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DemoBanner from "../components/DemoBanner";

export const metadata: Metadata = {
  title: "CampusPulse (KampüsNabız) | Student Well-Being Check-in",
  description:
    "A voluntary daily emotional well-being check-in platform for university students. Interdisciplinary GLB300 course project.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-slate-800 selection:bg-violet-200 selection:text-violet-900 font-sans">
        <DemoBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
