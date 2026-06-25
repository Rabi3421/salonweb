import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import '../styles/tailwind.css';
import { PublicSiteDataProvider } from '@/components/PublicSiteDataProvider';
import { getPublicSiteDataAsync } from '@/lib/public-site-data';
import { getSiteUrl } from '@/lib/seo';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const publicSiteData = await getPublicSiteDataAsync();
  const { brand, contact } = publicSiteData;
  const location = brand.location || contact.city || 'your city';
  const title = `${brand.fullName} | Premium Beauty Salon in ${location}`;
  const description =
    brand.shortDescription ||
    `Book salon services, beauty packages, and appointments at ${brand.fullName}.`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s | ${brand.fullName}`,
    },
    description,
    icons: {
      icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    },
    openGraph: {
      type: 'website',
      siteName: brand.fullName,
      title,
      description,
      url: getSiteUrl(),
      locale: 'en_IN',
      images: [
        {
          url: '/assets/images/app_logo.png',
          width: 1200,
          height: 630,
          alt: `${brand.fullName} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/images/app_logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const publicSiteData = await getPublicSiteDataAsync();

  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className={dmSans.className} suppressHydrationWarning>
        <PublicSiteDataProvider data={publicSiteData}>{children}</PublicSiteDataProvider>
      </body>
    </html>
  );
}
