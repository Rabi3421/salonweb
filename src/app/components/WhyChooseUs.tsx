'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useCmsSection } from '@/components/CmsPageProvider';
import { shouldRenderSection, sectionText, sectionItems } from '@/lib/cms-mappers';

const defaultFeatures = [
  {
    icon: 'StarIcon' as const,
    title: 'Premium Quality',
    description:
      'Only the finest products and techniques for exceptional results every single time.',
  },
  {
    icon: 'ShieldCheckIcon' as const,
    title: 'Hygienic Products',
    description: '100% sanitized tools and premium branded products for your safety and care.',
  },
  {
    icon: 'ClockIcon' as const,
    title: 'On-Time Service',
    description: 'We respect your time with punctual appointments and zero unnecessary waiting.',
  },
  {
    icon: 'HeartIcon' as const,
    title: 'Client Satisfaction',
    description: 'Your happiness is our top priority — always. Every visit, every treatment.',
  },
];

export default function WhyChooseUs() {
  const cms = useCmsSection('whyChooseUs');
  if (!shouldRenderSection(cms)) return null;
  const eyebrow = sectionText(cms, 'eyebrow', 'Why Us');
  const title = sectionText(cms, 'title', 'Why Choose Us');
  const subtitle = sectionText(cms, 'subtitle', 'Experience the difference that sets us apart from the rest.');
  const features = sectionItems(cms, defaultFeatures) as { icon: string; title: string; description: string }[];
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
        <div className="bg-card rounded-5xl p-8 md:p-14 shadow-sm border border-border">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
              {eyebrow}
            </span>
            <h2 className="font-display text-section-title text-foreground font-light mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flex flex-col items-center text-center gap-4"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Icon name={feature.icon} size={26} className="text-white" variant="solid" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
