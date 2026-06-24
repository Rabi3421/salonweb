'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
  {
    name: 'Priya Sharma',
    service: 'Bridal Makeup',
    review:
      "The best salon experience I've ever had. The staff made me feel so special and my bridal look stayed perfect all day.",
    initial: 'P',
  },
  {
    name: 'Neha Patel',
    service: 'Hair Styling',
    review: 'Beautiful ambience, premium service, and amazing styling. I loved the final look.',
    initial: 'N',
  },
  {
    name: 'Aisha Khan',
    service: 'Facial Treatment',
    review: 'Clean, professional and relaxing. My skin felt fresh and glowing after the facial.',
    initial: 'A',
  },
  {
    name: 'Kavita Mehta',
    service: 'Nail Art',
    review: 'The nail art was neat, elegant and exactly what I wanted. Highly recommended.',
    initial: 'K',
  },
  {
    name: 'Riya Shah',
    service: 'Hair Spa',
    review: 'My hair felt soft, shiny and healthy. The consultation was very helpful.',
    initial: 'R',
  },
  {
    name: 'Pooja Desai',
    service: 'Party Makeup',
    review: 'They created a soft glam look that was perfect for my event. Very premium experience.',
    initial: 'P',
  },
  {
    name: 'Anjali Verma',
    service: 'Manicure & Pedicure',
    review: 'Very hygienic and relaxing service. The staff was polite and professional.',
    initial: 'A',
  },
  {
    name: 'Simran Kaur',
    service: 'Hair Color',
    review: 'Loved the color consultation and final result. The shade suited me perfectly.',
    initial: 'S',
  },
  {
    name: 'Meenal Jain',
    service: 'Bridal Package',
    review:
      'The bridal package was well planned and stress-free. Everything was handled beautifully.',
    initial: 'M',
  },
];

export default function TestimonialGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((c) => c && obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            Testimonials
          </span>
          <h2 className="font-display text-section-title text-foreground font-light">
            What Our Clients <span className="italic text-primary">Say</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="bg-card rounded-3xl p-6 border border-border shadow-sm service-card-hover"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Icon
                    key={j}
                    name="StarIcon"
                    size={14}
                    className="text-primary"
                    variant="solid"
                  />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                  <span className="text-white font-display text-sm font-semibold">{t.initial}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-primary text-xs font-medium">{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
