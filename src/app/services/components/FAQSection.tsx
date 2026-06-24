'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const faqs = [
  {
    question: 'Do I need to book an appointment?',
    answer:
      'Yes, appointments are highly recommended to avoid waiting and ensure your preferred stylist is available. Walk-ins are welcome based on availability.',
  },
  {
    question: 'Can I choose my stylist?',
    answer:
      'Yes, you can request a preferred stylist while booking your appointment. We will do our best to accommodate your request based on their availability.',
  },
  {
    question: 'Do you offer bridal trials?',
    answer:
      'Yes, bridal trials are available with our selected bridal packages. We recommend scheduling your trial 2–4 weeks before your wedding day.',
  },
  {
    question: 'Are your tools sanitized?',
    answer:
      'Absolutely. We follow strict hygiene and sanitization practices. All tools and equipment are thoroughly cleaned and sterilized between every client.',
  },
  {
    question: 'Can I reschedule my appointment?',
    answer:
      'Yes, you can reschedule your appointment by calling or messaging us on WhatsApp at least 2 hours before your scheduled time. We understand plans change.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-padding px-4 bg-secondary/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            FAQ
          </span>
          <h2 className="font-display text-section-title text-foreground font-light">
            Common <span className="italic text-primary">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => toggle(i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group"
                aria-expanded={openIndex === i}
              >
                <span
                  className={`font-semibold text-base transition-colors ${openIndex === i ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}
                >
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
                    openIndex === i ? 'bg-primary rotate-45' : 'bg-secondary'
                  }`}
                >
                  <Icon
                    name="PlusIcon"
                    size={16}
                    className={openIndex === i ? 'text-white' : 'text-primary'}
                  />
                </div>
              </button>

              <div className={`faq-content-wrapper ${openIndex === i ? 'open' : ''}`}>
                <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
