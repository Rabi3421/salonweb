import JsonLd from '@/components/JsonLd';
import PolicyPage from '@/components/PolicyPage';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';

export const metadata = buildPageMetadata({
  title: 'Terms & Conditions',
  description:
    'Read the terms and conditions for using the Rosé Luxe Salon website and appointment enquiry services.',
  path: '/terms',
});

const sections = [
  {
    title: 'Website Use',
    content:
      'By using the Rosé Luxe Salon website, you agree to these terms. This website is intended for informational purposes and to allow clients to submit appointment enquiries.',
  },
  {
    title: 'Appointment Requests',
    content:
      'Submitting a request through this website does not guarantee a confirmed appointment. Our team will verify availability and confirm your appointment by call or WhatsApp.',
  },
  {
    title: 'Service Pricing',
    content:
      'Service prices displayed on this website are indicative and may vary based on hair length, complexity, product selection, and stylist. Final pricing is confirmed at the salon.',
  },
  {
    title: 'Offers & Packages',
    content:
      'Promotional offers, packages, and discounts are subject to availability and may change without prior notice. Package details are confirmed during consultation.',
  },
  {
    title: 'Client Responsibility',
    content:
      'Clients are responsible for providing accurate contact information when requesting appointments. Please inform us of any allergies, skin conditions, or preferences before your service.',
  },
  {
    title: 'Changes To Services',
    content:
      'Rosé Luxe Salon reserves the right to modify, update, or discontinue services, pricing, and website content at any time without prior notice.',
  },
  {
    title: 'Limitation Note',
    content:
      'This website and its content are provided as-is. While we make every effort to ensure accuracy, we do not guarantee that all information is complete or up to date.',
  },
  {
    title: 'Contact',
    content:
      'For any questions about these terms, please contact us via our Contact page, call us at +91 98765 43210, or email hello@roseluxe.example.',
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms' },
        ])}
      />
      <PolicyPage
        eyebrow="Terms & Conditions"
        title="Terms & Conditions"
        subtitle="Terms of use for the Rosé Luxe Salon website and appointment services."
        lastUpdated="June 2026"
        notice="These terms are a sample template and should be reviewed by the salon owner before final publishing."
        sections={sections}
      />
    </>
  );
}
