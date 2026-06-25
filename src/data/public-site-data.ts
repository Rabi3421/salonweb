import type { PublicSiteData } from '@/types/public-site';

export const fallbackPublicSiteData: PublicSiteData = {
  brand: {
    name: 'Salon',
    fullName: 'Salon',
    tagline: 'Welcome to the salon',
    shortDescription: 'Beauty services, packages, and appointments managed by the salon team.',
    logoText: 'Salon',
    rating: '4.9',
    happyClients: 'Clients',
    location: '',
  },

  contact: {
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    state: '',
    openingHours: ['Mon–Sat: 9:00 AM – 8:00 PM', 'Sunday: 10:00 AM – 6:00 PM'],
    mapLabel: 'Salon',
  },

  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],

  services: [
    {
      slug: 'hair-styling',
      title: 'Hair Styling',
      category: 'Hair',
      description:
        'From elegant updos to trendy cuts, our expert stylists create looks that turn heads.',
      price: 'From ₹1,500',
      duration: '60 min',
      featured: true,
    },
    {
      slug: 'hair-spa',
      title: 'Hair Spa',
      category: 'Hair',
      description: 'Deep conditioning and nourishing treatments for silky, healthy hair.',
      price: 'From ₹2,500',
      duration: '45 min',
    },
    {
      slug: 'hair-color',
      title: 'Hair Color',
      category: 'Hair',
      description: 'Global color, highlights, balayage and creative color by experts.',
      price: 'From ₹3,000',
      duration: '90 min',
    },
    {
      slug: 'facial-treatment',
      title: 'Facial Treatment',
      category: 'Skin',
      description: 'Rejuvenating facials using premium products for radiant, glowing skin.',
      price: 'From ₹2,000',
      duration: '45 min',
      featured: true,
    },
    {
      slug: 'cleanup',
      title: 'Cleanup',
      category: 'Skin',
      description: 'Quick cleansing and brightening for fresh, clear skin.',
      price: 'From ₹800',
      duration: '30 min',
    },
    {
      slug: 'manicure-pedicure',
      title: 'Manicure & Pedicure',
      category: 'Nails',
      description: 'Pamper your hands and feet with our luxurious nail care treatments.',
      price: 'From ₹800',
      duration: '60 min',
      featured: true,
    },
    {
      slug: 'nail-art',
      title: 'Nail Art',
      category: 'Nails',
      description: 'Express your style with custom nail art designs by our creative artists.',
      price: 'From ₹1,200',
      duration: '30 min',
    },
    {
      slug: 'bridal-makeup',
      title: 'Bridal Makeup',
      category: 'Bridal',
      description: 'Make your special day unforgettable with our premium bridal packages.',
      price: 'From ₹12,000',
      duration: '180 min',
      featured: true,
    },
    {
      slug: 'party-makeup',
      title: 'Party Makeup',
      category: 'Makeup',
      description: 'Soft glam, bold or natural — perfect looks for every occasion.',
      price: 'From ₹3,000',
      duration: '60 min',
    },
    {
      slug: 'waxing-threading',
      title: 'Waxing & Threading',
      category: 'Grooming',
      description: 'Clean, gentle and precise grooming services.',
      price: 'From ₹200',
      duration: '30 min',
    },
  ],

  serviceCategories: ['All', 'Hair', 'Skin', 'Nails', 'Makeup', 'Bridal', 'Grooming'],

  whyChooseUs: [
    {
      icon: 'StarIcon',
      title: 'Premium Quality',
      description:
        'Only the finest products and techniques for exceptional results every single time.',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Hygienic Products',
      description: '100% sanitized tools and premium branded products for your safety and care.',
    },
    {
      icon: 'ClockIcon',
      title: 'On-Time Service',
      description: 'We respect your time with punctual appointments and zero unnecessary waiting.',
    },
    {
      icon: 'HeartIcon',
      title: 'Client Satisfaction',
      description: 'Your happiness is our top priority — always. Every visit, every treatment.',
    },
  ],

  about: {
    title: 'Crafting Beauty With Care',
    paragraphs: [
      'Beauty is not just a service — it is an experience. The salon team creates a calm space where every client feels confident, cared for, and beautifully transformed.',
      'Our team combines modern styling techniques, premium products, strict hygiene practices, and personalized consultation to deliver salon experiences that feel luxurious and reliable.',
    ],
    stats: [
      { value: '10+', label: 'Years Experience' },
      { value: '20+', label: 'Expert Stylists' },
      { value: '5K+', label: 'Happy Clients' },
      { value: '15+', label: 'Awards Won' },
    ],
  },

  team: [
    {
      name: 'Ananya Sharma',
      role: 'Senior Hair Stylist',
      experience: '8+ Years',
      specialties: ['Hair Styling', 'Hair Spa', 'Hair Color'],
      bio: 'Known for elegant styling, smooth finishes, and personalized hair care consultations.',
      initials: 'A',
    },
    {
      name: 'Meera Kapoor',
      role: 'Bridal Makeup Artist',
      experience: '10+ Years',
      specialties: ['Bridal Makeup', 'Party Makeup', 'Draping'],
      bio: 'Creates long-lasting bridal looks that feel graceful, confident, and camera-ready.',
      initials: 'M',
    },
    {
      name: 'Riya Patel',
      role: 'Nail Artist',
      experience: '5+ Years',
      specialties: ['Nail Art', 'Manicure', 'Pedicure'],
      bio: 'Loves creating detailed nail designs with a premium, polished finish.',
      initials: 'R',
    },
    {
      name: 'Sana Khan',
      role: 'Skin & Facial Expert',
      experience: '7+ Years',
      specialties: ['Facials', 'Cleanup', 'Skin Glow Treatments'],
      bio: 'Focuses on gentle skin care, glow treatments, and relaxing facial experiences.',
      initials: 'S',
    },
    {
      name: 'Kavya Mehta',
      role: 'Hair Color Specialist',
      experience: '6+ Years',
      specialties: ['Global Color', 'Highlights', 'Balayage'],
      bio: 'Expert in modern color tones, soft blends, and hair-safe transformations.',
      initials: 'K',
    },
    {
      name: 'Nisha Rao',
      role: 'Salon Experience Manager',
      experience: '9+ Years',
      specialties: ['Client Care', 'Consultation', 'Appointment Experience'],
      bio: 'Ensures every client feels welcomed, comfortable, and cared for.',
      initials: 'N',
    },
  ],

  packages: [
    {
      name: 'Bridal Glow Package',
      price: '₹18,999',
      tag: 'Most Popular',
      bestFor: 'Bride-to-be',
      highlighted: true,
      includes: [
        'Premium facial',
        'Hair spa',
        'Manicure & pedicure',
        'Bridal trial',
        'Final bridal makeup look',
      ],
    },
    {
      name: 'Monthly Grooming Package',
      price: '₹4,999',
      bestFor: 'Monthly self-care',
      includes: ['Cleanup', 'Threading', 'Waxing', 'Hair spa', 'Basic manicure'],
    },
    {
      name: 'Party Ready Package',
      price: '₹6,999',
      bestFor: 'Events & functions',
      includes: ['Party makeup', 'Hairstyling', 'Nail polish', 'Draping support'],
    },
    {
      name: 'Hair Care Package',
      price: '₹3,999',
      bestFor: 'Hair nourishment',
      includes: ['Hair spa', 'Blow dry', 'Scalp consultation', 'Smooth finish styling'],
    },
    {
      name: 'Nail Care Package',
      price: '₹2,499',
      bestFor: 'Hands & feet',
      includes: ['Manicure', 'Pedicure', 'Nail shaping', 'Premium polish'],
    },
  ],

  gallery: [
    {
      title: 'Luxury Salon Interior',
      category: 'Salon Interior',
      image: 'https://images.unsplash.com/photo-1703792686756-c82bf734c89b',
      height: 'h-72',
    },
    {
      title: 'Elegant Hair Styling',
      category: 'Hair',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d8541d94-1775930656878.png',
      height: 'h-56',
    },
    {
      title: 'Bridal Glow',
      category: 'Bridal',
      image: 'https://images.unsplash.com/photo-1684867570683-93a966539191',
      height: 'h-64',
    },
    {
      title: 'Premium Facial',
      category: 'Facial',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_18b6b449e-1772479985833.png',
      height: 'h-56',
    },
    {
      title: 'Modern Nail Art',
      category: 'Nails',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19ff22ea0-1772690996045.png',
      height: 'h-64',
    },
    {
      title: 'Party Makeup',
      category: 'Makeup',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e',
      height: 'h-72',
    },
    {
      title: 'Hair Spa',
      category: 'Hair',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
      height: 'h-56',
    },
    {
      title: 'Bridal Eye Detail',
      category: 'Bridal',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
      height: 'h-64',
    },
    {
      title: 'Beauty Products',
      category: 'Salon Interior',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19e4522e7-1774955102990.png',
      height: 'h-56',
    },
    {
      title: 'Soft Glam',
      category: 'Makeup',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2',
      height: 'h-72',
    },
    {
      title: 'French Nails',
      category: 'Nails',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
      height: 'h-56',
    },
    {
      title: 'Skin Glow',
      category: 'Facial',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b',
      height: 'h-64',
    },
  ],

  reviews: [
    {
      name: 'Priya Sharma',
      rating: 5,
      service: 'Bridal Makeup',
      review:
        "The best salon experience I've ever had. The staff made me feel so special and my bridal look stayed perfect all day.",
      initials: 'P',
    },
    {
      name: 'Neha Patel',
      rating: 5,
      service: 'Hair Styling',
      review: 'Beautiful ambience, premium service, and amazing styling. I loved the final look.',
      initials: 'N',
    },
    {
      name: 'Aisha Khan',
      rating: 5,
      service: 'Facial Treatment',
      review: 'Clean, professional and relaxing. My skin felt fresh and glowing after the facial.',
      initials: 'A',
    },
    {
      name: 'Kavita Mehta',
      rating: 5,
      service: 'Nail Art',
      review: 'The nail art was neat, elegant and exactly what I wanted. Highly recommended.',
      initials: 'K',
    },
    {
      name: 'Riya Shah',
      rating: 5,
      service: 'Hair Spa',
      review: 'My hair felt soft, shiny and healthy. The consultation was very helpful.',
      initials: 'R',
    },
    {
      name: 'Pooja Desai',
      rating: 5,
      service: 'Party Makeup',
      review:
        'They created a soft glam look that was perfect for my event. Very premium experience.',
      initials: 'P',
    },
    {
      name: 'Anjali Verma',
      rating: 5,
      service: 'Manicure & Pedicure',
      review: 'Very hygienic and relaxing service. The staff was polite and professional.',
      initials: 'A',
    },
    {
      name: 'Simran Kaur',
      rating: 5,
      service: 'Hair Color',
      review: 'Loved the color consultation and final result. The shade suited me perfectly.',
      initials: 'S',
    },
    {
      name: 'Meenal Jain',
      rating: 5,
      service: 'Bridal Package',
      review:
        'The bridal package was well planned and stress-free. Everything was handled beautifully.',
      initials: 'M',
    },
  ],

  faqs: [
    {
      question: 'Do I need to book an appointment?',
      answer:
        'Appointments are recommended to avoid waiting, especially on weekends and for bridal services.',
      category: 'Booking',
    },
    {
      question: 'How do I request an appointment?',
      answer:
        'You can use the Book Appointment page, call us, or message us on WhatsApp. Our team will confirm your final slot.',
      category: 'Booking',
    },
    {
      question: 'Is my appointment confirmed immediately online?',
      answer:
        'Online submission is an appointment request. Our team confirms availability by call or WhatsApp.',
      category: 'Booking',
    },
    {
      question: 'Can I choose my stylist?',
      answer:
        'Yes, you can mention your preferred stylist while booking. Availability will be confirmed by our team.',
      category: 'Services',
    },
    {
      question: 'How do I know which service is right for me?',
      answer:
        'Our experts provide consultation before the service to understand your hair, skin, style and comfort.',
      category: 'Services',
    },
    {
      question: 'Do you offer bridal trials?',
      answer:
        'Yes, bridal trials are available with selected packages. Please contact us in advance.',
      category: 'Bridal',
    },
    {
      question: 'How early should I book bridal makeup?',
      answer: 'We recommend booking as early as possible, especially during wedding seasons.',
      category: 'Bridal',
    },
    {
      question: 'Are your tools sanitized?',
      answer: 'Yes, we follow strict hygiene standards and sanitize tools before use.',
      category: 'Hygiene',
    },
    {
      question: 'Do you use branded products?',
      answer: 'We use trusted professional-grade beauty products selected for quality and safety.',
      category: 'Hygiene',
    },
    {
      question: 'Do you accept UPI?',
      answer: 'Yes, UPI and other common payment modes are accepted at the salon.',
      category: 'Payments',
    },
    {
      question: 'Can I reschedule my appointment?',
      answer:
        'Yes, please call or WhatsApp us before your appointment time so we can help you reschedule.',
      category: 'Rescheduling',
    },
    {
      question: 'What if I am late?',
      answer:
        'Please inform us as soon as possible. We will try to adjust your slot depending on availability.',
      category: 'Rescheduling',
    },
  ],

  policies: {
    privacy: {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information.',
      lastUpdated: 'June 2026',
      notice:
        'This policy is a sample template and should be reviewed by the salon owner before final publishing.',
      sections: [
        {
          title: 'Introduction',
          content:
            'The salon respects your privacy and is committed to handling your personal information carefully.',
        },
        {
          title: 'Information We Collect',
          content: [
            'When you submit an appointment request or enquiry, we may collect your name, phone number, email address, preferred service, and any message you provide.',
            'We do not collect sensitive financial information through this website.',
          ],
        },
        {
          title: 'How We Use Your Information',
          content: [
            'To confirm and manage your appointment requests.',
            'To respond to your enquiries and provide service recommendations.',
            'To improve our salon services and client experience.',
          ],
        },
        {
          title: 'Data Sharing',
          content:
            'We do not sell, rent, or share your personal information with third parties for marketing purposes.',
        },
        {
          title: 'Data Security',
          content:
            'We take reasonable measures to protect your personal information from unauthorized access.',
        },
        {
          title: 'Contact Us',
          content:
            'If you have questions about this privacy policy, please contact us via our Contact page.',
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description: 'Terms of use for the salon website and appointment services.',
      lastUpdated: 'June 2026',
      notice:
        'These terms are a sample template and should be reviewed by the salon owner before final publishing.',
      sections: [
        {
          title: 'Website Use',
          content:
            'By using this website, you agree to these terms. This website is for informational purposes and appointment enquiries.',
        },
        {
          title: 'Appointment Requests',
          content:
            'Submitting a request does not guarantee a confirmed appointment. Our team verifies availability.',
        },
        {
          title: 'Service Pricing',
          content:
            'Prices are indicative and may vary based on complexity, product selection, and stylist.',
        },
        {
          title: 'Changes To Services',
          content: 'We reserve the right to modify services, pricing, and content at any time.',
        },
        { title: 'Contact', content: 'For questions about these terms, please contact us.' },
      ],
    },
    cancellation: {
      title: 'Cancellation & Rescheduling Policy',
      description: 'Our policy for appointment cancellations, rescheduling, and late arrivals.',
      lastUpdated: 'June 2026',
      notice:
        'This policy is a sample template and should be reviewed by the salon owner before final publishing.',
      sections: [
        {
          title: 'Appointment Confirmation',
          content: 'Online submissions are requests, not confirmed bookings.',
        },
        {
          title: 'Cancellation Notice',
          content: 'Please inform us at least 2 hours before your scheduled time.',
        },
        {
          title: 'Rescheduling',
          content: 'Rescheduling is available subject to slot availability.',
        },
        { title: 'Late Arrival', content: 'Please inform us immediately if running late.' },
        {
          title: 'Contact For Changes',
          content: 'For any changes, please reach out via Contact page, call, or WhatsApp.',
        },
      ],
    },
  },

  socialLinks: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
};
