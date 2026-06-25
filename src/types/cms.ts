export interface CmsImage {
  key: string;
  url: string;
  alt?: string;
  title?: string;
  sortOrder?: number;
}

export interface CmsButton {
  label: string;
  href: string;
  type?: 'primary' | 'secondary' | 'whatsapp' | 'phone' | 'link';
  enabled?: boolean;
}

export interface CmsSection {
  sectionKey: string;
  sectionType: string;
  enabled: boolean;
  sortOrder: number;
  content: Record<string, unknown>;
  images: CmsImage[];
  buttons: CmsButton[];
  items: unknown[];
  settings: Record<string, unknown>;
}

export interface CmsSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImageUrl?: string;
}

export interface CmsPage {
  pageKey: string;
  title: string;
  slug: string;
  seo: CmsSeo;
  sections: CmsSection[];
}

export interface CmsTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

export interface CmsGlobal {
  salonName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapUrl: string;
  openingHours: string;
}

export interface CmsWebsiteContent {
  theme: CmsTheme;
  global: CmsGlobal;
  pages: CmsPage[];
}

export interface CmsPageResponse {
  success: boolean;
  message: string;
  data?: {
    salon: { salonId: string; name: string };
    page: CmsPage;
  };
}

export interface CmsFullResponse {
  success: boolean;
  message: string;
  data?: {
    salon: { salonId: string; name: string };
    content: CmsWebsiteContent;
  };
}
