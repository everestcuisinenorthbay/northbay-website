import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://everestcuisineottawa.com';
  const pages = [
    '',
    'menu',
    'about-us',
    'contact',
    'blog',
    'book-table',
  ];

  const urls = pages.map(
    (page) =>
      `<url><loc>${baseUrl}/${page}</loc><changefreq>weekly</changefreq><priority>${page === '' ? '1.0' : '0.8'}</priority></url>`
  ).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 