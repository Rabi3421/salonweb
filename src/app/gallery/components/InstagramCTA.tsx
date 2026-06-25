'use client';

import React from 'react';
import Link from 'next/link';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import Icon from '@/components/ui/AppIcon';
import { useCmsSection } from '@/components/CmsPageProvider';
import { shouldRenderSection, sectionText } from '@/lib/cms-mappers';

export default function InstagramCTA() {
  const { brand } = usePublicSiteData();
  const cms = useCmsSection('instagramCta');
  if (!shouldRenderSection(cms)) return null;

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-5xl p-8 md:p-14 shadow-sm border border-border relative overflow-hidden text-center">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
              {sectionText(cms, 'eyebrow', 'Follow The Glow')}
            </span>
            <h2 className="font-display text-section-title text-foreground font-light mb-4">
              {sectionText(cms, 'title', 'See More Looks & Transformations')}
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Follow {brand.name} for fresh beauty inspiration, bridal looks, styling ideas, and
              behind-the-scenes salon moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="pink-gradient-btn text-primary-foreground font-semibold px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2"
              >
                <Icon name="CameraIcon" size={18} className="text-white" />
                Follow On Instagram
              </a>
              <Link
                href="/services#booking"
                className="border border-border text-foreground font-semibold px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
              >
                <Icon name="CalendarDaysIcon" size={18} className="text-primary" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
