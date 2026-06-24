'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type Category = 'All' | 'Hair' | 'Makeup' | 'Bridal' | 'Nails' | 'Facial' | 'Salon Interior';

const categories: Category[] = [
  'All',
  'Hair',
  'Makeup',
  'Bridal',
  'Nails',
  'Facial',
  'Salon Interior',
];

const galleryItems = [
  {
    title: 'Luxury Salon Interior',
    category: 'Salon Interior' as Category,
    src: 'https://images.unsplash.com/photo-1703792686756-c82bf734c89b',
    height: 'h-72',
  },
  {
    title: 'Elegant Hair Styling Finish',
    category: 'Hair' as Category,
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d8541d94-1775930656878.png',
    height: 'h-56',
  },
  {
    title: 'Bridal Glow Transformation',
    category: 'Bridal' as Category,
    src: 'https://images.unsplash.com/photo-1684867570683-93a966539191',
    height: 'h-64',
  },
  {
    title: 'Premium Facial Care',
    category: 'Facial' as Category,
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_18b6b449e-1772479985833.png',
    height: 'h-56',
  },
  {
    title: 'Modern Nail Art',
    category: 'Nails' as Category,
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_19ff22ea0-1772690996045.png',
    height: 'h-64',
  },
  {
    title: 'Party Makeup Look',
    category: 'Makeup' as Category,
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e',
    height: 'h-72',
  },
  {
    title: 'Hair Spa Experience',
    category: 'Hair' as Category,
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
    height: 'h-56',
  },
  {
    title: 'Bridal Eye Makeup Detail',
    category: 'Bridal' as Category,
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
    height: 'h-64',
  },
  {
    title: 'Clean Beauty Product Setup',
    category: 'Salon Interior' as Category,
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_19e4522e7-1774955102990.png',
    height: 'h-56',
  },
  {
    title: 'Soft Glam Makeup',
    category: 'Makeup' as Category,
    src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2',
    height: 'h-72',
  },
  {
    title: 'French Nail Finish',
    category: 'Nails' as Category,
    src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
    height: 'h-56',
  },
  {
    title: 'Skin Glow Treatment',
    category: 'Facial' as Category,
    src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
    height: 'h-64',
  },
];

export default function GalleryMasonry() {
  const [active, setActive] = useState<Category>('All');
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered =
    active === 'All' ? galleryItems : galleryItems.filter((g) => g.category === active);

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'scale(0.95)';
      const timer = setTimeout(() => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
      }, i * 60);
      return () => clearTimeout(timer);
    });
  }, [active]);

  return (
    <section className="section-padding px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === cat ? 'filter-tab-active' : 'filter-tab-inactive'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map((item, i) => (
            <div
              key={`${item.title}-${active}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="gallery-item relative rounded-3xl overflow-hidden mb-4 break-inside-avoid cursor-pointer"
              style={{
                opacity: 0,
                transform: 'scale(0.95)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`,
              }}
            >
              <div className={`relative ${item.height}`}>
                <AppImage
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="gallery-overlay absolute inset-0 flex items-end p-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center">
                    <Icon name="EyeIcon" size={13} className="text-white" />
                  </div>
                  <div>
                    <span className="text-white font-semibold text-sm block">{item.title}</span>
                    <span className="text-white/70 text-xs">{item.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
