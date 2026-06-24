'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1703792686756-c82bf734c89b',
    alt: 'Luxury salon interior with pink walls, pendant lighting and modern styling stations',
    label: 'Salon Interior',
    colSpan: 'lg:col-span-2',
    height: 'h-64 md:h-72',
  },
  {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d8541d94-1775930656878.png',
    alt: 'Expert stylist creating a voluminous blowout hairstyle in a well-lit salon',
    label: 'Hair Styling',
    colSpan: 'lg:col-span-1',
    height: 'h-64 md:h-72',
  },
  {
    src: 'https://images.unsplash.com/photo-1684867570683-93a966539191',
    alt: 'Bride in complete bridal makeup with gold jewelry and a glowing radiant complexion',
    label: 'Bridal Makeup',
    colSpan: 'lg:col-span-1',
    height: 'h-56 md:h-64',
  },
  {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_18b6b449e-1772479985833.png',
    alt: 'Client enjoying a deep-cleansing facial treatment with steam and serums applied',
    label: 'Facial Treatment',
    colSpan: 'lg:col-span-1',
    height: 'h-56 md:h-64',
  },
  {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_19ff22ea0-1772690996045.png',
    alt: 'Artistic nail design with floral motifs and rose gold foil on almond-shaped nails',
    label: 'Nail Art',
    colSpan: 'lg:col-span-1',
    height: 'h-56 md:h-64',
  },
  {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_19e4522e7-1774955102990.png',
    alt: 'Arrangement of premium beauty products including serums, brushes and rose water mist on a marble surface',
    label: 'Beauty Products',
    colSpan: 'lg:col-span-3',
    height: 'h-52 md:h-60',
  },
];

export default function GallerySection() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="section-padding px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold tracking-widest uppercase mb-3">
            Our Work
          </span>
          <h2 className="font-display text-section-title text-foreground font-light mb-4">
            Our <span className="italic text-primary">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A glimpse into our world of beauty and transformations.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={item.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`gallery-item relative rounded-3xl overflow-hidden cursor-pointer ${item.colSpan} ${item.height}`}
              style={{
                opacity: 0,
                transform: 'scale(0.95)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
              }}
            >
              <AppImage
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div className="gallery-overlay absolute inset-0 flex items-end p-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                    <Icon name="EyeIcon" size={12} className="text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
