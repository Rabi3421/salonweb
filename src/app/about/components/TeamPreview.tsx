'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useCmsSection } from '@/components/CmsPageProvider';
import { shouldRenderSection, sectionText } from '@/lib/cms-mappers';

const team = [
  {
    name: 'Ananya Sharma',
    role: 'Senior Hair Stylist',
    experience: '8+ Years',
    specialties: 'Hair Styling, Hair Spa, Hair Color',
    initial: 'A',
  },
  {
    name: 'Meera Kapoor',
    role: 'Bridal Makeup Artist',
    experience: '10+ Years',
    specialties: 'Bridal Makeup, Party Makeup, Draping',
    initial: 'M',
  },
  {
    name: 'Riya Patel',
    role: 'Nail Artist',
    experience: '5+ Years',
    specialties: 'Nail Art, Manicure, Pedicure',
    initial: 'R',
  },
  {
    name: 'Sana Khan',
    role: 'Skin & Facial Expert',
    experience: '7+ Years',
    specialties: 'Facials, Cleanup, Skin Glow Treatments',
    initial: 'S',
  },
];

export default function TeamPreview() {
  const cms = useCmsSection('teamPreview');
  if (!shouldRenderSection(cms)) return null;
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            {sectionText(cms, 'eyebrow', 'Meet Our Experts')}
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            {sectionText(cms, 'title', 'Skilled Stylists & Beauty Specialists')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Our team of experts brings passion, precision, and years of experience to every
            appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="bg-card rounded-4xl p-6 border border-border shadow-sm text-center service-card-hover"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
              }}
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mx-auto mb-4">
                <span className="text-white font-display text-2xl font-semibold">
                  {member.initial}
                </span>
              </div>

              <h3 className="font-semibold text-foreground text-base">{member.name}</h3>
              <p className="text-primary text-sm font-medium mt-1">{member.role}</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs">
                  <Icon name="ClockIcon" size={12} className="text-primary" />
                  {member.experience}
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {member.specialties}
                </p>
              </div>

              <Link
                href="/services#booking"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Book With Expert
                <Icon name="ArrowRightIcon" size={12} className="text-primary" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
