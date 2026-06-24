'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { value: '4.9', label: 'Rating', icon: 'StarIcon' as const },
  { value: '6000+', label: 'Happy Clients', icon: 'UserGroupIcon' as const },
  { value: 'Ahmedabad', label: 'Location', icon: 'MapPinIcon' as const },
];

export default function HeroSection() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      eyebrowRef.current,
      headlineRef.current,
      subtitleRef.current,
      btnsRef.current,
      cardRef.current,
    ];

    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!el) return;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1ab0090f8-1771885425178.png"
          alt="Luxury salon interior with soft lighting, pink tones, and elegant styling stations"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark overlay scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />
        {/* Pink tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
      </div>

      {/* Floating decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-widest uppercase">
            <Icon name="SparklesIcon" size={13} className="text-accent" />
            Because You Deserve To Shine
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-hero font-display font-light text-white mb-6 max-w-3xl"
        >
          Premium Salon Experience <span className="italic text-accent">For Modern Women</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-white/75 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10"
        >
          Indulge in luxury treatments crafted by expert stylists. Where beauty meets elegance, and
          every visit feels like a retreat.
        </p>

        {/* Buttons */}
        <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 mb-14">
          <Link
            href="/services#booking"
            className="pink-gradient-btn text-primary-foreground font-semibold px-8 py-3.5 rounded-full text-base inline-flex items-center gap-2"
          >
            <Icon name="CalendarDaysIcon" size={18} className="text-white" />
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="px-8 py-3.5 rounded-full text-base font-semibold text-white border border-white/40 hover:bg-white/15 transition-colors inline-flex items-center gap-2"
          >
            Explore Services
            <Icon name="ArrowRightIcon" size={18} className="text-white" />
          </Link>
        </div>

        {/* Glass Stats Card */}
        <div ref={cardRef} className="glass-card rounded-3xl px-6 py-5 w-full max-w-lg">
          <div className="grid grid-cols-3 divide-x divide-white/20">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center px-4 gap-1">
                <Icon name={stat.icon} size={18} className="text-accent mb-1" />
                <span className="font-display font-semibold text-white text-2xl">{stat.value}</span>
                <span className="text-white/60 text-xs font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="wave-divider">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z" fill="#FFF8F5" />
        </svg>
      </div>
    </section>
  );
}
