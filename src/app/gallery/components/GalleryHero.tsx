'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function GalleryHero() {
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
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] blob-pink pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] blob-pink pointer-events-none" />

      <div ref={headRef} className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-primary text-xs font-bold tracking-widest uppercase mb-6">
          <Icon name="CameraIcon" size={13} className="text-primary" />
          Our Work
        </span>
        <h1 className="font-display text-hero text-foreground font-light">
          A Gallery Of Beauty, <span className="italic text-primary">Confidence</span> &
          Transformation
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-6">
          Step inside our world of premium salon care — from elegant hair styling and glowing
          facials to bridal transformations and luxury nail art.
        </p>
      </div>
    </section>
  );
}
