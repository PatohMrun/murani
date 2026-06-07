import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://murani.signiqe.com"),
  title: {
    default: "Patrick Murani | Software Engineer & Creative",
    template: "%s | Patrick Murani",
  },
  description:
    "Senior Software Engineer, Graphic Designer, and Photographer based in Nairobi. Building elegant digital experiences.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "Graphic Designer",
    "Photographer",
    "Patrick Murani",
    "Nairobi",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Patrick Murani" }],
  creator: "Patrick Murani",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://murani.signiqe.com",
    title: "Patrick Murani | Software Engineer & Creative",
    description:
      "Senior Software Engineer blending code, design, and photography to build immersive digital experiences.",
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
    description:
      "Building specific digital experiences. Full-stack developer & UI/UX designer.",
    images: ["/Murani.jpg"],
    creator: "@mrunphotography",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Patrick Murani',
              url: 'https://murani.signiqe.com',
              jobTitle: 'Software Engineer',
              description: 'Senior Software Engineer, Graphic Designer, and Photographer based in Nairobi.',
              image: 'https://murani.signiqe.com/Murani.jpg',
              email: 'patrickmurani@gmail.com',
              sameAs: [
                'https://github.com/PatohMrun',
                'https://www.linkedin.com/in/patrick-murani',
                'https://twitter.com/mrunphotography',
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
