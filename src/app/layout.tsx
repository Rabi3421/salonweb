import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import '../styles/tailwind.css';
import { getPublicSiteData } from '@/lib/public-site-data';
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

const publicSiteData = getPublicSiteData();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Rosé Luxe Salon | Premium Beauty Salon in Ahmedabad',
    template: '%s | Rosé Luxe Salon',
  },
  description:
    'Premium salon for hair styling, facial treatments, nail art, bridal makeup and beauty packages in Ahmedabad.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    type: 'website',
    siteName: publicSiteData.brand.fullName,
    title: 'Rosé Luxe Salon | Premium Beauty Salon in Ahmedabad',
    description:
      'Premium salon for hair styling, facial treatments, nail art, bridal makeup and beauty packages in Ahmedabad.',
    url: getSiteUrl(),
    locale: 'en_IN',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: `${publicSiteData.brand.fullName} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rosé Luxe Salon | Premium Beauty Salon in Ahmedabad',
    description:
      'Premium salon for hair styling, facial treatments, nail art, bridal makeup and beauty packages in Ahmedabad.',
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
