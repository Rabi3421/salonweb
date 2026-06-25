'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useCmsSection } from '@/components/CmsPageProvider';
import { shouldRenderSection, sectionText, sectionItems } from '@/lib/cms-mappers';

const defaultTestimonials = [
  {
    quote:
      "The best salon experience I've ever had. The staff made me feel so special and the results were absolutely stunning.",
    name: 'Priya Sharma',
    role: 'Regular Client',
    initial: 'P',
    color: 'from-pink-400 to-rose-500',
  },
  {
    quote:
      'Beautiful ambience, premium service, and the most amazing bridal makeup I could have asked for on my wedding day.',
    name: 'Neha Patel',
    role: 'Bridal Client',
    initial: 'N',
    color: 'from-rose-400 to-pink-600',
  },
  {
    quote:
      'Clean, professional and always on time. The hair spa treatment left my hair silky smooth. Highly recommended!',
    name: 'Aisha Khan',
    role: 'Regular Client',
    initial: 'A',
    color: 'from-fuchsia-400 to-pink-500',
  },
];

export default function TestimonialsSection() {
  const cms = useCmsSection('testimonials');
  if (!shouldRenderSection(cms)) return null;
  const eyebrow = sectionText(cms, 'eyebrow', 'Happy Clients');
  const title = sectionText(cms, 'title', 'Loved By Our Clients');
  const testimonials = sectionItems(cms, defaultTestimonials) as { quote: string; name: string; role: string; initial: string; color: string }[];
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
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            {eyebrow}
          </span>
          <h2 className="font-display text-section-title text-foreground font-light">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="bg-card border border-border rounded-3xl p-7 service-card-hover"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Icon
                    key={si}
                    name="StarIcon"
                    size={16}
                    className="text-primary"
                    variant="solid"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="mb-6 relative">
                <Icon
                  name="ChatBubbleLeftEllipsisIcon"
                  size={28}
                  className="text-secondary mb-3"
                  variant="solid"
                />
                <p className="text-foreground/80 text-sm leading-relaxed italic">{t.quote}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
