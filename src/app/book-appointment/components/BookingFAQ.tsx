'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const faqs = [
  {
    question: 'Do I need to book in advance?',
    answer:
      'Appointments are recommended to avoid waiting, especially for bridal and weekend services.',
  },
  {
    question: 'Can I choose my stylist?',
    answer: 'Yes, you can mention your preferred stylist while requesting the appointment.',
  },
  {
    question: 'Is this appointment confirmed immediately?',
    answer: 'No, this is a request. Our team will confirm your final slot by call or WhatsApp.',
  },
  {
    question: 'Can I reschedule?',
    answer: 'Yes, please call or WhatsApp us before your appointment time.',
  },
];

export default function BookingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding px-4 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            Questions
          </span>
          <h2 className="font-display text-section-title text-foreground font-light">
            Booking <span className="italic text-primary">FAQ</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
              <button
                type="button"
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span
                  className={`font-semibold text-base transition-colors ${openIndex === i ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}
                >
                  {faq.question}
                </span>
                <Icon
                  name={openIndex === i ? 'MinusIcon' : 'PlusIcon'}
                  size={18}
                  className={`shrink-0 ml-4 transition-colors ${openIndex === i ? 'text-primary' : 'text-muted-foreground'}`}
                />
              </button>
              <div className={`faq-content-wrapper ${openIndex === i ? 'open' : ''}`}>
                <div className="px-6 pb-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
