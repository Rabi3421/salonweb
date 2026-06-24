'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { getPublicSiteData, getContactLinks } from '@/lib/public-site-data';

const siteData = getPublicSiteData();
const navLinks = siteData.navLinks;
const links = getContactLinks(siteData.contact);
const brandName = siteData.brand.name;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
        <nav
          className={`pill-nav w-full max-w-5xl px-4 md:px-6 h-16 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'shadow-lg' : ''
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={handleNavClick}>
            <AppLogo size={36} />
            <span className="font-display font-semibold text-lg text-foreground hidden sm:block">
              {brandName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className={`nav-link-underline text-sm font-medium transition-colors duration-200 ${
                  pathname === link?.href
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={links.tel}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 transition-colors"
              aria-label="Call us"
            >
              <Icon name="PhoneIcon" size={16} className="text-primary" />
            </a>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary hover:bg-primary/10 transition-colors"
              aria-label="WhatsApp"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-primary" />
            </a>
            <Link
              href="/book-appointment"
              className="pink-gradient-btn text-primary-foreground text-sm font-semibold px-5 py-2 rounded-full"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-secondary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} className="text-primary" />
          </button>
        </nav>
      </header>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex flex-col gap-2" onClick={(e) => e?.stopPropagation()}>
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                onClick={handleNavClick}
                className={`text-2xl font-display font-medium py-3 border-b border-border transition-colors ${
                  pathname === link?.href ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link?.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/book-appointment"
                onClick={handleNavClick}
                className="pink-gradient-btn text-primary-foreground text-center font-semibold py-3.5 rounded-2xl text-base"
              >
                Book Appointment
              </Link>
              <div className="flex gap-3">
                <a
                  href={links.tel}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-secondary text-foreground font-medium text-sm"
                >
                  <Icon name="PhoneIcon" size={16} className="text-primary" />
                  Call Now
                </a>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-secondary text-foreground font-medium text-sm"
                >
                  <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-primary" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
