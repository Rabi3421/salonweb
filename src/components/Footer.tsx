'use client';

import React from 'react';
import Link from 'next/link';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { getContactLinks, formatPhoneDisplay } from '@/lib/public-site-data';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Book Now', href: '/book-appointment' },
];

const exploreLinks = [
  { label: 'Our Team', href: '/team' },
  { label: 'Packages', href: '/packages' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
];

const policyLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' },
];

export default function Footer() {
  const siteData = usePublicSiteData();
  const brand = siteData.brand;
  const contact = siteData.contact;
  const cLinks = getContactLinks(contact);

  return (
    <footer className="bg-foreground text-primary-foreground/70 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={36} />
              <span className="font-display font-semibold text-xl text-white">{brand.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">{brand.shortDescription}</p>
            <div className="flex gap-3">
              {(['instagram', 'facebook', 'youtube'] as const).map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon
                    name={
                      social === 'instagram'
                        ? 'CameraIcon'
                        : social === 'facebook'
                          ? 'UserGroupIcon'
                          : 'PlayIcon'
                    }
                    size={15}
                    className="text-white"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Policies
            </h4>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="MapPinIcon" size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-white/50">{contact.address}</p>
              </div>
              <a href={cLinks.tel} className="flex items-center gap-3 group">
                <Icon name="PhoneIcon" size={16} className="text-primary shrink-0" />
                <span className="text-sm text-white/50 group-hover:text-primary transition-colors">
                  {formatPhoneDisplay(contact.phone)}
                </span>
              </a>
              <a
                href={cLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-primary shrink-0" />
                <span className="text-sm text-white/50 group-hover:text-primary transition-colors">
                  WhatsApp Us
                </span>
              </a>
              <a href={cLinks.mailto} className="flex items-center gap-3 group">
                <Icon name="EnvelopeIcon" size={16} className="text-primary shrink-0" />
                <span className="text-sm text-white/50 group-hover:text-primary transition-colors">
                  {contact.email}
                </span>
              </a>
              <div className="flex items-start gap-3">
                <Icon name="ClockIcon" size={16} className="text-primary mt-0.5 shrink-0" />
                <div>
                  {contact.openingHours.map((h, i) => (
                    <p key={i} className="text-sm text-white/50">
                      {h}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>
            © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/cancellation-policy" className="hover:text-primary transition-colors">
              Cancellation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
