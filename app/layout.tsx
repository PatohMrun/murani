import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import CosmosBackground from "@/components/CosmosBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://murani.vercel.app'), // Replace with your actual domain
  title: {
    default: "Patrick Murani | Software Engineer & Creative",
    template: "%s | Patrick Murani"
  },
  description: "Senior Software Engineer, Graphic Designer, and Photographer based in Nairobi. Building elegant digital experiences.",
  keywords: ["Software Engineer", "Web Developer", "Graphic Designer", "Photographer", "Patrick Murani", "Nairobi", "React", "Next.js"],
  authors: [{ name: "Patrick Murani" }],
  creator: "Patrick Murani",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://murani.vercel.app",
    title: "Patrick Murani | Software Engineer & Creative",
    description: "Senior Software Engineer blending code, design, and photography to build immersive digital experiences.",
    siteName: "Patrick Murani Portfolio",
    images: [
      {
        url: "/Murani.jpg",
        width: 1200,
        height: 630,
        alt: "Patrick Murani - Software Engineer & Creative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Murani | Software Engineer & Creative",
    description: "Building specific digital experiences. Full-stack developer & UI/UX designer.",
    images: ["/Murani.jpg"],
    creator: "@mrunphotography",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" type="image/png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers>
          <CosmosBackground />
          <Navbar />
          <section className="">
            {children}
            <WhatsApp />
          </section>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
