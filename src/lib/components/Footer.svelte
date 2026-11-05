<script lang="ts">
  import { footerColumns, socialLinks } from '../data';

  const year = new Date().getFullYear();
  let open = $state<string | null>(footerColumns[0].title);
  
  const toggle = (title: string) => (open = open === title ? null : title);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide back-to-top button based on scroll
  let showBackToTop = $state(false);
  $effect(() => {
    const handleScroll = () => {
      showBackToTop = window.scrollY > 500;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  // Payment methods
  const paymentMethods = [
    { icon: 'fa-brands fa-cc-visa', name: 'Visa' },
    { icon: 'fa-brands fa-cc-mastercard', name: 'Mastercard' },
    { icon: 'fa-brands fa-cc-amex', name: 'American Express' },
    { icon: 'fa-brands fa-cc-paypal', name: 'PayPal' },
    { icon: 'fa-brands fa-apple-pay', name: 'Apple Pay' }
  ];

  // Trust badges
  const trustBadges = [
    { icon: 'fa-solid fa-shield-halved', text: 'SSL Secure Checkout' },
    { icon: 'fa-solid fa-rotate-left', text: '30-Day Money Back' },
    { icon: 'fa-solid fa-truck-fast', text: 'Free Shipping $50+' }
  ];
</script>

<footer class="footer">
  <!-- Subtle top gradient glow -->
  <div class="footer-glow" aria-hidden="true"></div>
  
  <!-- Floating particles -->
  <div class="particles" aria-hidden="true">
    {#each Array(5) as _, i}
      <div class="particle" style="--i: {i}">
        <i class="fa-solid fa-seedling"></i>
      </div>
    {/each}
  </div>

  <div class="container">
    <!-- Main Footer Grid -->
    <div class="grid">
      <!-- Brand Column -->
      <div class="brand">
        <!-- ✅ ENHANCED: Favicon Logo -->
        <a href="/" class="logo">
          <img src="/favicon.png" alt="Nexora Logo" class="logo-favicon" />
          <span class="logo-text">Nexora</span>
        </a>
        <p class="brand-desc">
          Brewed with purpose. Every cup supports farmers, communities, and a healthier planet.
        </p>
        
        <!-- Enhanced Trust Badges -->
        <div class="trust-badges">
          {#each trustBadges as badge}
            <div class="trust-badge">
              <i class={badge.icon}></i>
              <span>{badge.text}</span>
            </div>
          {/each}
        </div>
        
        <!-- Social Links -->
        <ul class="socials">
          {#each socialLinks as s (s.name)}
            <li>
              <a href={s.url} class="social" aria-label={s.name} target="_blank" rel="noopener noreferrer">
                <i class={s.icon} aria-hidden="true"></i>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Link Columns -->
      {#each footerColumns as col (col.title)}
        {@const isOpen = open === col.title}
        <div class="col" class:open={isOpen}>
          <h4>
            <button class="toggle" aria-expanded={isOpen} aria-controls="foot-{col.title}" onclick={() => toggle(col.title)}>
              {col.title}
              <i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>
            </button>
          </h4>

          <div class="content" id="foot-{col.title}">
            <div class="content-inner">
              {#if col.contact}
                <ul class="contact allow-select">
                  {#each col.contact as item (item.text)}
                    <li>
                      <i class={item.icon} aria-hidden="true"></i>
                      <a href={item.href} target={item.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {item.text}
                      </a>
                    </li>
                  {/each}
                </ul>
              {:else if col.links}
                <ul>
                  {#each col.links as link (link.label)}
                    <li>
                      <a href={link.href}>
                        <span>{link.label}</span>
                        <i class="fa-solid fa-arrow-right link-arrow" aria-hidden="true"></i>
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Payment & Security -->
    <div class="payment-section">
      <div class="payment-methods">
        <span class="payment-label">We Accept:</span>
        <div class="payment-icons">
          {#each paymentMethods as method}
            <i class={method.icon} title={method.name} aria-label={method.name}></i>
          {/each}
        </div>
      </div>
      <div class="security-badges">
        <i class="fa-solid fa-lock" title="256-bit SSL Secure" aria-label="Secure connection"></i>
        <span>256-bit SSL Secure Checkout</span>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bottom">
      <p class="copyright">© {year} Nexora Coffee Co. All rights reserved.</p>
      <nav class="legal" aria-label="Legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Settings</a>
        <a href="#">Accessibility</a>
      </nav>
    </div>

    <!-- ✅ PREMIUMLY LABELED: Made By Section -->
    <div class="made-by">
      <div class="made-by-badge">
        <span class="made-by-text">
          Crafted with <i class="fa-solid fa-mug-hot" aria-hidden="true"></i> &amp; <i class="fa-solid fa-heart heart" aria-hidden="true"></i> in India by
        </span>
        <div class="creators allow-select">
          <a href="https://paras367.github.io/" target="_blank" rel="noopener noreferrer" class="creator">
            <i class="fa-solid fa-code" aria-hidden="true"></i> 
            <span>Paras Dhiman</span>
          </a>
          <span class="sep" aria-hidden="true">•</span>
          <a href="https://softwarelabs.vercel.app/" target="_blank" rel="noopener noreferrer" class="creator">
            <i class="fa-solid fa-rocket" aria-hidden="true"></i> 
            <span>SoftwareLabs</span>
          </a>
        </div>
      </div>
      
      <!-- ✅ DEMO STOREFRONT DISCLAIMER -->
      <div class="demo-disclaimer">
        <i class="fa-solid fa-circle-info"></i>
        <span>Premium demo storefront. Available for acquisition.</span>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button class="back-to-top" class:visible={showBackToTop} onclick={scrollToTop} aria-label="Back to top" title="Back to top">
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  </div>
</footer>

<style>
  .footer { 
    position: relative; 
    z-index: 5; 
    overflow: hidden; 
    padding: 6rem 0 3rem; 
    background: var(--color-brown-dark); 
    color: var(--color-cream); 
  }
  
  .footer-glow { 
    position: absolute; 
    top: 0; left: 0; right: 0; 
    height: 1px; 
    background: linear-gradient(90deg, transparent, var(--color-accent), transparent); 
    box-shadow: 0 0 20px 2px rgba(217, 119, 6, 0.3);
  }

  /* Floating Particles */
  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .particle {
    position: absolute;
    bottom: -30px;
    left: calc(15% * var(--i));
    font-size: 1.2rem;
    color: var(--color-accent);
    opacity: 0.08;
    animation: floatUp 18s linear infinite;
    animation-delay: calc(var(--i) * 3s);
  }
  @keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.08; }
    90% { opacity: 0.08; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }

  .grid { 
    display: grid; 
    grid-template-columns: 1.5fr repeat(4, 1fr); 
    gap: 3rem; 
    margin-bottom: 4rem; 
  }

  /* Brand */
  .logo { 
    display: inline-flex; 
    align-items: center; 
    gap: 0.6rem; 
    margin-bottom: 1.2rem; 
    color: var(--color-white);
    text-decoration: none;
    transition: var(--transition);
  }
  .logo:hover { transform: scale(1.03); }
  
  /* ✅ Favicon Logo Styles */
  .logo-favicon { 
    width: 36px; 
    height: 36px; 
    object-fit: contain;
    transition: transform 0.4s var(--transition), filter 0.4s var(--transition);
  }
  .logo:hover .logo-favicon { 
    transform: rotate(-12deg) scale(1.15); 
    filter: drop-shadow(0 6px 12px rgba(217, 119, 6, 0.4));
  }

  .logo-text { 
    font-family: var(--font-display); 
    font-size: 1.8rem; 
    font-weight: 800; 
    letter-spacing: -0.5px; 
  }
  .brand-desc { 
    max-width: 320px; 
    margin-bottom: 2rem; 
    color: rgba(245, 235, 224, 0.85);
    font-weight: 400; 
    line-height: 1.7; 
    font-size: 1rem;
  }

  /* Trust Badges */
  .trust-badges {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 2rem;
  }
  .trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-cream);
    background: rgba(255, 255, 255, 0.06);
    padding: 0.6rem 1rem;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    width: fit-content;
    transition: var(--transition);
  }
  .trust-badge:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(217, 119, 6, 0.3);
    transform: translateX(4px);
  }
  .trust-badge i {
    color: var(--color-accent);
    font-size: 1rem;
    width: 20px;
    text-align: center;
  }

  .socials { 
    display: flex; 
    gap: 0.8rem; 
    margin: 0; 
    padding: 0; 
    list-style: none; 
  }
  .social {
    display: grid; 
    place-items: center; 
    width: 44px; 
    height: 44px; 
    font-size: 1.1rem; 
    color: var(--color-cream);
    background: rgba(255, 255, 255, 0.08); 
    border: 1px solid rgba(255, 255, 255, 0.1); 
    border-radius: 50%;
    transition: var(--transition);
  }
  .social:hover { 
    background: var(--color-accent); 
    border-color: var(--color-accent); 
    color: var(--color-white); 
    transform: translateY(-4px) rotate(8deg); 
    box-shadow: 0 8px 20px rgba(217, 119, 6, 0.4); 
  }

  /* Columns */
  .toggle {
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    width: 100%; 
    padding: 0; 
    margin-bottom: 1.5rem;
    color: var(--color-white); 
    font: 700 0.95rem var(--font-body); 
    letter-spacing: 1px; 
    text-transform: uppercase; 
    text-align: left; 
    cursor: pointer;
    background: none;
    border: none;
  }
  .chevron { 
    display: none; 
    font-size: 0.8rem; 
    opacity: 0.7; 
    transition: transform 0.3s var(--transition);
  }

  .col ul { 
    display: flex; 
    flex-direction: column; 
    gap: 0.9rem; 
    margin: 0; 
    padding: 0; 
    list-style: none; 
  }
  .col a { 
    display: inline-flex; 
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem; 
    color: rgba(245, 235, 224, 0.8);
    text-decoration: none;
    transition: var(--transition);
    font-weight: 400;
  }
  .col a:hover { 
    color: var(--color-accent-light); 
    transform: translateX(4px); 
  }
  .link-arrow {
    font-size: 0.75rem;
    opacity: 0;
    transform: translateX(-8px);
    transition: var(--transition);
  }
  .col a:hover .link-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .contact { gap: 1rem; }
  .contact li { 
    display: flex; 
    align-items: flex-start; 
    gap: 0.8rem; 
    font-size: 0.95rem; 
    color: rgba(245, 235, 224, 0.8);
  }
  .contact i { 
    width: 20px; 
    margin-top: 0.3rem; 
    text-align: center; 
    color: var(--color-accent); 
  }
  .contact a { 
    overflow-wrap: anywhere; 
    color: inherit;
    text-decoration: none;
    transition: var(--transition);
  }
  .contact a:hover { color: var(--color-accent-light); }

  /* Payment Section */
  .payment-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 2.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 2.5rem;
  }
  .payment-methods {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .payment-label {
    font-size: 0.9rem;
    color: rgba(245, 235, 224, 0.7);
    font-weight: 500;
  }
  .payment-icons {
    display: flex;
    gap: 1.2rem;
    font-size: 2.2rem;
    color: var(--color-cream);
  }
  .payment-icons i {
    transition: var(--transition);
    filter: grayscale(1) opacity(0.5);
  }
  .payment-icons i:hover {
    filter: grayscale(0) opacity(1);
    transform: translateY(-3px);
    color: var(--color-white);
  }
  .security-badges {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: rgba(245, 235, 224, 0.8);
    font-weight: 500;
  }
  .security-badges i {
    color: #10b981;
    font-size: 1.1rem;
  }

  /* Bottom Bar */
  .bottom { 
    display: flex; 
    flex-wrap: wrap; 
    align-items: center; 
    justify-content: space-between; 
    gap: 1.5rem; 
    margin-bottom: 2.5rem; 
  }
  .copyright { 
    margin: 0; 
    color: rgba(245, 235, 224, 0.9); 
    font-size: 0.9rem; 
    font-weight: 500; 
  }
  .legal { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 0.5rem; 
  }
  .legal a { 
    color: rgba(245, 235, 224, 0.7); 
    font-size: 0.85rem; 
    font-weight: 500; 
    text-decoration: none;
    transition: var(--transition);
    padding: 0 0.5rem;
  }
  .legal a:hover { 
    color: var(--color-accent-light); 
  }
  .legal a:not(:last-child)::after { 
    content: '·'; 
    margin-left: 0.5rem; 
    opacity: 0.4; 
    color: rgba(245, 235, 224, 0.5);
  }

  /* ✅ PREMIUMLY LABELED: Made by Section */
  .made-by { 
    padding-top: 2rem; 
    text-align: center; 
    border-top: 1px solid rgba(255, 255, 255, 0.05); 
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .made-by-badge {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 2.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--radius-lg);
    margin-bottom: 1.5rem;
    transition: var(--transition);
  }
  .made-by-badge:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(217, 119, 6, 0.2);
  }

  .made-by-text {
    font-size: 0.9rem; 
    font-weight: 500; 
    letter-spacing: 0.3px;
    background: linear-gradient(90deg, #f5ebe0, #f59e0b 50%, #fbbf24); 
    background-size: 200% auto;
    -webkit-background-clip: text; 
    background-clip: text; 
    -webkit-text-fill-color: transparent; 
    color: transparent;
    animation: shimmer 4s ease-in-out infinite;
  }
  .made-by-text .fa-mug-hot { 
    -webkit-text-fill-color: var(--color-accent); 
  }
  .heart { 
    -webkit-text-fill-color: #ef4444; 
    display: inline-block; 
    animation: pulse 1.5s ease-in-out infinite; 
  }
  @keyframes pulse { 
    50% { transform: scale(1.15); } 
  }
  @keyframes shimmer { 
    0%, 100% { background-position: 0% center; } 
    50% { background-position: 100% center; } 
  }

  .creators { 
    display: flex; 
    flex-wrap: wrap; 
    align-items: center; 
    justify-content: center; 
    gap: 0.8rem; 
  }
  .creator {
    display: inline-flex; 
    align-items: center; 
    gap: 0.6rem; 
    padding: 0.6rem 1.2rem; 
    color: var(--color-cream); 
    font-size: 0.9rem; 
    font-weight: 600;
    background: rgba(255, 255, 255, 0.06); 
    border: 1px solid rgba(255, 255, 255, 0.1); 
    border-radius: 50px;
    text-decoration: none;
    transition: var(--transition);
  }
  .creator i { 
    color: var(--color-accent); 
    font-size: 0.9rem; 
    transition: var(--transition);
  }
  .creator:hover { 
    color: var(--color-white); 
    background: linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(217, 119, 6, 0.1)); 
    border-color: var(--color-accent); 
    transform: translateY(-2px); 
    box-shadow: 0 6px 20px rgba(217, 119, 6, 0.2); 
  }
  .creator:hover i { 
    color: var(--color-white); 
  }
  .sep { 
    font-size: 0.8rem; 
    opacity: 0.4; 
    color: var(--color-cream);
  }

  /* ✅ DEMO DISCLAIMER */
  .demo-disclaimer {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.65rem;
    color: rgba(245, 235, 224, 0.35);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 0.5rem;
  }
  .demo-disclaimer i {
    font-size: 0.6rem;
    color: var(--color-accent);
    opacity: 0.6;
  }

  /* Back to Top Button */
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    background: var(--color-accent);
    color: var(--color-white);
    border: none;
    border-radius: 50%;
    font-size: 1.1rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: var(--transition);
    box-shadow: 0 4px 15px rgba(217, 119, 6, 0.4);
    z-index: 100;
    display: grid;
    place-items: center;
  }
  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .back-to-top:hover {
    background: var(--color-accent-dark);
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(217, 119, 6, 0.5);
  }

  /* Mobile: smooth accordion */
  @media (max-width: 900px) {
    .footer { padding: 4rem 0 2rem; }
    
    .grid { 
      grid-template-columns: 1fr; 
      gap: 0; 
    }

    .brand { 
      margin-bottom: 2rem; 
      padding-bottom: 2rem; 
      text-align: center; 
      border-bottom: 1px solid rgba(255, 255, 255, 0.08); 
    }
    .logo, .socials, .trust-badges { justify-content: center; }
    .brand-desc { margin: 0 auto 2rem; }
    .trust-badge { width: fit-content; margin: 0 auto; }

    .col { border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .toggle { 
      padding: 1.2rem 0; 
      margin: 0; 
      cursor: pointer; 
      -webkit-tap-highlight-color: transparent; 
    }
    .toggle:hover { color: var(--color-accent-light); }
    .chevron { display: block; }
    .col.open .chevron { transform: rotate(180deg); color: var(--color-accent); opacity: 1; }

    .content { 
      display: grid; 
      grid-template-rows: 0fr; 
      transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    }
    .content-inner { 
      min-height: 0; 
      overflow: hidden; 
      visibility: hidden; 
      transition: visibility 0.4s; 
    }
    .col.open .content { grid-template-rows: 1fr; }
    .col.open .content-inner { visibility: visible; padding-bottom: 1.5rem; }

    .payment-section {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }
    .payment-methods { flex-direction: column; gap: 1rem; }
    .payment-icons { justify-content: center; }
    .security-badges { justify-content: center; }

    .bottom { 
      flex-direction: column; 
      text-align: center; 
      gap: 1rem; 
    }
    .legal { justify-content: center; gap: 0.5rem 1rem; }
    .legal a { font-size: 0.85rem; }
    
    .creators { flex-direction: column; gap: 0.8rem; }
    .sep { display: none; }
    .creator { width: 100%; max-width: 280px; justify-content: center; }
    
    .back-to-top {
      width: 44px;
      height: 44px;
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }

  @media (max-width: 600px) {
    .made-by-badge {
      padding: 1.2rem 1.5rem;
      width: 100%;
      max-width: 320px;
    }
  }

  @media (max-width: 480px) {
    .payment-icons { font-size: 1.8rem; gap: 1rem; }
    .legal a { font-size: 0.8rem; }
  }

  @media (prefers-reduced-motion: reduce) { 
    .made-by-text, .heart, .particle { animation: none; } 
  }
</style>