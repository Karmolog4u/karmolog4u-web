import type { MetadataRoute } from 'next';
import { web_site } from '@/helper/consts';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: web_site,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
