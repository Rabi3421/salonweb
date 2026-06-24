'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const benefits = [
  {
    icon: 'CurrencyRupeeIcon' as const,
    title: 'Better Value',
    text: 'Save compared to booking individual services separately.',
  },
  {
    icon: 'CalendarDaysIcon' as const,
    title: 'Planned Beauty Routine',
    text: 'A structured approach to consistent self-care and grooming.',
  },
  {
    icon: 'SparklesIcon' as const,
    title: 'Perfect For Events',
    text: 'Curated bundles for weddings, parties, and special occasions.',
  },
  {
    icon: 'ChatBubbleLeftRightIcon' as const,
    title: 'Personalized Guidance',
    text: 'Our team helps customize the package to your beauty goals.',
  },
];

export default function PackageBenefits() {
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
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
              Why Packages
            </span>
            <h2 className="font-display text-section-title text-foreground font-light">
              Why Choose A <span className="italic text-primary">Package?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flex flex-col items-center text-center gap-3"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Icon name={item.icon} size={24} className="text-white" variant="solid" />
                </div>
                <h3 className="font-semibold text-foreground text-base">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
