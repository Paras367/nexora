
<script lang="ts">
  import SEO from '#lib/components/SEO.svelte';

  const productJsonLd = $derived(product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.img,
    "description": product.description,
    "brand": { "@type": "Brand", "name": "Nexora Coffee" },
    "offers": {
      "@type": "Offer",
      "url": `https://nexora-coffee.vercel.app/products/${product.id}`,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  } : null);


  import { products } from '../../../lib/data';
  import { page } from '$app/state';
  import { fade, fly, slide } from 'svelte/transition';
  import { toast } from '../../../lib/stores/toast.svelte';
  

  import { 
    MapPin, Star, ShoppingCart, Heart, Share2, Minus, Plus, 
    Truck, RotateCcw, ShieldCheck, Coffee, Droplets, Flame, 
    Clock, ChevronDown, ZoomIn, Mountain
  } from 'lucide-svelte';

  const product = $derived(products.find((p) => p.id === page.params.slug));

  let quantity = $state(1);
  let isAdding = $state(false);
  let isWished = $state(false);
  let activeTab = $state<'description' | 'brewing' | 'shipping'>('description');
  let activeImageIndex = $state(0);
  let y = $state(0);


  const productGalleries: Record<string, string[]> = {
    'eth-01': [
      'https://images.unsplash.com/photo-1559525839-d9acfd023a5f?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80'
    ],
    'col-01': [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80'
    ],
    'sum-01': [
      'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=80',
      'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80'
    ],
    'gua-01': [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      'https://images.unsplash.com/photo-1559525839-d9acfd023a5f?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80'
    ],
    'ken-01': [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80'
    ],
    'ind-01': [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800&q=80',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80'
    ]
  };

  const galleryImages = $derived(
    product ? (productGalleries[product.id] || [product.img, product.img, product.img, product.img]) : []
  );
  
  const relatedProducts = $derived(
    product 
      ? products.filter((p) => p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 3)
      : []
  );
  
  const notesArray = $derived(product?.notes ? product.notes.split(' • ') : []);
  const formattedPrice = $derived(product ? `$${product.price.toFixed(2)}` : '$0.00');


  const formattedDescription = $derived(product ? 
    `${product.description}<br><br><strong>Freshness guaranteed:</strong> ${product.roastDate || 'Roasted to order'}.` 
    : ''
  );

  const roastLevels = ['Light', 'Medium', 'Dark'];
  const currentRoastIndex = $derived(product ? roastLevels.indexOf(product.category) : 1);

  const specs = $derived(product ? {
    altitude: product.origin.includes('Ethiopia') || product.origin.includes('Kenya') ? '1,800 - 2,200 masl' : '1,200 - 1,600 masl',
    process: product.category === 'Light' ? 'Washed' : 'Natural / Honey',
    varietal: product.origin.includes('Colombia') ? 'Caturra, Castillo' : 'Heirloom, Typica'
  } : { altitude: '', process: '', varietal: '' });

  $effect(() => {
    if (product) {
      quantity = 1;
      isAdding = false;
      isWished = false;
      activeTab = 'description';
      activeImageIndex = 0;
    }
  });

  $effect(() => {
    const handleScroll = () => { y = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const increment = () => (quantity += 1);
  const decrement = () => { if (quantity > 1) quantity -= 1; };

  const addToCart = () => {
    if (!product) return;
    isAdding = true;
    setTimeout(() => {
      toast.success(`Added ${quantity} x ${product.name} to your cart!`);
      isAdding = false;
    }, 600);
  };

  const toggleWishlist = () => {
    if (!product) return;
    isWished = !isWished;
    toast.info(isWished ? `Added ${product.name} to wishlist` : `Removed ${product.name} from wishlist`);
  };

  const shareProduct = async () => {
    if (!product) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text: product.description, url: window.location.href });
      } catch (err) { /* cancelled */ }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
</script>

<SEO 
  title={product ? `${product.name} | Nexora Coffee` : 'Product Not Found'}
  description={product?.description || 'Premium coffee blend.'}
  image={product?.img}
  url={`https://nexora-coffee.vercel.app/products/${product?.id}`}
  type="product"
  jsonLd={productJsonLd}
/>


<svelte:head>
  <title>{product ? `${product.name} | Nexora Coffee` : 'Product Not Found | Nexora Coffee'}</title>
  {#if product}
    <meta name="description" content="{product.description}" />
    <meta property="og:title" content="{product.name} | Nexora Coffee" />
    <meta property="og:description" content="{product.description}" />
    <meta property="og:image" content="{product.img}" />
    <meta property="og:url" content="{typeof window !== 'undefined' ? window.location.href : ''}" />
  {/if}
</svelte:head>

<main class="product-page">
  <div class="container">
    
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <i class="fa-solid fa-chevron-right separator"></i>
      <a href="/#products">Coffee</a>
      {#if product}
        <i class="fa-solid fa-chevron-right separator"></i>
        <span class="current" aria-current="page">{product.name}</span>
      {/if}
    </nav>

    {#if !product}
      <div class="not-found" in:fade={{ duration: 400 }}>
        <Coffee size={64} class="empty-icon" />
        <h2>Oops! This blend is out of stock.</h2>
        <p>We couldn't find a product matching "<strong>{page.params.slug}</strong>".</p>
        <a href="/#products" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left"></i> Back to All Coffee
        </a>
      </div>
    {:else}
      <div class="product-grid" in:fly={{ y: 20, duration: 500 }}>
        
        <div class="product-gallery">
          <div class="main-image">
            <img src={galleryImages[activeImageIndex]} alt={product.name} />
            <span class="image-badge" style="background: {product.tagColor}">
              {product.tag}
            </span>
            <button class="zoom-hint" aria-label="Image zoom hint">
              <ZoomIn size={20} />
            </button>
          </div>
          <div class="thumbnails">
            {#each galleryImages as img, i}
              <button 
                class="thumb" 
                class:active={activeImageIndex === i}
                onclick={() => activeImageIndex = i}
                aria-label="View image {i + 1}"
              >
                <img src={img} alt="" />
              </button>
            {/each}
          </div>
        </div>

        <div class="product-details">
          <div class="origin-badge">
            <MapPin size={16} />
            <span>{product.origin}</span>
          </div>

          <h1>{product.name}</h1>

          <div class="rating">
            <div class="stars">
              {#each Array(5) as _, i}
                <Star 
                  size={16} 
                  class={i < Math.floor(product.rating) ? 'star-icon filled' : 'star-icon'}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                />
              {/each}
            </div>
            <span class="review-count">({product.reviews} verified reviews)</span>
          </div>

          <div class="price-block">
            <span class="price">{formattedPrice}</span>
            <span class="unit">/ {product.weight || '12oz'} bag</span>
          </div>

          <!-- ✅ FIXED: Use {@html} to render HTML tags properly -->
          <p class="description">{@html formattedDescription}</p>

          <div class="tasting-notes">
            <span class="label">Tasting Notes:</span>
            <div class="notes-list">
              {#each notesArray as note}
                <span class="note-badge">{note.trim()}</span>
              {/each}
            </div>
          </div>

          <div class="roast-profile">
            <span class="label">Roast Profile:</span>
            <div class="roast-dots">
              {#each roastLevels as level, i}
                <div class="roast-dot-wrapper">
                  <div class="roast-dot" class:filled={i <= currentRoastIndex}></div>
                  <span class="roast-label" class:active={i === currentRoastIndex}>{level}</span>
                </div>
              {/each}
            </div>
          </div>

          <div class="specs-grid">
            <div class="spec-item">
              <Mountain size={20} />
              <div>
                <span class="spec-label">Altitude</span>
                <span class="spec-value">{specs.altitude}</span>
              </div>
            </div>
            <div class="spec-item">
              <Droplets size={20} />
              <div>
                <span class="spec-label">Process</span>
                <span class="spec-value">{specs.process}</span>
              </div>
            </div>
            <div class="spec-item">
              <Flame size={20} />
              <div>
                <span class="spec-label">Varietal</span>
                <span class="spec-value">{specs.varietal}</span>
              </div>
            </div>
          </div>

          <div class="purchase-actions">
            <div class="quantity-selector">
              <button onclick={decrement} aria-label="Decrease quantity"><Minus size={18} /></button>
              <span class="qty-value">{quantity}</span>
              <button onclick={increment} aria-label="Increase quantity"><Plus size={18} /></button>
            </div>

            <button class="btn btn-primary add-to-cart-btn" disabled={isAdding} onclick={addToCart}>
              {#if isAdding}
                <span class="spinner"></span>
                <span>Adding...</span>
              {:else}
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              {/if}
            </button>

            <button class="btn btn-outline-dark icon-only" onclick={toggleWishlist} class:wished={isWished} aria-label="Toggle wishlist">
              <Heart size={22} class={isWished ? 'heart-filled' : ''} fill={isWished ? 'currentColor' : 'none'} />
            </button>

            <button class="btn btn-outline-dark icon-only" onclick={shareProduct} aria-label="Share product">
              <Share2 size={22} />
            </button>
          </div>

          <div class="trust-row">
            <div class="trust-item">
              <Truck size={20} />
              <span>Free Shipping $50+</span>
            </div>
            <div class="trust-item">
              <RotateCcw size={20} />
              <span>30-Day Returns</span>
            </div>
            <div class="trust-item">
              <ShieldCheck size={20} />
              <span>Secure Checkout</span>
            </div>
          </div>

          <div class="details-accordion">
            <button class="accordion-header" class:active={activeTab === 'description'} onclick={() => activeTab = activeTab === 'description' ? null : 'description'}>
              <span><Coffee size={18} class="acc-icon" /> Description</span>
              <ChevronDown size={20} />
            </button>
            {#if activeTab === 'description'}
              <div class="accordion-content" in:slide={{ duration: 300 }}>
                <p>{product.description} Sourced directly from partner farms, this coffee is roasted in small batches to ensure peak freshness and flavor.</p>
              </div>
            {/if}

            <button class="accordion-header" class:active={activeTab === 'brewing'} onclick={() => activeTab = activeTab === 'brewing' ? null : 'brewing'}>
              <span><Clock size={18} class="acc-icon" /> Brewing Guide</span>
              <ChevronDown size={20} />
            </button>
            {#if activeTab === 'brewing'}
              <div class="accordion-content" in:slide={{ duration: 300 }}>
                <ul>
                  <li><strong>Grind:</strong> Medium (like sea salt)</li>
                  <li><strong>Ratio:</strong> 1:15 (coffee to water)</li>
                  <li><strong>Water Temp:</strong> 200°F (93°C)</li>
                  <li><strong>Time:</strong> 3-4 minutes</li>
                </ul>
              </div>
            {/if}

            <button class="accordion-header" class:active={activeTab === 'shipping'} onclick={() => activeTab = activeTab === 'shipping' ? null : 'shipping'}>
              <span><Truck size={18} class="acc-icon" /> Shipping & Returns</span>
              <ChevronDown size={20} />
            </button>
            {#if activeTab === 'shipping'}
              <div class="accordion-content" in:slide={{ duration: 300 }}>
                <p>We roast to order and ship within 24 hours. Free standard shipping on all orders over $50. If you don't love it, return it within 30 days for a full refund, no questions asked.</p>
              </div>
            {/if}
          </div>
        </div>
      </div>

      {#if relatedProducts.length > 0}
        <section class="related-products">
          <h2 class="section-title">You Might Also Like</h2>
          <div class="related-grid">
            {#each relatedProducts as related}
              <a href="/products/{related.id}" class="related-card">
                <div class="related-image">
                  <img src={related.img} alt={related.name} loading="lazy" />
                  <span class="related-tag" style="background: {related.tagColor}">{related.tag}</span>
                </div>
                <div class="related-info">
                  <span class="related-origin">{related.origin}</span>
                  <h3>{related.name}</h3>
                  <div class="related-rating">
                    <Star size={14} class="star-icon filled" fill="currentColor" />
                    <span>{related.rating} ({related.reviews})</span>
                  </div>
                  <span class="related-price">${related.price.toFixed(2)}</span>
                </div>
              </a>
            {/each}
          </div>
        </section>
      {/if}
    {/if}
  </div>

  {#if product}
    <div class="mobile-sticky-cta" class:visible={y > 600}>
      <div class="mobile-cta-info">
        <span class="mobile-cta-name">{product.name}</span>
        <span class="mobile-cta-price">{formattedPrice}</span>
      </div>
      <button class="btn btn-primary mobile-add-btn" onclick={addToCart} disabled={isAdding}>
        {#if isAdding}
          <span class="spinner-small"></span> Adding...
        {:else}
          <ShoppingCart size={18} /> Add to Cart
        {/if}
      </button>
    </div>
  {/if}
</main>

<style>
  .product-page { 
    padding: 8rem 0 4rem; 
    background: var(--color-bg); 
    min-height: 100vh; 
    position: relative; 
    /* ✅ FIXED: Extra bottom padding so sticky CTA doesn't cover content */
    padding-bottom: 6rem;
  }

  .breadcrumbs { display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; color: var(--color-muted); margin-bottom: 2.5rem; flex-wrap: wrap; }
  .breadcrumbs a { color: var(--color-muted); transition: var(--transition); }
  .breadcrumbs a:hover { color: var(--color-accent); }
  .breadcrumbs .separator { font-size: 0.7rem; opacity: 0.5; }
  .breadcrumbs .current { color: var(--color-brown-dark); font-weight: 600; }

  .not-found { text-align: center; padding: 4rem 0; }
  .empty-icon { color: var(--color-accent); margin-bottom: 1.5rem; opacity: 0.5; }
  .not-found h2 { margin-bottom: 1rem; }
  .not-found p { margin-bottom: 2rem; color: var(--color-muted); }

  .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-bottom: 5rem; }

  .product-gallery { position: sticky; top: 6rem; align-self: start; }
  .main-image { 
    position: relative; border-radius: var(--radius-lg); overflow: hidden; 
    background: var(--color-cream); aspect-ratio: 1 / 1; margin-bottom: 1rem; cursor: crosshair;
  }
  .main-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--transition); }
  .main-image:hover img { transform: scale(1.08); }
  
  .image-badge { 
    position: absolute; top: 1.5rem; left: 1.5rem; padding: 0.5rem 1.2rem; border-radius: 50px; 
    color: white; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: var(--shadow-sm);
  }
  .zoom-hint {
    position: absolute; bottom: 1.5rem; right: 1.5rem; width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255, 255, 255, 0.9); border: none; display: grid; place-items: center;
    color: var(--color-brown-dark); opacity: 0; transform: translateY(10px); transition: var(--transition); pointer-events: none;
  }
  .main-image:hover .zoom-hint { opacity: 1; transform: translateY(0); }

  .thumbnails { display: flex; gap: 1rem; }
  .thumb { 
    width: 80px; height: 80px; border-radius: var(--radius); overflow: hidden; border: 2px solid transparent; 
    cursor: pointer; transition: var(--transition); background: var(--color-cream); padding: 0;
  }
  .thumb.active { border-color: var(--color-accent); box-shadow: var(--shadow-sm); }
  .thumb:hover { border-color: var(--color-accent-light); }
  .thumb img { width: 100%; height: 100%; object-fit: cover; }

  .product-details { display: flex; flex-direction: column; gap: 1.5rem; }
  .origin-badge { 
    display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(217, 119, 6, 0.1); 
    color: var(--color-accent-dark); padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600; width: fit-content; 
  }
  .product-details h1 { font-size: clamp(2rem, 4vw, 2.8rem); line-height: 1.2; margin: 0; }
  
  .rating { display: flex; align-items: center; gap: 0.8rem; }
  .stars { display: flex; gap: 0.2rem; }
  .star-icon { color: #d1d5db; transition: var(--transition); }
  .star-icon.filled { color: var(--color-accent); }
  .review-count { font-size: 0.9rem; color: var(--color-muted); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
  .review-count:hover { color: var(--color-accent); }

  .price-block { display: flex; align-items: baseline; gap: 0.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(59, 36, 22, 0.1); }
  .price { font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: var(--color-brown-dark); }
  .unit { font-size: 1.1rem; color: var(--color-muted); }

  .description { font-size: 1.1rem; line-height: 1.7; color: var(--color-muted); margin: 0; }

  .tasting-notes, .roast-profile { display: flex; flex-direction: column; gap: 0.8rem; }
  .label { font-weight: 600; color: var(--color-brown-dark); font-size: 0.95rem; }
  .notes-list { display: flex; flex-wrap: wrap; gap: 0.6rem; }
  .note-badge { 
    background: var(--color-cream); color: var(--color-brown-dark); padding: 0.5rem 1rem; 
    border-radius: 50px; font-size: 0.9rem; font-weight: 500; border: 1px solid rgba(59, 36, 22, 0.05);
  }

  .roast-dots { display: flex; gap: 1.5rem; align-items: center; }
  .roast-dot-wrapper { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
  .roast-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--color-cream); border: 2px solid var(--color-cappuccino); transition: var(--transition); }
  .roast-dot.filled { background: var(--color-accent); border-color: var(--color-accent); transform: scale(1.2); }
  .roast-label { font-size: 0.75rem; color: var(--color-muted); font-weight: 500; }
  .roast-label.active { color: var(--color-brown-dark); font-weight: 700; }

  .specs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 1.5rem; background: var(--color-white); border-radius: var(--radius); border: 1px solid rgba(59, 36, 22, 0.06); }
  .spec-item { display: flex; align-items: flex-start; gap: 0.8rem; }
  .spec-item svg { color: var(--color-accent); margin-top: 2px; flex-shrink: 0; }
  .spec-label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-muted); font-weight: 600; }
  .spec-value { display: block; font-size: 0.95rem; font-weight: 600; color: var(--color-brown-dark); margin-top: 0.2rem; }

  .purchase-actions { display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
  .quantity-selector { display: flex; align-items: center; border: 2px solid var(--color-cream); border-radius: 50px; overflow: hidden; background: var(--color-white); }
  .quantity-selector button { width: 48px; height: 48px; display: grid; place-items: center; background: transparent; border: none; cursor: pointer; color: var(--color-brown-dark); transition: var(--transition); }
  .quantity-selector button:hover { background: var(--color-cream); }
  .qty-value { width: 40px; text-align: center; font-weight: 700; font-size: 1.1rem; color: var(--color-brown-dark); }
  
  .add-to-cart-btn { flex: 1; min-width: 200px; padding: 1rem 2rem; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem; }
  
  .icon-only { width: 52px; height: 52px; padding: 0; display: grid; place-items: center; }
  .icon-only.wished { background: #fee2e2; border-color: #fecaca; color: #dc2626; }
  .icon-only.wished svg { color: #dc2626; }

  .trust-row { display: flex; gap: 1.5rem; padding: 1.5rem 0; border-top: 1px solid rgba(59, 36, 22, 0.1); border-bottom: 1px solid rgba(59, 36, 22, 0.1); flex-wrap: wrap; }
  .trust-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; color: var(--color-muted); font-weight: 500; }
  .trust-item svg { color: var(--color-accent); }

  .details-accordion { display: flex; flex-direction: column; border-bottom: 1px solid rgba(59, 36, 22, 0.1); }
  .acc-icon { margin-right: 8px; color: var(--color-accent); }
  .accordion-header { 
    display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 1.2rem 0; 
    background: transparent; border: none; border-bottom: 1px solid rgba(59, 36, 22, 0.05); 
    font-size: 1rem; font-weight: 600; color: var(--color-brown-dark); cursor: pointer; text-align: left; transition: var(--transition); 
  }
  .accordion-header span { display: flex; align-items: center; }
  .accordion-header:hover { color: var(--color-accent); }
  .accordion-header svg { transition: transform 0.3s ease; }
  .accordion-header.active svg:last-child { transform: rotate(180deg); color: var(--color-accent); }
  .accordion-content { padding: 1rem 0 1.5rem; color: var(--color-muted); line-height: 1.7; font-size: 0.95rem; }
  .accordion-content ul { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 0.8rem; }
  .accordion-content li { display: flex; align-items: center; gap: 0.8rem; }

  .related-products { padding-top: 4rem; border-top: 1px solid rgba(59, 36, 22, 0.1); }
  .section-title { font-size: 1.8rem; text-align: center; margin-bottom: 2.5rem; }
  .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
  
  .related-card { 
    display: block; background: var(--color-white); border-radius: var(--radius); overflow: hidden; 
    border: 1px solid rgba(59, 36, 22, 0.06); transition: var(--transition); text-decoration: none; color: inherit; 
  }
  .related-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
  .related-image { aspect-ratio: 4/3; overflow: hidden; background: var(--color-cream); position: relative; }
  .related-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
  .related-card:hover .related-image img { transform: scale(1.05); }
  .related-tag { position: absolute; top: 0.8rem; left: 0.8rem; padding: 0.3rem 0.8rem; border-radius: 50px; color: white; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
  .related-info { padding: 1.2rem; }
  .related-origin { font-size: 0.8rem; color: var(--color-accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .related-info h3 { font-size: 1.15rem; margin: 0.4rem 0; font-family: var(--font-display); line-height: 1.3; }
  .related-rating { display: flex; align-items: center; gap: 0.3rem; font-size: 0.85rem; color: var(--color-accent); margin-bottom: 0.5rem; }
  .related-price { font-size: 1.2rem; font-weight: 700; color: var(--color-brown-dark); }

  .mobile-sticky-cta {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: var(--color-white);
    border-top: 1px solid rgba(59, 36, 22, 0.1);
    padding: 1rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
    z-index: 90;
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .mobile-sticky-cta.visible { transform: translateY(0); }
  .mobile-cta-info { display: flex; flex-direction: column; }
  .mobile-cta-name { font-family: var(--font-display); font-weight: 700; color: var(--color-brown-dark); font-size: 1rem; }
  .mobile-cta-price { color: var(--color-accent); font-weight: 700; font-size: 1.1rem; }
  .mobile-add-btn { flex: 0 0 auto; padding: 0.8rem 1.5rem; font-size: 1rem; }

  .spinner, .spinner-small {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.6s linear infinite;
  }
  .spinner-small { width: 16px; height: 16px; border-width: 2px; }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 900px) {
    .product-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .product-gallery { position: relative; top: 0; }
    .related-grid { grid-template-columns: 1fr 1fr; }
  }
  
  @media (max-width: 600px) {
    .product-page { padding: 6rem 0 7rem; }
    .purchase-actions { flex-direction: column; }
    .quantity-selector { width: 100%; justify-content: space-between; }
    .qty-value { flex: 1; }
    .add-to-cart-btn { width: 100%; }
    .icon-only { width: 100%; height: 48px; }
    .related-grid { 
      grid-template-columns: 1fr; 
      display: flex; overflow-x: auto; gap: 1rem; padding-bottom: 1rem; scroll-snap-type: x mandatory; 
    }
    .related-card { min-width: 260px; scroll-snap-align: start; }
    .trust-row { flex-direction: column; gap: 0.8rem; }
    .main-image { aspect-ratio: 4/3; }
    .specs-grid { grid-template-columns: 1fr; gap: 1.2rem; }
  }
</style>