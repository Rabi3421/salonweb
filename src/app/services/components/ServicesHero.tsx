import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ServicesHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1eec71629-1767390409387.png"
          alt="Makeup artist and client in a bright luxury salon with soft pink ambient lighting"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-widest uppercase mb-5">
          <Icon name="SparklesIcon" size={13} className="text-accent" />
          What We Offer
        </span>
        <h1 className="font-display text-hero font-light text-white mb-5">
          Luxury Beauty Services <span className="italic text-accent">Tailored For You</span>
        </h1>
        <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Explore our premium treatments, transparent pricing, and expert salon care — then request
          your appointment in one simple step.
        </p>
        <Link
          href="#booking"
          className="pink-gradient-btn text-primary-foreground font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2"
        >
          <Icon name="CalendarDaysIcon" size={18} className="text-white" />
          Book Now
        </Link>
      </div>

      <div className="wave-divider">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path d="M0 30 C360 60 1080 0 1440 30 L1440 60 L0 60 Z" fill="#FFF8F5" />
        </svg>
      </div>
    </section>
  );
}
