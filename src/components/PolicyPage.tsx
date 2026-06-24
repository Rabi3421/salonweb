'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

interface PolicySection {
  title: string;
  content: string | string[];
}

interface PolicyPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: PolicySection[];
  notice?: string;
}

export default function PolicyPage({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  sections,
  notice,
}: PolicyPageProps) {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition =
      'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }, []);

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-14 px-4">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] blob-pink pointer-events-none" />
          <div ref={headRef} className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <Icon name="DocumentTextIcon" size={13} className="text-primary" />
              {eyebrow}
            </span>
            <h1 className="font-display text-section-title text-foreground font-light">{title}</h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto mt-4">
              {subtitle}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-3">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding px-4 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-4xl border border-border shadow-sm p-8 md:p-12">
              {notice ? (
                <div className="rounded-2xl bg-secondary/60 border border-border px-5 py-4 mb-8">
                  <p className="text-xs text-primary font-semibold flex items-center gap-1.5">
                    <Icon name="InformationCircleIcon" size={14} className="text-primary" />
                    Note
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{notice}</p>
                </div>
              ) : null}

              <div className="space-y-8">
                {sections.map((section, i) => (
                  <div key={i}>
                    <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                      <span className="text-primary mr-2">{i + 1}.</span>
                      {section.title}
                    </h2>
                    {Array.isArray(section.content) ? (
                      section.content.map((p, j) => (
                        <p key={j} className="text-muted-foreground text-sm leading-relaxed mb-2">
                          {p}
                        </p>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 bg-secondary/30">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Have Questions?
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Reach out to our team for any clarification about our policies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="pink-gradient-btn text-primary-foreground font-semibold px-7 py-3 rounded-full inline-flex items-center justify-center gap-2"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-white" />
                Contact Us
              </Link>
              <Link
                href="/book-appointment"
                className="border border-border text-foreground font-semibold px-7 py-3 rounded-full inline-flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
              >
                <Icon name="CalendarDaysIcon" size={16} className="text-primary" />
                Book Appointment
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
