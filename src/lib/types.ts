// ============================================================================
// CORE TYPES
// ============================================================================

export type Category = 'Light' | 'Medium' | 'Dark';

export interface Product {
  id: string;
  category: Category;
  name: string;
  origin: string;
  notes: string;
  price: number; // Changed to number to work with formatPrice() utility
  img: string;
  tag: string;
  tagColor: string;
  rating: number;
  reviews: number;
  weight: string;
  roastDate: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
  verified: boolean;
  rating: number;
}

export interface Stat {
  value: number; // Changed to number for count-up animations
  label: string;
  icon: string;
  prefix?: string; // e.g., "$"
  suffix?: string; // e.g., "+", "M", "%"
  decimals?: number; // e.g., 1 for "2.1"
}

export interface Initiative {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  impact: string; // e.g., "15,000+ people helped"
}

// ============================================================================
// NAVIGATION & FOOTER TYPES
// ============================================================================

export interface NavLink {
  href: string;
  label: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface ContactItem {
  icon: string;
  text: string;
  href: string; // e.g., "mailto:...", "tel:...", "https://..."
}

export interface FooterColumn {
  title: string;
  links?: FooterLinkItem[];
  contact?: ContactItem[];
}

// ============================================================================
// UTILITY / FUTURE TYPES
// ============================================================================

export interface CartItem extends Product {
  quantity: number;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: Date;
  preferences?: {
    brewingTips: boolean;
    newProducts: boolean;
    impactStories: boolean;
  };
}