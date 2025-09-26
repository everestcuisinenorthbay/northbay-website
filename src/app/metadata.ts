import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Everest Cuisine | Indo-Nepalese Restaurant in North Bay',
  description:
    'Experience authentic Indo-Nepalese cuisine at Everest Cuisine in North Bay. Fresh ingredients, traditional recipes, and a warm atmosphere.',
  openGraph: {
    title: 'Everest Cuisine | Indo-Nepalese Restaurant in North Bay',
    description: 'Authentic Indo-Nepalese cuisine in North Bay',
    url: 'https://everestcuisinenorthbay.com/',
    siteName: 'Everest Cuisine',
    images: [
      {
        url: '/meta-preview.jpg',
        width: 1200,
        height: 627,
        alt: 'Everest Cuisine - Authentic Indo-Nepalese Restaurant',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Everest Cuisine | Indo-Nepalese Restaurant in North Bay',
    description: 'Authentic Indo-Nepalese cuisine in North Bay',
    images: ['/meta-preview.jpg'],
  },
}


