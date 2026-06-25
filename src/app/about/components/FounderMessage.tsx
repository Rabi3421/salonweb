'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useCmsSection } from '@/components/CmsPageProvider';
import { shouldRenderSection, sectionText } from '@/lib/cms-mappers';

export default function FounderMessage() {
  const cms = useCmsSection('founderMessage');
  if (!shouldRenderSection(cms)) return null;

  return (
    <section className="section-padding px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-5xl p-8 md:p-14 shadow-sm border border-border relative overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center">
            <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
              {sectionText(cms, 'eyebrow', 'Founder Message')}
            </span>
            <h2 className="font-display text-section-title text-foreground font-light mb-8">
              {sectionText(cms, 'title', 'Beauty Should Feel Personal')}
            </h2>

            <div className="max-w-2xl mx-auto">
              <div className="relative mb-8">
                <Icon
                  name="ChatBubbleBottomCenterTextIcon"
                  size={36}
                  className="text-primary/20 mx-auto mb-4"
                />
                <p className="text-muted-foreground text-lg leading-relaxed italic font-light">
                  &ldquo;{sectionText(cms, 'quote', 'Our vision is to make every visit feel special. Whether it is a quick grooming session, a bridal transformation, or a complete beauty day, we want every client to walk out feeling confident and cared for.')}&rdquo;
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <span className="text-white font-display text-xl font-semibold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-base">{sectionText(cms, 'author', 'Ananya Sharma')}</p>
                  <p className="text-muted-foreground text-sm">{sectionText(cms, 'designation', 'Founder & Creative Director')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
