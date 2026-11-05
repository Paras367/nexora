import type {
  Product,
  Testimonial,
  Stat,
  Initiative,
  NavLink,
  SocialLink,
  FooterColumn,
  Category
} from './types';


export const productCategories: ('All' | Category)[] = ['All', 'Light', 'Medium', 'Dark'];


export const products: Product[] = [
  {
    id: 'eth-01',
    category: 'Light',
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    notes: 'Blueberry • Jasmine • Citrus',
    price: 18,
    img: 'https://images.unsplash.com/photo-1559525839-d9acfd023a5f?w=600&q=80',
    tag: 'Bestseller',
    tagColor: '#b45309',
    rating: 4.9,
    reviews: 128,
    weight: '12oz',
    roastDate: 'Roasted to order',
    description: 'A bright, floral coffee with complex berry notes and a tea-like body. Grown at high altitudes in the Gedeo Zone.'
  },
  {
    id: 'col-01',
    category: 'Medium',
    name: 'Colombian Supremo',
    origin: 'Colombia',
    notes: 'Caramel • Chocolate • Nutty',
    price: 16,
    img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    tag: 'Smooth',
    tagColor: '#047857',
    rating: 4.7,
    reviews: 96,
    weight: '12oz',
    roastDate: 'Roasted to order',
    description: 'A perfectly balanced coffee with sweet caramel notes and a smooth, creamy finish. Our most approachable blend.'
  },
  {
    id: 'sum-01',
    category: 'Dark',
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    notes: 'Earthy • Dark Chocolate • Spice',
    price: 19,
    img: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80',
    tag: 'Bold',
    tagColor: '#6d28d9',
    rating: 4.8,
    reviews: 84,
    weight: '12oz',
    roastDate: 'Roasted to order',
    description: 'Full-bodied and complex with herbal notes, low acidity, and a syrupy mouthfeel. Perfect for espresso.'
  },
  {
    id: 'gua-01',
    category: 'Medium',
    name: 'Guatemala Antigua',
    origin: 'Guatemala',
    notes: 'Cocoa • Smoky • Plum',
    price: 17,
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    tag: 'New',
    tagColor: '#be185d',
    rating: 4.6,
    reviews: 52,
    weight: '12oz',
    roastDate: 'Roasted to order',
    description: 'Grown in volcanic soil, this coffee offers rich cocoa flavors with a subtle smokiness and sweet fruit finish.'
  },
  {
    id: 'ken-01',
    category: 'Light',
    name: 'Kenyan AA',
    origin: 'Kenya',
    notes: 'Blackcurrant • Wine • Tomato',
    price: 20,
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80', // Fixed duplicate image
    tag: 'Limited',
    tagColor: '#b45309',
    rating: 4.9,
    reviews: 67,
    weight: '12oz',
    roastDate: 'Roasted to order',
    description: "A vibrant, wine-like coffee with bright acidity and bold blackcurrant flavors. A true coffee lover's choice."
  },
  {
    id: 'ind-01',
    category: 'Dark',
    name: 'Monsooned Malabar',
    origin: 'India · Karnataka',
    notes: 'Spice • Earthy • Low Acidity',
    price: 17,
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    tag: 'Home Grown',
    tagColor: '#15803d',
    rating: 4.8,
    reviews: 71,
    weight: '12oz',
    roastDate: 'Roasted to order',
    description: 'Beans aged in the monsoon winds of the Malabar coast: mellow, heavy-bodied and wonderfully low in acidity.'
  }
];

// ============================================================================
// TESTIMONIALS
// ============================================================================
export const testimonials: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Sarah Mitchell',
    role: 'Coffee Enthusiast',
    verified: false,
    rating: 5,
    text: "The Ethiopian Yirgacheffe is unlike anything I've tasted. Knowing my purchase directly supports farmers makes every single sip taste even better.",
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
  },
  {
    id: 'test-02',
    name: 'David Chen',
    role: 'Café Owner, Seattle',
    verified: true,
    rating: 5,
    text: 'We switched to Nexora for our café and our customers noticed the difference immediately. The quality, consistency, and story behind the beans are unmatched.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
  },
  {
    id: 'test-03',
    name: 'Amara Okafor',
    role: 'Partner Farmer, Nigeria',
    verified: true,
    rating: 5,
    text: "Nexora changed my family's life. Fair prices, agricultural training, and a real partnership. I can now confidently send my children to school.",
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80'
  },
  {
    id: 'test-04',
    name: 'Marcus Johnson',
    role: 'Remote Worker',
    verified: false,
    rating: 5,
    text: "I've tried dozens of subscription services, but Nexora's commitment to quality and sustainability is unmatched. The Colombian is my morning ritual.",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
  }
];

