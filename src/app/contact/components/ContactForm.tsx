'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { createSalonEnquiry } from '@/lib/salon-api';
import { getPublicSiteData, getContactLinks, formatPhoneDisplay } from '@/lib/public-site-data';

const siteData = getPublicSiteData();
const cLinks = getContactLinks(siteData.contact);
const phoneDisplay = formatPhoneDisplay(siteData.contact.phone);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    text: string;
    enquiryId?: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await createSalonEnquiry({
        type: 'contact',
        name: formData.name,
        phone: formData.phone || undefined,
        email: formData.email || undefined,
        message: formData.message,
        source: 'salonweb_contact_page',
      });
      setResult({
        success: true,
        text: 'Message sent successfully! Our team will contact you soon.',
        enquiryId: res.data?.enquiryId,
      });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setResult({
        success: false,
        text:
          (err as Error).message || 'Unable to send message right now. Please call or WhatsApp us.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="section-padding px-4 bg-secondary/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            Send A Message
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            We&apos;d Love To <span className="italic text-primary">Hear From You</span>
          </h2>
        </div>

        <div className="bg-card rounded-4xl border border-border shadow-sm p-8 md:p-10">
          {result?.success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-5">
                <Icon name="CheckIcon" size={30} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground font-semibold mb-2">
                Message Sent!
              </h3>
              <p className="text-muted-foreground mb-3">
                Our team will get back to you shortly via call or WhatsApp.
              </p>
              {result.enquiryId ? (
                <p className="text-xs text-muted-foreground/60 font-mono">
                  Reference: {result.enquiryId}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => setResult(null)}
                className="mt-6 px-6 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {result && !result.success ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                  <p className="font-medium">Unable to send message</p>
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
                    placeholder="Your name"
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
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can we help you?"
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
                    <Icon name="PaperAirplaneIcon" size={18} className="text-white" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
