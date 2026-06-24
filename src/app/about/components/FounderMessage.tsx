import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function FounderMessage() {
  return (
    <section className="section-padding px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-5xl p-8 md:p-14 shadow-sm border border-border relative overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center">
            <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
              Founder Message
            </span>
            <h2 className="font-display text-section-title text-foreground font-light mb-8">
              Beauty Should Feel <span className="italic text-primary">Personal</span>
            </h2>

            <div className="max-w-2xl mx-auto">
              <div className="relative mb-8">
                <Icon
                  name="ChatBubbleBottomCenterTextIcon"
                  size={36}
                  className="text-primary/20 mx-auto mb-4"
                />
                <p className="text-muted-foreground text-lg leading-relaxed italic font-light">
                  &ldquo;Our vision is to make every visit feel special. Whether it is a quick
                  grooming session, a bridal transformation, or a complete beauty day, we want every
                  client to walk out feeling confident and cared for.&rdquo;
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <span className="text-white font-display text-xl font-semibold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-base">Ananya Sharma</p>
                  <p className="text-muted-foreground text-sm">Founder & Creative Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
