'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const packages = [
  {
    name: 'Bridal Glow Package',
    price: '₹18,999',
    highlight: false,
    badge: null,
    description: 'Your complete wedding beauty experience from consultation to final look.',
    includes: [
      'Deep Cleansing Facial',
      'Nourishing Hair Spa',
      'Manicure & Pedicure',
      'Bridal Trial Session',
      'Final Bridal Look',
      'Draping Assistance',
    ],
    icon: 'HeartIcon' as const,
  },
  {
    name: 'Monthly Grooming Package',
    price: '₹4,999',
    highlight: true,
    badge: 'Most Popular',
    description: 'Stay polished every month with our all-inclusive grooming routine.',
    includes: [
      'Skin Cleanup',
      'Threading (Full Face)',
      'Waxing (Full Arms + Legs)',
      'Nourishing Hair Spa',
      'Basic Manicure',
    ],
    icon: 'CalendarDaysIcon' as const,
  },
  {
    name: 'Party Ready Package',
    price: '₹6,999',
    highlight: false,
    badge: null,
    description: 'Look stunning for every event with our complete party glamour package.',
    includes: [
      'Glamorous Party Makeup',
      'Professional Hairstyling',
      'Nail Polish & Finish',
      'Saree / Dupatta Draping',
    ],
    icon: 'StarIcon' as const,
  },
];

export default function PackagesSection() {
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
    <section className="section-padding px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            Special Bundles
          </span>
          <h2 className="font-display text-section-title text-foreground font-light">
            Beauty <span className="italic text-primary">Packages</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`relative rounded-4xl p-8 flex flex-col ${
                pkg.highlight
                  ? 'package-highlight'
                  : 'bg-card border border-border service-card-hover'
              }`}
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
              }}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-foreground text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                  pkg.highlight ? 'bg-white/20' : 'bg-secondary'
                }`}
              >
                <Icon
                  name={pkg.icon}
                  size={22}
                  className={pkg.highlight ? 'text-white' : 'text-primary'}
                />
              </div>

              <h3
                className={`font-display text-xl font-semibold mb-2 ${pkg.highlight ? 'text-white' : 'text-foreground'}`}
              >
                {pkg.name}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-5 ${pkg.highlight ? 'text-white/75' : 'text-muted-foreground'}`}
              >
                {pkg.description}
              </p>

              <div
                className={`text-3xl font-display font-bold mb-6 ${pkg.highlight ? 'text-white' : 'text-primary'}`}
              >
                {pkg.price}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        pkg.highlight ? 'bg-white/20' : 'bg-secondary'
                      }`}
                    >
                      <Icon
                        name="CheckIcon"
                        size={11}
                        className={pkg.highlight ? 'text-white' : 'text-primary'}
                      />
                    </div>
                    <span className={pkg.highlight ? 'text-white/85' : 'text-foreground/80'}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#booking"
                className={`w-full py-3.5 rounded-2xl font-semibold text-sm text-center transition-all inline-block ${
                  pkg.highlight
                    ? 'bg-white text-primary hover:bg-white/90 shadow-lg'
                    : 'pink-gradient-btn text-primary-foreground'
                }`}
              >
                Book This Package
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
