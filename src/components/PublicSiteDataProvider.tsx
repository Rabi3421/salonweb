'use client';

import React, { createContext, useContext } from 'react';
import { fallbackPublicSiteData } from '@/data/public-site-data';
import type { PublicSiteData } from '@/types/public-site';

const PublicSiteDataContext = createContext<PublicSiteData>(fallbackPublicSiteData);

export function PublicSiteDataProvider({
  data,
  children,
}: {
  data: PublicSiteData;
  children: React.ReactNode;
}) {
  return <PublicSiteDataContext.Provider value={data}>{children}</PublicSiteDataContext.Provider>;
}

export function usePublicSiteData(): PublicSiteData {
  return useContext(PublicSiteDataContext);
}
