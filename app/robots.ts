import { web_site } from '@/helper/consts';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${web_site}/sitemap.xml`,
  };
}
