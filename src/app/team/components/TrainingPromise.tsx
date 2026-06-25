'use client';

import React from 'react';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import Icon from '@/components/ui/AppIcon';

const promises = [
  {
    icon: 'ChatBubbleLeftRightIcon' as const,
    title: 'Personalized Consultation',
    text: 'Understanding your style, skin, and preferences before every service.',
  },
  {
    icon: 'BeakerIcon' as const,
    title: 'Premium Product Knowledge',
    text: 'Trained on professional-grade products for safe and effective results.',
  },
  {
    icon: 'ShieldCheckIcon' as const,
    title: 'Hygiene-First Process',
    text: 'Strict sanitization, tool sterilization, and clean workspace standards.',
  },
];

export default function TrainingPromise() {
  const { brand } = usePublicSiteData();

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card rounded-5xl p-8 md:p-14 shadow-sm border border-border">
          <div className="text-center mb-10">
            <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
              Our Standard
            </span>
            <h2 className="font-display text-section-title text-foreground font-light mb-4">
              Trained, Trusted & <span className="italic text-primary">Detail-Focused</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
              Every expert at {brand.name} follows a careful consultation-first approach. From
              product selection to final styling, our team focuses on comfort, hygiene, and results
              that match your personality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promises.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Icon name={item.icon} size={24} className="text-white" variant="solid" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
