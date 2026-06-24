import { fallbackPublicSiteData } from '@/data/public-site-data';
import type { PublicSiteData, ContactInfo } from '@/types/public-site';

/**
 * Returns the public site data for the current tenant.
 * Currently returns static fallback data.
 * TODO: Replace with backend API calls when available:
 *   GET /api/salon/public/profile
 *   GET /api/salon/public/services
 *   GET /api/salon/public/gallery
 *   GET /api/salon/public/team
 *   GET /api/salon/public/packages
 *   GET /api/salon/public/reviews
 *   GET /api/salon/public/faqs
 */
export function getPublicSiteData(): PublicSiteData {
  return fallbackPublicSiteData;
}

export function getFallbackPublicSiteData(): PublicSiteData {
  return fallbackPublicSiteData;
}

export function getContactLinks(contact: ContactInfo) {
  const phoneClean = contact.phone.replace(/[^0-9+]/g, '');
  return {
    tel: `tel:${phoneClean}`,
    whatsapp: `https://wa.me/${contact.whatsapp}`,
    mailto: `mailto:${contact.email}`,
  };
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export function buildAppointmentMessage(input: {
  service: string;
  date: string;
  time: string;
  stylist?: string;
  message?: string;
}): string {
  return [
    `Service: ${input.service}`,
    `Date: ${input.date}`,
    `Time: ${input.time}`,
    input.stylist ? `Preferred Stylist: ${input.stylist}` : '',
    input.message ? `Message: ${input.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function getServiceOptions(data: PublicSiteData): string[] {
  return data.services.map((s) => s.title);
}
