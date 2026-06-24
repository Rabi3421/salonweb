'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const expertise = [
  {
    icon: 'ScissorsIcon' as const,
    title: 'Hair & Styling Experts',
    description: 'Cuts, color, spa, blowouts and bridal hairstyling with a premium finish.',
  },
  {
    icon: 'SparklesIcon' as const,
    title: 'Bridal & Makeup Artists',
    description: 'Bridal, party and editorial makeup by experienced professionals.',
  },
  {
    icon: 'BeakerIcon' as const,
    title: 'Skin & Facial Specialists',
    description: 'Facials, cleanups, glow treatments and skin analysis consultations.',
  },
  {
    icon: 'PaintBrushIcon' as const,
    title: 'Nail Care Professionals',
    description: 'Manicures, pedicures, gel nails and custom nail art designs.',
  },
];

export default function ExpertiseSection() {
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
            Our Expertise
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            Specialists For Every <span className="italic text-primary">Beauty Need</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item, i) => (
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
              <h3 className="font-semibold text-foreground text-base mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <Link
                href="/services"
                className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
              >
                View Services
                <Icon name="ArrowRightIcon" size={12} className="text-primary" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
