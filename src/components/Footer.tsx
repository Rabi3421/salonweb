import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Book Now', href: '/services#booking' },
];

const services = [
  'Hair Styling',
  'Facial Treatment',
  'Bridal Makeup',
  'Nail Art',
  'Hair Spa',
  'Manicure & Pedicure',
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground/70 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={36} />
              <span className="font-display font-semibold text-xl text-white">Rosé Luxe</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              A luxury sanctuary where beauty meets elegance. Premium salon services crafted for
              modern women in Ahmedabad.
            </p>
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

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-white/50 hover:text-primary transition-colors"
                  >
                    {service}
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
                <p className="text-sm text-white/50">
                  14 Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054
                </p>
              </div>
              <a href="tel:+919876543210" className="flex items-center gap-3 group">
                <Icon name="PhoneIcon" size={16} className="text-primary shrink-0" />
                <span className="text-sm text-white/50 group-hover:text-primary transition-colors">
                  +91 98765 43210
                </span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-primary shrink-0" />
                <span className="text-sm text-white/50 group-hover:text-primary transition-colors">
                  WhatsApp Us
                </span>
              </a>
              <a href="mailto:hello@roseluxe.in" className="flex items-center gap-3 group">
                <Icon name="EnvelopeIcon" size={16} className="text-primary shrink-0" />
                <span className="text-sm text-white/50 group-hover:text-primary transition-colors">
                  hello@roseluxe.in
                </span>
              </a>
              <div className="flex items-start gap-3">
                <Icon name="ClockIcon" size={16} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white/50">Mon–Sat: 9:00 AM – 8:00 PM</p>
                  <p className="text-sm text-white/50">Sunday: 10:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© 2026 Rosé Luxe Salon. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
