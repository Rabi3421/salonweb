'use client';

import React, { useEffect, useRef } from 'react';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import Icon from '@/components/ui/AppIcon';

export default function RatingSummary() {
  const { brand, reviews } = usePublicSiteData();
  const ref = useRef<HTMLDivElement>(null);
  const stats = [
    { value: `${brand.rating || '4.9'}/5`, label: 'Average Rating', icon: 'StarIcon' },
    { value: brand.happyClients || 'Happy Clients', label: 'Happy Clients', icon: 'UserGroupIcon' },
    {
      value: reviews.length > 0 ? `${reviews.length}+` : 'Verified',
      label: 'Verified Reviews',
      icon: 'ChatBubbleLeftRightIcon',
    },
    { value: '98%', label: 'Client Satisfaction', icon: 'HeartIcon' },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition =
      'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    const obs = new IntersectionObserver(
      (e) => {
        e.forEach((en) => {
          if (en.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="px-4 bg-background">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="bg-card rounded-5xl p-8 md:p-12 shadow-sm border border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mx-auto mb-3">
                  <Icon name={s.icon} size={20} className="text-white" variant="solid" />
                </div>
                <p className="font-display text-3xl md:text-4xl font-semibold text-primary">
                  {s.value}
                </p>
                <p className="text-muted-foreground text-sm font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
