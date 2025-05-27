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
    url: 'https://everestcuisineottawa.com/',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Everest Cuisine | Indo-Nepalese Restaurant & Sushi Bar',
    description: 'Authentic Indo-Nepalese cuisine and sushi in Ottawa',
    images: ['/meta-preview.jpg'],
    site: '@EverestCuisine', // Replace with your Twitter handle if available
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#0a2e1a" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a2e1a" media="(prefers-color-scheme: dark)" />
        <link rel="canonical" href="https://everestcuisineottawa.com/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Everest Cuisine",
            "image": "https://everestcuisineottawa.com/meta-preview.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1846 Carling Ave",
              "addressLocality": "Ottawa",
              "addressRegion": "ON",
              "postalCode": "K2A 1E2",
              "addressCountry": "CA"
            },
            "telephone": "613-963-4406",
            "url": "https://everestcuisineottawa.com"
          }
        `}</script>
        {/* Google Analytics GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JY03FJ7GH6"></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JY03FJ7GH6');
        `}</script>
      </head>
      <body className={`antialiased flex flex-col min-h-screen overflow-x-hidden`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}