// ============================================================================
// STATS (Numeric for count-up animations)
// ============================================================================
export const stats: Stat[] = [
  { value: 12400, suffix: '+', label: 'Farmers Supported', icon: 'fa-solid fa-users' },
  { value: 85000, suffix: '', label: 'Trees Planted', icon: 'fa-solid fa-tree' },
  { value: 2.1, decimals: 1, prefix: '$', suffix: 'M', label: 'Invested in Communities', icon: 'fa-solid fa-hand-holding-dollar' },
  { value: 100, suffix: '%', label: 'Carbon Neutral', icon: 'fa-solid fa-earth-americas' }
];

// ============================================================================
// INITIATIVES
// ============================================================================
export const initiatives: Initiative[] = [
  {
    id: 'init-01',
    title: 'Clean Water Project',
    icon: 'fa-solid fa-droplet',
    color: '#0369a1',
    desc: 'Built 23 wells providing clean, safe water to 15,000+ people in coffee-growing regions.',
    impact: '15,000+ people helped'
  },
  {
    id: 'init-02',
    title: 'Education Fund',
    icon: 'fa-solid fa-book-open',
    color: '#b45309',
    desc: 'Sponsored 500+ children through school with full scholarships, books, and supplies.',
    impact: '500+ children educated'
  },
  {
    id: 'init-03',
    title: 'Women in Coffee',
    icon: 'fa-solid fa-person-dress',
    color: '#be185d',
    desc: 'Empowering female farmers with specialized training, microloans, and leadership programs.',
    impact: '3,200+ women empowered'
  },
  {
    id: 'init-04',
    title: 'Reforestation',
    icon: 'fa-solid fa-tree',
    color: '#15803d',
    desc: 'Planting native shade trees to restore ecosystems and provide habitat for wildlife.',
    impact: '85,000+ trees planted'
  }
];

// ============================================================================
// NAVIGATION & SOCIAL
// ============================================================================
export const navLinks: NavLink[] = [
  { href: '#about', label: 'Our Story', icon: 'fa-solid fa-book-open' },
  { href: '#products', label: 'Coffee', icon: 'fa-solid fa-mug-hot' },
  { href: '#impact', label: 'Impact', icon: 'fa-solid fa-hand-holding-heart' },
  { href: '#testimonials', label: 'Reviews', icon: 'fa-solid fa-star' },
  { href: '#newsletter', label: 'Join Us', icon: 'fa-solid fa-envelope' }
];

export const socialLinks: SocialLink[] = [
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://instagram.com/nexoracoffee' },
  { name: 'X (Twitter)', icon: 'fa-brands fa-x-twitter', url: 'https://twitter.com/nexoracoffee' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook-f', url: 'https://facebook.com/nexoracoffee' },
  { name: 'YouTube', icon: 'fa-brands fa-youtube', url: 'https://youtube.com/nexoracoffee' }
];

// ============================================================================
// FOOTER COLUMNS
// ============================================================================
export const footerColumns: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All Coffee', href: '#products' },
      { label: 'Subscriptions', href: '#newsletter' },
      { label: 'Gift Cards', href: '#newsletter' },
      { label: 'Brewing Gear', href: '#products' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '#about' },
      { label: 'Impact Report', href: '#impact' },
      { label: 'Careers', href: '#newsletter' },
      { label: 'Press', href: '#newsletter' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: 'mailto:hello@nexora.coffee' },
      { label: 'Shipping Info', href: 'mailto:hello@nexora.coffee' },
      { label: 'Returns & Refunds', href: 'mailto:hello@nexora.coffee' },
      { label: 'FAQ', href: 'mailto:hello@nexora.coffee' }
    ]
  },
  {
    title: 'Contact',
    contact: [
      { icon: 'fa-solid fa-location-dot', text: '123 Roast Ave, Seattle, WA 98101', href: 'https://maps.google.com/?q=123+Roast+Ave+Seattle+WA' },
      { icon: 'fa-solid fa-envelope', text: 'hello@nexora.coffee', href: 'mailto:hello@nexora.coffee' },
      { icon: 'fa-solid fa-phone', text: '+1 (555) 019-2834', href: 'tel:+15550192834' }
    ]
  }
];