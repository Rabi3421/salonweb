'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useCmsSection } from '@/components/CmsPageProvider';
import { shouldRenderSection, sectionText } from '@/lib/cms-mappers';

const transformations = [
  {
    service: 'Bridal Makeup Transformation',
    text: 'From natural consultation to picture-perfect bridal glow.',
    result: 'Long-lasting premium bridal finish',
    icon: 'SparklesIcon' as const,
  },
  {
    service: 'Hair Spa & Styling',
    text: 'Dry, dull hair refreshed with nourishment, shine, and soft styling.',
    result: 'Smooth, glossy and healthy look',
    icon: 'ScissorsIcon' as const,
  },
  {
    service: 'Nail Art Makeover',
    text: 'Simple nails transformed into elegant statement beauty details.',
    result: 'Premium long-lasting nail finish',
    icon: 'PaintBrushIcon' as const,
  },
];

export default function BeforeAfterSection() {
  const cms = useCmsSection('beforeAfter');
  if (!shouldRenderSection(cms)) return null;
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
    <section className="section-padding px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            Real Transformations
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            Before & After <span className="italic text-primary">Beauty Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real results from real clients — premium care that makes a visible difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.map((item, i) => (
            <div
              key={item.service}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="bg-card rounded-4xl p-7 border border-border shadow-sm service-card-hover"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mb-5">
                <Icon name={item.icon} size={22} className="text-white" variant="solid" />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {item.service}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.text}</p>

              <div className="bg-secondary/60 rounded-2xl px-4 py-3 mb-5">
                <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
                  <Icon name="CheckBadgeIcon" size={14} className="text-primary" variant="solid" />
                  {item.result}
                </p>
              </div>

              <Link
                href="/services#booking"
                className="text-sm font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1.5 transition-colors"
              >
                Book Similar Look
                <Icon name="ArrowRightIcon" size={14} className="text-primary" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
