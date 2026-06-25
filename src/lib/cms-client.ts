import { SALON_ID } from '@/lib/env';
import type { CmsPage, CmsPageResponse, CmsFullResponse, CmsWebsiteContent } from '@/types/cms';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function fetchCmsPage(pageKey: string): Promise<CmsPage | null> {
  if (!SALON_ID) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[CMS] NEXT_PUBLIC_SALON_ID not set — rendering fallback content.');
    }
    return null;
  }

  try {
    const res = await fetch(`${API_BASE}/api/salon/website-content?page=${pageKey}`, {
      headers: { 'x-salon-id': SALON_ID },
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as CmsPageResponse;
    return json.data?.page ?? null;
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[CMS] Failed to fetch page "${pageKey}" — rendering fallback content.`);
    }
    return null;
  }
}

export async function fetchCmsContent(): Promise<CmsWebsiteContent | null> {
  if (!SALON_ID) return null;

  try {
    const res = await fetch(`${API_BASE}/api/salon/website-content`, {
      headers: { 'x-salon-id': SALON_ID },
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as CmsFullResponse;
    return json.data?.content ?? null;
  } catch {
    return null;
  }
}
