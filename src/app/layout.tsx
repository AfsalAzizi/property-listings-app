import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxeList Dubai | Premium Real Estate Properties",
  description:
    "Discover luxury properties in Dubai. Browse our exclusive collection of high-end apartments, villas, and penthouses in prime locations across Dubai.",
  keywords: [
    "Dubai real estate",
    "luxury properties Dubai",
    "premium apartments",
    "luxury villas",
    "penthouses Dubai",
    "real estate investment",
    "property for sale Dubai",
  ].join(", "),
  openGraph: {
    title: "LuxeList Dubai | Premium Real Estate Properties",
    description:
      "Discover luxury properties in Dubai. Browse our exclusive collection of high-end apartments, villas, and penthouses in prime locations across Dubai.",
    type: "website",
    url: "https://luxelist.ae",
    images: [
      {
        url: "/images/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "LuxeList Dubai - Premium Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeList Dubai | Premium Real Estate Properties",
    description:
      "Discover luxury properties in Dubai. Browse our exclusive collection of high-end apartments, villas, and penthouses in prime locations across Dubai.",
    images: ["/images/og-image.jpg"], // You'll need to add this image
  },
  alternates: {
    canonical: "https://luxelist.ae",
  },
  other: {
    "application-name": "LuxeList Dubai",
    author: "LuxeList Dubai",
    category: "Real Estate",
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
