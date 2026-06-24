'use client';

import React, { useEffect, useRef } from 'react';

const steps = [
  {
    num: '1',
    title: 'Send Your Request',
    description: 'Choose your service, preferred date and time.',
  },
  {
    num: '2',
    title: 'We Confirm',
    description: 'Our team calls or messages you to confirm availability.',
  },
  {
    num: '3',
    title: 'Visit & Glow',
    description: 'Arrive at your confirmed time and enjoy your premium salon experience.',
  },
];

export default function WhatHappensNext() {
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
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            How It Works
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            What Happens <span className="italic text-primary">Next</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="bg-card rounded-3xl p-7 border border-border shadow-sm text-center service-card-hover"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mx-auto mb-4">
                <span className="text-white font-display text-lg font-bold">{step.num}</span>
              </div>
              <h3 className="font-semibold text-foreground text-base mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
