import type { CmsPage, CmsSection, CmsImage, CmsButton } from '@/types/cms';

export function getSection(page: CmsPage | null | undefined, key: string): CmsSection | null {
  if (!page?.sections) return null;
  return page.sections.find((s) => s.sectionKey === key) ?? null;
}

export function shouldRenderSection(
  section: CmsSection | null | undefined,
): boolean {
  if (!section) return true;
  return section.enabled !== false;
}

export function sectionEnabled(page: CmsPage | null | undefined, key: string): boolean {
  const s = getSection(page, key);
  return shouldRenderSection(s);
}

export function text(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.trim()) return value;
  return fallback;
}

export function textArray(value: unknown, fallback: string[]): string[] {
  if (Array.isArray(value) && value.length > 0) return value.map(String);
  return fallback;
}

export function imageUrl(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.trim()) return value;
  return fallback;
}

export function sectionText(
  section: CmsSection | null,
  key: string,
  fallback: string,
): string {
  return text(section?.content?.[key], fallback);
}

export function sectionTextArray(
  section: CmsSection | null,
  key: string,
  fallback: string[],
): string[] {
  return textArray(section?.content?.[key], fallback);
}

export function sectionImages(
  section: CmsSection | null,
  fallback: CmsImage[],
): CmsImage[] {
  if (section?.images && section.images.length > 0) return section.images;
  return fallback;
}

export function sectionImage(
  section: CmsSection | null,
  index: number,
  fallbackUrl: string,
  fallbackAlt: string,
): { url: string; alt: string } {
  const img = section?.images?.[index];
  return {
    url: img?.url?.trim() ? img.url : fallbackUrl,
    alt: img?.alt?.trim() ? img.alt : fallbackAlt,
  };
}

export function sectionButtons(
  section: CmsSection | null,
  fallback: CmsButton[],
): CmsButton[] {
  if (section?.buttons && section.buttons.length > 0) return section.buttons;
  return fallback;
}

export function sectionItems<T>(section: CmsSection | null, fallback: T[]): T[] {
  if (section?.items && (section.items as unknown[]).length > 0) return section.items as T[];
  return fallback;
}
