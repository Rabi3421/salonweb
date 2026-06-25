import JsonLd from '@/components/JsonLd';
import PolicyPage from '@/components/PolicyPage';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'Read the privacy policy for the salon website, contact forms and appointment enquiry handling.',
  path: '/privacy-policy',
});

const sections = [
  {
    title: 'Introduction',
    content:
      'The salon respects your privacy and is committed to handling your personal information carefully. This policy explains how we collect, use, and protect the data you share with us through our website and appointment enquiry system.',
  },
  {
    title: 'Information We Collect',
    content: [
      'When you submit an appointment request, contact form, or enquiry, we may collect your name, phone number, email address, preferred service, and any message you provide.',
      'We do not collect sensitive financial information through this website.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'To confirm and manage your appointment requests.',
      'To respond to your enquiries and provide service recommendations.',
      'To improve our salon services and client experience.',
      'To send occasional updates about offers or new services, only if you have opted in.',
    ],
  },
  {
    title: 'Appointment & Enquiry Data',
    content:
      'Appointment requests submitted through this website are stored securely in our system to help our team confirm, manage, and follow up on your bookings.',
  },
  {
    title: 'Data Sharing',
    content:
      'We do not sell, rent, or share your personal information with third parties for marketing purposes. Your data may only be shared with our internal team members for appointment management.',
  },
  {
    title: 'Cookies & Analytics',
    content:
      'Our website may use basic analytics tools to understand visitor traffic and improve user experience. These tools may use cookies. You can manage cookie preferences through your browser settings.',
  },
  {
    title: 'Data Security',
    content:
      'We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no internet transmission is completely secure.',
  },
  {
    title: 'Contact Us',
    content:
      'If you have any questions about this privacy policy, please contact us via our Contact page, call us at +91 98765 43210, or email hello@roseluxe.example.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ])}
      />
      <PolicyPage
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
        lastUpdated="June 2026"
        notice="This policy is a sample template and should be reviewed by the salon owner before final publishing."
        sections={sections}
      />
    </>
  );
}
