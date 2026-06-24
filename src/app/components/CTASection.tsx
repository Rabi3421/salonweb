import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { getPublicSiteData, getContactLinks } from '@/lib/public-site-data';

const cl = getContactLinks(getPublicSiteData().contact);

export default function CTASection() {
  return (
    <section id="contact" className="px-4 py-20 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-5xl overflow-hidden bg-gradient-to-br from-primary via-rose-500 to-pink-500 p-12 md:p-16 text-center">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <Icon name="SparklesIcon" size={26} className="text-white" />
              </div>
            </div>
            <h2 className="font-display text-section-title text-white font-light mb-5">
              Ready For Your Beauty <span className="italic">Transformation?</span>
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              Book your appointment today and experience premium salon care designed around you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-appointment"
                className="bg-white text-primary font-semibold px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-lg"
              >
                <Icon name="CalendarDaysIcon" size={18} className="text-primary" />
                Book Appointment
              </Link>
              <a
                href={cl.tel}
                className="border border-white/50 text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
              >
                <Icon name="PhoneIcon" size={18} className="text-white" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
