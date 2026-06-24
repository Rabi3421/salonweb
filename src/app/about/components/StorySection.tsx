'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
              alt="Luxury Rosé Luxe salon interior with modern styling chairs"
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
            Our Story
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-6">
            A Salon Experience <span className="italic text-primary">Designed Around You</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-4">
            At Rosé Luxe, beauty is not just a service — it is an experience. We created a calm,
            premium space where every client feels confident, cared for, and beautifully
            transformed.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            Our team combines modern styling techniques, premium products, strict hygiene practices,
            and personalized consultation to deliver salon experiences that feel luxurious and
            reliable.
          </p>
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
