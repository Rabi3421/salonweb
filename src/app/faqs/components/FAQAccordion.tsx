'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type Category = 'All' | 'Booking' | 'Services' | 'Bridal' | 'Hygiene' | 'Payments' | 'Rescheduling';
const categories: Category[] = [
  'All',
  'Booking',
  'Services',
  'Bridal',
  'Hygiene',
  'Payments',
  'Rescheduling',
];

const faqs = [
  {
    q: 'Do I need to book an appointment?',
    a: 'Appointments are recommended to avoid waiting, especially on weekends and for bridal services.',
    cat: 'Booking' as Category,
  },
  {
    q: 'How do I request an appointment?',
    a: 'You can use the Book Appointment page, call us, or message us on WhatsApp. Our team will confirm your final slot.',
    cat: 'Booking' as Category,
  },
  {
    q: 'Is my appointment confirmed immediately online?',
    a: 'Online submission is an appointment request. Our team confirms availability by call or WhatsApp.',
    cat: 'Booking' as Category,
  },
  {
    q: 'Can I choose my stylist?',
    a: 'Yes, you can mention your preferred stylist while booking. Availability will be confirmed by our team.',
    cat: 'Services' as Category,
  },
  {
    q: 'How do I know which service is right for me?',
    a: 'Our experts provide consultation before the service to understand your hair, skin, style and comfort.',
    cat: 'Services' as Category,
  },
  {
    q: 'Do you offer bridal trials?',
    a: 'Yes, bridal trials are available with selected packages. Please contact us in advance.',
    cat: 'Bridal' as Category,
  },
  {
    q: 'How early should I book bridal makeup?',
    a: 'We recommend booking as early as possible, especially during wedding seasons.',
    cat: 'Bridal' as Category,
  },
  {
    q: 'Are your tools sanitized?',
    a: 'Yes, we follow strict hygiene standards and sanitize tools before use.',
    cat: 'Hygiene' as Category,
  },
  {
    q: 'Do you use branded products?',
    a: 'We use trusted professional-grade beauty products selected for quality and safety.',
    cat: 'Hygiene' as Category,
  },
  {
    q: 'Do you accept UPI?',
    a: 'Yes, UPI and other common payment modes are accepted at the salon.',
    cat: 'Payments' as Category,
  },
  {
    q: 'Can I reschedule my appointment?',
    a: 'Yes, please call or WhatsApp us before your appointment time so we can help you reschedule.',
    cat: 'Rescheduling' as Category,
  },
  {
    q: 'What if I am late?',
    a: 'Please inform us as soon as possible. We will try to adjust your slot depending on availability.',
    cat: 'Rescheduling' as Category,
  },
];

export default function FAQAccordion() {
  const [activeCat, setActiveCat] = useState<Category>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = activeCat === 'All' ? faqs : faqs.filter((f) => f.cat === activeCat);

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCat(cat);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCat === cat ? 'filter-tab-active' : 'filter-tab-inactive'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <div key={faq.q} className="bg-card border border-border rounded-2xl overflow-hidden">
              <button
                type="button"
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span
                  className={`font-semibold text-base transition-colors ${openIndex === i ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}
                >
                  {faq.q}
                </span>
                <Icon
                  name={openIndex === i ? 'MinusIcon' : 'PlusIcon'}
                  size={18}
                  className={`shrink-0 ml-4 transition-colors ${openIndex === i ? 'text-primary' : 'text-muted-foreground'}`}
                />
              </button>
              <div className={`faq-content-wrapper ${openIndex === i ? 'open' : ''}`}>
                <div className="px-6 pb-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
