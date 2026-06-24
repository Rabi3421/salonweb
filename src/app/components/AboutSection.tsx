'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '15+', label: 'Awards Won' },
  { value: '20+', label: 'Expert Stylists' },
  { value: '5K+', label: 'Happy Clients' },
];

export default function AboutSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image Collage */}
          <div
            ref={leftRef}
            className="relative"
            style={{
              opacity: 0,
              transform: 'translateY(40px)',
              transition:
                'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-56 rounded-3xl overflow-hidden">
                  <AppImage
                    src="https://images.unsplash.com/photo-1703792686756-c82bf734c89b"
                    alt="Elegant salon interior with pink and white decor and modern styling chairs"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-40 rounded-3xl overflow-hidden">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1deedb7f9-1769009931732.png"
                    alt="Makeup artist applying foundation to a client in a bright salon room"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-40 rounded-3xl overflow-hidden">
                  <AppImage
                    src="https://images.unsplash.com/photo-1731355771422-cc08ed7897ad"
                    alt="Relaxing facial treatment session in a clean white spa room"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-56 rounded-3xl overflow-hidden">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1fcd410e3-1768688008561.png"
                    alt="Nail technician carefully painting nails with pink nail polish"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 whitespace-nowrap">
              <Icon name="SparklesIcon" size={16} className="text-white" />
              <span className="text-sm font-semibold">Since 2014</span>
            </div>
          </div>

          {/* Right: Content */}
          <div
            ref={rightRef}
            style={{
              opacity: 0,
              transform: 'translateY(40px)',
              transition:
                'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
            }}
          >
            <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-4">
              About Us
            </span>
            <h2 className="font-display text-section-title text-foreground font-light mb-6">
              Crafting Beauty <span className="italic text-primary">Since 2014</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              At Rosé Luxe, we believe every woman deserves to feel beautiful and confident. Our
              journey began with a simple vision — to create a sanctuary where luxury meets comfort,
              and beauty is celebrated in all its forms.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              With trained stylists and aesthetic experts, we bring premium hair, skin, nail, and
              bridal services with meticulous attention to detail that makes every visit
              unforgettable.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-secondary/50 rounded-2xl p-4 border border-border"
                >
                  <div className="font-display text-3xl font-semibold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="pink-gradient-btn text-primary-foreground font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2"
            >
              Know More About Us
              <Icon name="ArrowRightIcon" size={16} className="text-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
