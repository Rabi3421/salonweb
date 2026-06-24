import type { FAQItem, PublicSiteData, ServiceItem } from '@/types/public-site';
import { absoluteUrl } from '@/lib/seo';

type BreadcrumbItem = {
  name: string;
  path: string;
};

function getSalonIdentity(data: PublicSiteData) {
  return {
    '@type': 'BeautySalon',
    name: data.brand.fullName,
    url: absoluteUrl('/'),
    telephone: data.contact.phone,
    email: data.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.contact.address,
      addressLocality: data.contact.city,
      addressRegion: data.contact.state,
      addressCountry: 'IN',
    },
  };
}

function extractPrice(price: string): number | undefined {
  const match = price.replace(/,/g, '').match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

export function buildBeautySalonSchema(data: PublicSiteData) {
  const reviews = data.reviews.filter((review) => review.rating > 0);
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : Number(data.brand.rating);
  const sameAs = data.socialLinks.map((link) => link.href).filter((href) => href && href !== '#');

  return {
    '@context': 'https://schema.org',
    ...getSalonIdentity(data),
    description: data.brand.shortDescription,
    image: absoluteUrl('/assets/images/app_logo.png'),
    openingHours: ['Mo-Sa 09:00-20:00', 'Su 10:00-18:00'],
    priceRange: '₹₹',
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(averageRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: averageRating.toFixed(1),
            reviewCount: reviews.length || Number(data.brand.happyClients.replace(/\D/g, '')) || 1,
          },
        }
      : {}),
  };
}

export function buildServiceSchema(data: PublicSiteData, services: ServiceItem[] = data.services) {
  const provider = getSalonIdentity(data);

  return {
    '@context': 'https://schema.org',
    '@graph': services.map((service) => {
      const price = extractPrice(service.price);

      return {
        '@type': 'Service',
        serviceType: service.category,
        name: service.title,
        description: service.description,
        provider,
        areaServed: {
          '@type': 'AdministrativeArea',
          name: `${data.contact.city}, ${data.contact.state}`,
        },
        ...(price
          ? {
              offers: {
                '@type': 'Offer',
                price,
                priceCurrency: 'INR',
              },
            }
          : {}),
      };
    }),
  };
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
