'use client';

import React, { useState, useEffect } from 'react';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import Icon from '@/components/ui/AppIcon';
import { createSalonAppointment } from '@/lib/salon-api';
import {
  getServiceOptions,
  buildAppointmentMessage,
  getContactLinks,
  formatPhoneDisplay,
  buildAppointmentServiceSnapshot,
  toTwentyFourHourTime,
} from '@/lib/public-site-data';

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

interface BookingFormProps {
  prefilledService?: string;
}

export default function BookingForm({ prefilledService }: BookingFormProps) {
  const siteData = usePublicSiteData();
  const serviceOptions = [...getServiceOptions(siteData), ...siteData.packages.map((p) => p.name)];
  const cLinks = getContactLinks(siteData.contact);
  const phoneDisplay = formatPhoneDisplay(siteData.contact.phone);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    text: string;
    appointmentNo?: string;
  } | null>(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const message = buildAppointmentMessage({
      service: formData.service,
      date: formData.date,
      time: formData.time,
      message: formData.message || undefined,
    });

    try {
      const res = await createSalonAppointment({
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email || undefined,
        services: [buildAppointmentServiceSnapshot(siteData, formData.service)],
        date: formData.date,
        startTime: toTwentyFourHourTime(formData.time),
        notes: message,
      });

      setResult({
        success: true,
        text: 'Appointment requested successfully! Our team will contact you soon.',
        appointmentNo: res.data?.appointmentNo,
      });
      setFormData({ name: '', phone: '', email: '', service: '', date: '', time: '', message: '' });
    } catch (err) {
      setResult({
        success: false,
        text:
          (err as Error).message || 'Unable to send request right now. Please call or WhatsApp us.',
      });
    } finally {
      setSubmitting(false);
    }
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
          {result?.success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-5">
                <Icon name="CheckIcon" size={30} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground font-semibold mb-2">
                Request Received!
              </h3>
              <p className="text-muted-foreground mb-3">
                We&apos;ll confirm your appointment via call or WhatsApp shortly.
              </p>
              {result.appointmentNo ? (
                <p className="text-xs text-muted-foreground/60 font-mono">
                  Reference: {result.appointmentNo}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => setResult(null)}
                className="mt-6 px-6 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error banner */}
              {result && !result.success ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                  <p className="font-medium">Unable to send request</p>
                  <p className="mt-1 text-xs text-red-600/70">{result.text}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Please call{' '}
                    <a href={cLinks.tel} className="text-primary font-medium">
                      {phoneDisplay}
                    </a>{' '}
                    or{' '}
                    <a
                      href={cLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium"
                    >
                      WhatsApp us
                    </a>
                    .
                  </p>
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    placeholder={phoneDisplay}
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

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
                disabled={submitting}
                className="w-full pink-gradient-btn text-primary-foreground font-semibold py-4 rounded-2xl text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Icon name="CalendarDaysIcon" size={18} className="text-white" />
                    Request Appointment
                  </>
                )}
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
