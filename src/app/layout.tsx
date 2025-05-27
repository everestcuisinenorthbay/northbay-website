import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@fontsource/libre-baskerville/400.css";
import "@fontsource/libre-baskerville/400-italic.css";
import "@fontsource/libre-baskerville/700.css";

export const metadata: Metadata = {
  title: "Everest Cuisine | Indo-Nepalese Restaurant & Sushi Bar",
  description: "Experience authentic Indo-Nepalese cuisine and sushi at Everest Cuisine in Ottawa. Fresh ingredients, traditional recipes, and a warm atmosphere.",
  keywords: "Everest Cuisine, Nepali food, Indian restaurant, Sushi bar, Ottawa restaurant, Momo, Nepali cuisine, Indo-Nepalese food",
  authors: [{ name: "Everest Cuisine Restaurant" }],
  icons: {
    icon: [
      '/favicon.ico',
      '/favicon/favicon-96x96.png',
      '/favicon/favicon.svg',
    ],
    apple: '/favicon/apple-touch-icon.png',
    shortcut: '/favicon.ico',
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
      { rel: 'icon', url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { rel: 'icon', url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'icon', url: '/favicon/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  },
  openGraph: {
    type: 'website',
    title: 'Everest Cuisine | Indo-Nepalese Restaurant & Sushi Bar',
    description: 'Authentic Indo-Nepalese cuisine and sushi in Ottawa',
    siteName: 'Everest Cuisine',
    url: 'https://everest-website-dusky.vercel.app/',
    images: [
      {
        url: '/meta-preview.jpg',
        width: 1200,
        height: 627,
        alt: 'Everest Cuisine - Authentic Indo-Nepalese Restaurant & Sushi Bar',
      }
    ],
  },
  other: {
    'fb:app_id': '', // Add your Facebook App ID here if available
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
        className={`antialiased flex flex-col min-h-screen overflow-x-hidden`}
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