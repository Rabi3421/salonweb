'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const serviceOptions = [
  'Hair Styling',
  'Hair Spa',
  'Hair Color',
  'Facial Treatment',
  'Cleanup',
  'Manicure & Pedicure',
  'Nail Art',
  'Bridal Makeup',
  'Party Makeup',
  'Waxing & Threading',
  'Bridal Glow Package',
  'Monthly Grooming Package',
  'Party Ready Package',
];

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="booking" className="section-padding px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            Appointment
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            Request Your <span className="italic text-primary">Appointment</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Share your preferred service and time. Our team will confirm your appointment by call or
            WhatsApp.
          </p>
        </div>

        <div className="bg-card rounded-4xl border border-border shadow-sm p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-5">
                <Icon name="CheckIcon" size={30} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground font-semibold mb-2">
                Request Received!
              </h3>
              <p className="text-muted-foreground">
                We&apos;ll confirm your appointment via call or WhatsApp shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Priya Sharma"
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="priya@email.com"
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Preferred Service <span className="text-primary">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Preferred Date <span className="text-primary">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Preferred Time <span className="text-primary">*</span>
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
                  >
                    <option value="" disabled>
                      Select time...
                    </option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any specific requests or preferences..."
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full pink-gradient-btn text-primary-foreground font-semibold py-4 rounded-2xl text-base flex items-center justify-center gap-2"
              >
                <Icon name="CalendarDaysIcon" size={18} className="text-white" />
                Request Appointment
              </button>

              <p className="text-center text-xs text-muted-foreground">
                We&apos;ll confirm your slot via WhatsApp or call within 1 hour.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
