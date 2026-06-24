'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-bottom-cta fixed bottom-0 left-0 right-0 z-40 bg-card md:hidden px-4 py-3 flex gap-2">
      <a
        href="tel:+919876543210"
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm"
      >
        <Icon name="PhoneIcon" size={16} className="text-primary" />
        Call
      </a>
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm"
      >
        <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-primary" />
        WhatsApp
      </a>
      <Link
        href="/services#booking"
        className="flex-2 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl pink-gradient-btn text-primary-foreground font-semibold text-sm"
      >
        <Icon name="CalendarDaysIcon" size={16} className="text-white" />
        Book Now
      </Link>
    </div>
  );
}
