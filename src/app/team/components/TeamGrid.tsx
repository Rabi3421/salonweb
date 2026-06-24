'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const team = [
  {
    name: 'Ananya Sharma',
    role: 'Senior Hair Stylist',
    experience: '8+ Years',
    specialties: ['Hair Styling', 'Hair Spa', 'Hair Color'],
    bio: 'Known for elegant styling, smooth finishes, and personalized hair care consultations.',
    initial: 'A',
  },
  {
    name: 'Meera Kapoor',
    role: 'Bridal Makeup Artist',
    experience: '10+ Years',
    specialties: ['Bridal Makeup', 'Party Makeup', 'Draping'],
    bio: 'Creates long-lasting bridal looks that feel graceful, confident, and camera-ready.',
    initial: 'M',
  },
  {
    name: 'Riya Patel',
    role: 'Nail Artist',
    experience: '5+ Years',
    specialties: ['Nail Art', 'Manicure', 'Pedicure'],
    bio: 'Loves creating detailed nail designs with a premium, polished finish.',
    initial: 'R',
  },
  {
    name: 'Sana Khan',
    role: 'Skin & Facial Expert',
    experience: '7+ Years',
    specialties: ['Facials', 'Cleanup', 'Skin Glow Treatments'],
    bio: 'Focuses on gentle skin care, glow treatments, and relaxing facial experiences.',
    initial: 'S',
  },
  {
    name: 'Kavya Mehta',
    role: 'Hair Color Specialist',
    experience: '6+ Years',
    specialties: ['Global Color', 'Highlights', 'Balayage'],
    bio: 'Expert in modern color tones, soft blends, and hair-safe transformations.',
    initial: 'K',
  },
  {
    name: 'Nisha Rao',
    role: 'Salon Experience Manager',
    experience: '9+ Years',
    specialties: ['Client Care', 'Consultation', 'Appointment Experience'],
    bio: 'Ensures every client feels welcomed, comfortable, and cared for.',
    initial: 'N',
  },
];

export default function TeamGrid() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="bg-card rounded-4xl p-7 border border-border shadow-sm service-card-hover"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shrink-0">
                  <span className="text-white font-display text-2xl font-semibold">
                    {member.initial}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </div>
              </div>

              {/* Experience badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-xs font-semibold text-primary mb-4">
                <Icon name="ClockIcon" size={12} className="text-primary" />
                {member.experience}
              </div>

              {/* Bio */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {member.specialties.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-full bg-secondary/60 text-foreground/70 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/book-appointment"
                className="w-full pink-gradient-btn text-primary-foreground text-sm font-semibold py-2.5 rounded-full flex items-center justify-center gap-1.5"
              >
                Book With Expert
                <Icon name="ArrowRightIcon" size={14} className="text-white" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
