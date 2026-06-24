'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const promises = [
  {
    icon: 'ShieldCheckIcon' as const,
    title: 'Sanitized Tools',
    description:
      'Every tool is cleaned and sanitized before use to maintain strict hygiene standards.',
  },
  {
    icon: 'BeakerIcon' as const,
    title: 'Premium Products',
    description: 'We use trusted professional-grade beauty products for safe and lasting results.',
  },
  {
    icon: 'UserIcon' as const,
    title: 'Expert Consultation',
    description: 'Every service begins with understanding your style, skin, hair, and comfort.',
  },
  {
    icon: 'SparklesIcon' as const,
    title: 'Relaxing Ambience',
    description:
      'Our salon is designed to feel calm, elegant, and comfortable from the moment you enter.',
  },
];

export default function HygienePromise() {
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            Our Promise
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            Our Promise Of <span className="italic text-primary">Care</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every detail is designed for your safety, comfort, and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((item, i) => (
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
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
