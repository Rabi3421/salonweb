'use client';

import React, { createContext, useContext } from 'react';
import type { CmsPage, CmsSection } from '@/types/cms';

const CmsPageContext = createContext<CmsPage | null>(null);

export function CmsPageProvider({
  page,
  children,
}: {
  page: CmsPage | null;
  children: React.ReactNode;
}) {
  return <CmsPageContext.Provider value={page}>{children}</CmsPageContext.Provider>;
}

export function useCmsPage(): CmsPage | null {
  return useContext(CmsPageContext);
}

export function useCmsSection(sectionKey: string): CmsSection | null {
  const page = useContext(CmsPageContext);
  if (!page?.sections) return null;
  return page.sections.find((s) => s.sectionKey === sectionKey) ?? null;
}
