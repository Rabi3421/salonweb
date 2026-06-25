import { API_BASE_URL, SALON_ID } from '@/lib/env';
import { fallbackPublicSiteData } from '@/data/public-site-data';
import type { PublicSiteData, ContactInfo } from '@/types/public-site';

let cachedData: PublicSiteData | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

async function fetchPublicSiteData(): Promise<PublicSiteData | null> {
  if (!API_BASE_URL || !SALON_ID) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/salon/public/site-data`, {
      headers: { 'x-salon-id': SALON_ID },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.success || !json.data) return null;

    const d = json.data;
    const result: PublicSiteData = {
      ...fallbackPublicSiteData,
      brand: d.brand
        ? { ...fallbackPublicSiteData.brand, ...d.brand }
        : fallbackPublicSiteData.brand,
      contact: d.contact
        ? { ...fallbackPublicSiteData.contact, ...d.contact }
        : fallbackPublicSiteData.contact,
      navLinks: d.navLinks ?? fallbackPublicSiteData.navLinks,
      services: d.services?.length > 0 ? d.services : fallbackPublicSiteData.services,
      serviceCategories: d.serviceCategories ?? fallbackPublicSiteData.serviceCategories,
      team: d.team?.length > 0 ? d.team : fallbackPublicSiteData.team,
      packages: d.packages?.length > 0 ? d.packages : fallbackPublicSiteData.packages,
      whyChooseUs: d.whyChooseUs?.length > 0 ? d.whyChooseUs : fallbackPublicSiteData.whyChooseUs,
      about: d.about?.title ? d.about : fallbackPublicSiteData.about,
      gallery: d.gallery?.length > 0 ? d.gallery : fallbackPublicSiteData.gallery,
      reviews: d.reviews?.length > 0 ? d.reviews : fallbackPublicSiteData.reviews,
      faqs: d.faqs?.length > 0 ? d.faqs : fallbackPublicSiteData.faqs,
      socialLinks: d.socialLinks?.length > 0 ? d.socialLinks : fallbackPublicSiteData.socialLinks,
      policies: d.policies?.privacy ? d.policies : fallbackPublicSiteData.policies,
    };
    return result;
  } catch {
    return null;
  }
}

/**
 * Returns the public site data for the current tenant.
 * Fetches from backend API with fallback to static data.
 */
export function getPublicSiteData(): PublicSiteData {
  if (cachedData && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedData;
  }
  return fallbackPublicSiteData;
}

export async function getPublicSiteDataAsync(): Promise<PublicSiteData> {
  if (cachedData && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedData;
  }

  try {
    const fetched = await fetchPublicSiteData();
    if (fetched) {
      cachedData = fetched;
      cacheTimestamp = Date.now();
      return fetched;
    }
  } catch {
    // Backend unavailable during build or runtime — use fallback
  }

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

export function parsePriceValue(price: string): number {
  const digits = price.replace(/[^0-9.]/g, '');
  return Number(digits || 0);
}

export function parseDurationMinutes(duration: string): number {
  const match = duration.match(/\d+/);
  return match ? Number(match[0]) : 60;
}

export function toTwentyFourHourTime(time: string): string {
  const trimmed = time.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return trimmed;

  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = match[3].toUpperCase();

  if (meridiem === 'PM' && hours < 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

export function buildAppointmentServiceSnapshot(data: PublicSiteData, selection: string) {
  const service = data.services.find((item) => item.title === selection);
  if (service) {
    return {
      id: service.slug,
      name: service.title,
      price: parsePriceValue(service.price),
      duration: parseDurationMinutes(service.duration),
      category: service.category,
    };
  }

  const packageItem = data.packages.find((item) => item.name === selection);
  if (packageItem) {
    return {
      id: packageItem.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: packageItem.name,
      price: parsePriceValue(packageItem.price),
      duration: 60,
      category: 'Package',
    };
  }

  return {
    id: selection.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: selection,
    price: 0,
    duration: 60,
    category: '',
  };
}
