export interface BrandInfo {
  name: string;
  fullName: string;
  tagline: string;
  shortDescription: string;
  logoText: string;
  rating: string;
  happyClients: string;
  location: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  openingHours: string[];
  mapLabel: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  image?: string;
  featured?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  bio: string;
  image?: string;
  initials: string;
}

export interface PackageItem {
  name: string;
  price: string;
  tag?: string | null;
  bestFor: string;
  includes: string[];
  highlighted?: boolean;
}

export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  height?: string;
  description?: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  service: string;
  review: string;
  initials: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface PolicySection {
  title: string;
  content: string | string[];
}

export interface PolicyContent {
  title: string;
  description: string;
  lastUpdated: string;
  notice?: string;
  sections: PolicySection[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface PublicSiteData {
  brand: BrandInfo;
  contact: ContactInfo;
  navLinks: NavLink[];
  services: ServiceItem[];
  serviceCategories: string[];
  whyChooseUs: WhyChooseUsItem[];
  about: {
    title: string;
    paragraphs: string[];
    stats: StatItem[];
  };
  team: TeamMember[];
  packages: PackageItem[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  faqs: FAQItem[];
  policies: {
    privacy: PolicyContent;
    terms: PolicyContent;
    cancellation: PolicyContent;
  };
  socialLinks: NavLink[];
}
