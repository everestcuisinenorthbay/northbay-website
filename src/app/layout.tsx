import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Everest Cuisine | Indo-Nepalese Restaurant & Sushi Bar",
  description: "Experience authentic Indo-Nepalese cuisine and sushi at Everest Cuisine in Ottawa. Fresh ingredients, traditional recipes, and a warm atmosphere.",
  keywords: "Everest Cuisine, Nepali food, Indian restaurant, Sushi bar, Ottawa restaurant, Momo, Nepali cuisine, Indo-Nepalese food",
  authors: [{ name: "Everest Cuisine Restaurant" }],
  openGraph: {
    type: 'website',
    title: 'Everest Cuisine | Indo-Nepalese Restaurant & Sushi Bar',
    description: 'Authentic Indo-Nepalese cuisine and sushi in Ottawa',
    siteName: 'Everest Cuisine',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body
        className={`${rubik.variable} font-rubik antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
