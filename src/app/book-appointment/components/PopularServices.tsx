'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

const services = [
  { name: 'Hair Styling', price: 'From ₹1,500', icon: 'ScissorsIcon' },
  { name: 'Facial Treatment', price: 'From ₹2,000', icon: 'SparklesIcon' },
  { name: 'Manicure & Pedicure', price: 'From ₹800', icon: 'HandRaisedIcon' },
  { name: 'Bridal Makeup', price: 'From ₹12,000', icon: 'HeartIcon' },
  { name: 'Hair Spa', price: 'From ₹2,500', icon: 'BeakerIcon' },
  { name: 'Nail Art', price: 'From ₹1,200', icon: 'PaintBrushIcon' },
];

interface PopularServicesProps {
  onSelectService: (name: string) => void;
}

export default function PopularServices({ onSelectService }: PopularServicesProps) {
  return (
    <section className="section-padding px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            Popular Choices
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            Quick <span className="italic text-primary">Service</span> Selection
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Tap a service below to pre-fill your appointment request.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => onSelectService(s.name)}
              className="bg-card rounded-3xl p-5 border border-border shadow-sm text-left service-card-hover group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md mb-3">
                <Icon name={s.icon} size={18} className="text-white" variant="solid" />
              </div>
              <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                {s.name}
              </p>
              <p className="text-primary text-xs font-bold mt-1">{s.price}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
