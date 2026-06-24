import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function PackagesCTA() {
  return (
    <section className="px-4 py-20 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-5xl overflow-hidden bg-gradient-to-br from-primary via-rose-500 to-pink-500 p-12 md:p-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <Icon name="GiftIcon" size={26} className="text-white" />
              </div>
            </div>
            <h2 className="font-display text-section-title text-white font-light mb-5">
              Not Sure Which <span className="italic">Package?</span>
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              Send us your occasion and beauty goals. Our team will recommend the best package for
              you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary font-semibold px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-lg"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={18} className="text-primary" />
                Request Recommendation
              </Link>
              <Link
                href="/book-appointment"
                className="border border-white/50 text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
              >
                <Icon name="CalendarDaysIcon" size={18} className="text-white" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
