'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

type Category = 'All' | 'Hair' | 'Skin' | 'Nails' | 'Makeup' | 'Bridal' | 'Spa';

const categories: Category[] = ['All', 'Hair', 'Skin', 'Nails', 'Makeup', 'Bridal', 'Spa'];

const allServices = [
  {
    title: 'Hair Styling',
    category: 'Hair' as Category,
    price: 'From ₹1,500',
    duration: '45–60 min',
    description: 'Elegant styling, curls, blow dry, smooth finish for everyday or event looks.',
    icon: 'ScissorsIcon' as const,
    popular: false,
  },
  {
    title: 'Hair Spa',
    category: 'Hair' as Category,
    price: 'From ₹2,500',
    duration: '60 min',
    description: 'Deep nourishment therapy to restore shine, softness and scalp health.',
    icon: 'BeakerIcon' as const,
    popular: true,
  },
  {
    title: 'Hair Color',
    category: 'Hair' as Category,
    price: 'From ₹3,500',
    duration: '90–150 min',
    description: 'Premium coloring, highlights, global color and expert consultation.',
    icon: 'PaintBrushIcon' as const,
    popular: false,
  },
  {
    title: 'Facial Treatment',
    category: 'Skin' as Category,
    price: 'From ₹2,000',
    duration: '60 min',
    description: 'Skin-focused facial using premium products for glow and hydration.',
    icon: 'SparklesIcon' as const,
    popular: true,
  },
  {
    title: 'Cleanup',
    category: 'Skin' as Category,
    price: 'From ₹1,200',
    duration: '35 min',
    description: 'Quick skin refresh with cleansing, exfoliation and soothing care.',
    icon: 'SunIcon' as const,
    popular: false,
  },
  {
    title: 'Manicure & Pedicure',
    category: 'Nails' as Category,
    price: 'From ₹800',
    duration: '45 min',
    description: 'Relaxing hand and foot care with shaping, cleaning and polish.',
    icon: 'HandRaisedIcon' as const,
    popular: false,
  },
  {
    title: 'Nail Art',
    category: 'Nails' as Category,
    price: 'From ₹1,200',
    duration: '60 min',
    description: 'Trendy nail designs with premium finish and long-lasting shine.',
    icon: 'PaintBrushIcon' as const,
    popular: true,
  },
  {
    title: 'Bridal Makeup',
    category: 'Bridal' as Category,
    price: 'From ₹12,000',
    duration: '180 min',
    description: 'Complete bridal look with consultation, makeup, hair styling and draping.',
    icon: 'HeartIcon' as const,
    popular: false,
  },
  {
    title: 'Party Makeup',
    category: 'Makeup' as Category,
    price: 'From ₹4,000',
    duration: '90 min',
    description: 'Glamorous event-ready makeup for parties, functions and celebrations.',
    icon: 'StarIcon' as const,
    popular: false,
  },
  {
    title: 'Waxing & Threading',
    category: 'Spa' as Category,
    price: 'From ₹500',
    duration: '30 min',
    description: 'Hygienic grooming services with gentle care and clean finish.',
    icon: 'ShieldCheckIcon' as const,
    popular: false,
  },
];

const categoryColors: Record<Category, string> = {
  All: 'bg-secondary text-primary',
  Hair: 'bg-amber-50 text-amber-700',
  Skin: 'bg-green-50 text-green-700',
  Nails: 'bg-pink-50 text-pink-700',
  Makeup: 'bg-purple-50 text-purple-700',
  Bridal: 'bg-rose-50 text-rose-700',
  Spa: 'bg-blue-50 text-blue-700',
};

export default function ServiceCatalog() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered =
    activeCategory === 'All'
      ? allServices
      : allServices.filter((s) => s.category === activeCategory);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      const timer = setTimeout(() => {
        if (!card) return;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
      return () => clearTimeout(timer);
    });
  }, [activeCategory]);

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat ? 'filter-tab-active' : 'filter-tab-inactive'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service, i) => (
            <div
              key={`${service.title}-${activeCategory}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="service-card-hover bg-card border border-border rounded-3xl p-6"
              style={{
                opacity: 1,
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                    <Icon name={service.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base leading-tight">
                      {service.title}
                    </h3>
                    <span
                      className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[service.category]}`}
                    >
                      {service.category}
                    </span>
                  </div>
                </div>
                {service.popular && (
                  <span className="text-xs font-bold text-primary bg-secondary px-2.5 py-1 rounded-full shrink-0">
                    Popular
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Meta + CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-bold text-primary text-base">{service.price}</p>
                  <p className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                    <Icon name="ClockIcon" size={11} className="text-muted-foreground" />
                    {service.duration}
                  </p>
                </div>
                <Link
                  href="#booking"
                  className="pink-gradient-btn text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center gap-1"
                >
                  Book
                  <Icon name="ArrowRightIcon" size={12} className="text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
