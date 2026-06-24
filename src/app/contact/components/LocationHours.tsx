import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { getPublicSiteData, getContactLinks, formatPhoneDisplay } from '@/lib/public-site-data';

const sd = getPublicSiteData();
const cl = getContactLinks(sd.contact);

export default function LocationHours() {
  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map placeholder */}
        <div className="bg-card rounded-4xl border border-border shadow-sm overflow-hidden">
          <div className="h-72 lg:h-full min-h-[280px] bg-secondary/50 flex flex-col items-center justify-center text-center p-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mb-4">
              <Icon name="MapPinIcon" size={24} className="text-white" variant="solid" />
            </div>
            <p className="font-display text-lg font-semibold text-foreground mb-1">
              {sd.contact.mapLabel}
            </p>
            <p className="text-muted-foreground text-sm">Google Map will be embedded here</p>
          </div>
        </div>

        {/* Details */}
        <div className="bg-card rounded-4xl border border-border shadow-sm p-8">
          <h3 className="font-display text-xl font-semibold text-foreground mb-6">Visit & Hours</h3>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Icon name="MapPinIcon" size={18} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Address</p>
                <p className="text-muted-foreground text-sm mt-0.5">{sd.contact.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="ClockIcon" size={18} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Opening Hours</p>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {sd.contact.openingHours.join(' · ')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="PhoneIcon" size={18} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Phone</p>
                <a
                  href={cl.tel}
                  className="text-primary text-sm mt-0.5 hover:text-primary/80 transition-colors"
                >
                  {formatPhoneDisplay(sd.contact.phone)}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="EnvelopeIcon" size={18} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Email</p>
                <a
                  href={cl.mailto}
                  className="text-primary text-sm mt-0.5 hover:text-primary/80 transition-colors"
                >
                  {sd.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
