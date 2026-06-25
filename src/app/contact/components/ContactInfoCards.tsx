'use client';

import React, { useEffect, useRef } from 'react';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import Icon from '@/components/ui/AppIcon';
import { getContactLinks, formatPhoneDisplay } from '@/lib/public-site-data';

export default function ContactInfoCards() {
  const sd = usePublicSiteData();
  const cl = getContactLinks(sd.contact);
  const contactItems = [
    {
      icon: 'PhoneIcon' as const,
      title: 'Call Us',
      detail: formatPhoneDisplay(sd.contact.phone),
      href: cl.tel,
      action: 'Call Now',
    },
    {
      icon: 'ChatBubbleLeftRightIcon' as const,
      title: 'WhatsApp',
      detail: 'Chat with our team',
      href: cl.whatsapp,
      action: 'Open Chat',
    },
    {
      icon: 'EnvelopeIcon' as const,
      title: 'Email',
      detail: sd.contact.email,
      href: cl.mailto,
      action: 'Send Email',
    },
    {
      icon: 'MapPinIcon' as const,
      title: 'Visit Salon',
      detail: sd.contact.address,
      href: undefined,
      action: undefined,
    },
  ];
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {contactItems.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="bg-card rounded-3xl p-6 border border-border shadow-sm text-center service-card-hover"
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mx-auto mb-4">
              <Icon name={item.icon} size={24} className="text-white" variant="solid" />
            </div>
            <h3 className="font-semibold text-foreground text-base mb-1">{item.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{item.detail}</p>
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
              >
                {item.action}
                <Icon name="ArrowRightIcon" size={12} className="text-primary" />
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
