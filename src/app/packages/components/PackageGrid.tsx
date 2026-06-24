'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const packages = [
  {
    name: 'Bridal Glow Package',
    price: '₹18,999',
    tag: 'Most Popular',
    bestFor: 'Bride-to-be',
    highlight: true,
    includes: [
      'Premium facial',
      'Hair spa',
      'Manicure & pedicure',
      'Bridal trial',
      'Final bridal makeup look',
    ],
  },
  {
    name: 'Monthly Grooming Package',
    price: '₹4,999',
    tag: null,
    bestFor: 'Monthly self-care',
    highlight: false,
    includes: ['Cleanup', 'Threading', 'Waxing', 'Hair spa', 'Basic manicure'],
  },
  {
    name: 'Party Ready Package',
    price: '₹6,999',
    tag: null,
    bestFor: 'Events & functions',
    highlight: false,
    includes: ['Party makeup', 'Hairstyling', 'Nail polish', 'Draping support'],
  },
  {
    name: 'Hair Care Package',
    price: '₹3,999',
    tag: null,
    bestFor: 'Hair nourishment',
    highlight: false,
    includes: ['Hair spa', 'Blow dry', 'Scalp consultation', 'Smooth finish styling'],
  },
  {
    name: 'Nail Care Package',
    price: '₹2,499',
    tag: null,
    bestFor: 'Hands & feet',
    highlight: false,
    includes: ['Manicure', 'Pedicure', 'Nail shaping', 'Premium polish'],
  },
];

export default function PackageGrid() {
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
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`relative rounded-4xl p-7 border shadow-sm service-card-hover ${
                pkg.highlight ? 'package-highlight border-transparent' : 'bg-card border-border'
              }`}
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              }}
            >
              {pkg.tag ? (
                <span
                  className={`absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-bold shadow-md ${
                    pkg.highlight ? 'bg-white text-primary' : 'bg-primary text-white'
                  }`}
                >
                  {pkg.tag}
                </span>
              ) : null}

              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  pkg.highlight ? 'text-white/70' : 'text-muted-foreground'
                }`}
              >
                {pkg.bestFor}
              </p>

              <h3
                className={`font-display text-xl font-semibold mb-2 ${
                  pkg.highlight ? 'text-white' : 'text-foreground'
                }`}
              >
                {pkg.name}
              </h3>

              <p
                className={`text-3xl font-display font-bold mb-6 ${
                  pkg.highlight ? 'text-white' : 'text-primary'
                }`}
              >
                {pkg.price}
              </p>

              <ul className="space-y-2.5 mb-7">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <Icon
                      name="CheckIcon"
                      size={14}
                      className={pkg.highlight ? 'text-white/80 shrink-0' : 'text-primary shrink-0'}
                    />
                    <span className={pkg.highlight ? 'text-white/90' : 'text-foreground/80'}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/book-appointment"
                className={`w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  pkg.highlight
                    ? 'bg-white text-primary hover:bg-white/90 shadow-lg'
                    : 'pink-gradient-btn text-primary-foreground'
                }`}
              >
                <Icon
                  name="CalendarDaysIcon"
                  size={16}
                  className={pkg.highlight ? 'text-primary' : 'text-white'}
                />
                Book Package
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
