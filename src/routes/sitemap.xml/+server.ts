import { products } from '#lib/data';

export const prerender = true; 

export function GET() {
  const siteUrl = 'https://nexora-coffee.vercel.app'; 

  const staticPages = ['', '/about'];
  

  const productPages = products.map((p) => `/products/${p.id}`);
  
  const allPages = [...staticPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map((page) => `
        <url>
          <loc>${siteUrl}${page}</loc>
          <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `)
      .join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
}