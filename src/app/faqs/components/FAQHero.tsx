'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function FAQHero() {
  const headRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition =
      'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }, []);

  return (
    <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden pt-24 pb-14 px-4">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] blob-pink pointer-events-none" />
      <div ref={headRef} className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-primary text-xs font-bold tracking-widest uppercase mb-6">
          <Icon name="QuestionMarkCircleIcon" size={13} className="text-primary" />
          Need Help?
        </span>
        <h1 className="font-display text-hero text-foreground font-light">
          Common Questions <span className="italic text-primary">Before Your Visit</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-6">
          Everything you need to know about booking, services, bridal packages, hygiene, payments
          and appointment changes.
        </p>
      </div>
    </section>
  );
}
