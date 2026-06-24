'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const services = [
  {
    title: 'Hair Styling',
    price: 'From ₹1,500',
    description:
      'From elegant updos to trendy cuts, our expert stylists create looks that turn heads.',
    image: 'https://images.unsplash.com/photo-1616604602676-9b36b3c46c18',
    alt: "Stylist working on a client's hair in a bright, modern salon interior",
    icon: 'ScissorsIcon' as const,
  },
  {
    title: 'Facial Treatment',
    price: 'From ₹2,000',
    description: 'Rejuvenating facials using premium products for radiant, glowing skin.',
    image: 'https://images.unsplash.com/photo-1684014286330-ddbeb4a40c92',
    alt: 'Client receiving a relaxing facial treatment with white towels and rose petals',
    icon: 'SparklesIcon' as const,
  },
  {
    title: 'Manicure & Pedicure',
    price: 'From ₹800',
    description: 'Pamper your hands and feet with luxurious nail care treatments.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fb0d8e8c-1767272516767.png',
    alt: 'Close-up of a manicure session with pink nail polish in a clean salon setting',
    icon: 'HandRaisedIcon' as const,
  },
  {
    title: 'Bridal Makeup',
    price: 'From ₹12,000',
    description: 'Complete bridal transformation for your most special day.',
    image: 'https://images.unsplash.com/photo-1701385169240-b82e0fc2e233',
    alt: 'Bride in full makeup and bridal attire with elegant styling',
    icon: 'HeartIcon' as const,
  },
  {
    title: 'Hair Spa',
    price: 'From ₹2,500',
    description: 'Deep nourishment therapy for soft, shiny and healthy hair.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f04b0e7c-1764637212459.png',
    alt: 'Relaxing hair spa treatment with oils and serums being applied to hair',
    icon: 'BeakerIcon' as const,
  },
  {
    title: 'Nail Art',
    price: 'From ₹1,200',
    description: 'Trendy nail designs with premium finish and long-lasting shine.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16403152e-1772969434442.png',
    alt: 'Detailed nail art with floral patterns and glitter in pink and gold tones',
    icon: 'PaintBrushIcon' as const,
  },
];

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section-padding bg-background px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            What We Offer
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            Our Premium <span className="italic text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Luxury treatments tailored for you, delivered by skilled professionals.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="service-card-hover bg-card rounded-3xl overflow-hidden border border-border"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, box-shadow 0.4s ease`,
              }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <AppImage
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {service.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Icon name={service.icon} size={15} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-card-title">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href="/services#booking"
                  className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-3 transition-all"
                >
                  Book Now
                  <Icon name="ArrowRightIcon" size={14} className="text-primary" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="pink-gradient-btn text-primary-foreground font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2"
          >
            View All Services
            <Icon name="ArrowRightIcon" size={16} className="text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
