'use client';

import React, { useEffect, useRef } from 'react';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '20+', label: 'Expert Stylists' },
  { value: '6000+', label: 'Happy Clients' },
  { value: '15+', label: 'Awards Won' },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition =
      'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 px-4 bg-secondary/30">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="bg-card rounded-5xl p-8 md:p-12 shadow-sm border border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm font-medium mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
