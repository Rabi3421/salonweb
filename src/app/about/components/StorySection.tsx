'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import { useCmsSection } from '@/components/CmsPageProvider';
import { shouldRenderSection, sectionText, sectionTextArray } from '@/lib/cms-mappers';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function StorySection() {
  const { brand, about } = usePublicSiteData();
  const cms = useCmsSection('story');
  if (!shouldRenderSection(cms)) return null;
  const sectionRef = useRef<HTMLDivElement>(null);
  const paragraphs =
    about.paragraphs.length > 0
      ? about.paragraphs
      : [
          `${brand.fullName} was created as a calm, thoughtful space where every client feels cared for and confident.`,
          'Our team combines modern styling techniques, hygiene practices, and personalized consultation for reliable salon experiences.',
        ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition =
      'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding px-4 bg-background">
      <div
        ref={sectionRef}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Image Collage */}
        <div className="grid grid-cols-2 gap-3">
          <div className="row-span-2 rounded-4xl overflow-hidden shadow-lg">
            <AppImage
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
              alt={`${brand.fullName} salon interior with modern styling chairs`}
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-4xl overflow-hidden shadow-lg">
            <AppImage
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"
              alt="Professional hair styling service for a salon client"
              width={300}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative rounded-4xl overflow-hidden shadow-lg">
            <AppImage
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80"
              alt="Relaxing facial treatment with premium skincare products"
              width={300}
              height={240}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/75 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="font-display text-3xl font-semibold">10+</p>
                <p className="text-sm font-medium mt-1">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div>
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-4">
            {sectionText(cms, 'eyebrow', 'Our Story')}
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-6">
            {sectionText(cms, 'title', 'A Salon Experience Designed Around You')}
          </h2>
          {paragraphs.slice(0, 2).map((paragraph, index) => (
            <p
              key={paragraph}
              className={`text-muted-foreground text-base leading-relaxed ${
                index === Math.min(paragraphs.length, 2) - 1 ? 'mb-8' : 'mb-4'
              }`}
            >
              {paragraph}
            </p>
          ))}
          <Link
            href="/services#booking"
            className="pink-gradient-btn text-primary-foreground font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2"
          >
            <Icon name="CalendarDaysIcon" size={18} className="text-white" />
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
