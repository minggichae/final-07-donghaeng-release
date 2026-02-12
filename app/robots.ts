import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://final-07-moa-release.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mypage/', '/chat/', '/meetings/add/', '/manage/', '/notifications/', '/bookmarks/', '/history/', '/login/', '/signup/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}