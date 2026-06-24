import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

const routes: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl('/'),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: absoluteUrl('/services'),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: absoluteUrl('/about'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: absoluteUrl('/gallery'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: absoluteUrl('/contact'),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: absoluteUrl('/book-appointment'),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: absoluteUrl('/team'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: absoluteUrl('/packages'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: absoluteUrl('/reviews'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: absoluteUrl('/faqs'),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: absoluteUrl('/privacy-policy'),
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: absoluteUrl('/terms'),
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: absoluteUrl('/cancellation-policy'),
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes;
}
