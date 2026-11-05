<script lang="ts">
  import { onMount } from 'svelte';
  import { products, productCategories } from '../data';
  import { cart } from '../stores/cart.svelte';
  import { reveal } from '../actions';
  import { formatPrice, starIcons } from '../utils';
  import type { Product } from '../types';

  const STORAGE_KEY = 'nexora:wishlist';

  let active = $state<(typeof productCategories)[number]>('All');
  let wishlist = $state<string[]>([]);
  let justAdded = $state<string | null>(null);
  let quick = $state<Product | null>(null);
  let dialog = $state<HTMLDialogElement>();
  let timer: ReturnType<typeof setTimeout>;

  const filtered = $derived(active === 'All' ? products : products.filter((p) => p.category === active));

  // Wishlist refresh ke baad bhi bachi rahe
  onMount(() => {
    try { wishlist = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'); } catch { /* private mode etc. */ }
  });

  function toggleWishlist(id: string) {
    wishlist = wishlist.includes(id) ? wishlist.filter((w) => w !== id) : [...wishlist, id];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist)); } catch { /* ignore */ }
  }

  function addToCart(id: string) {
    cart.add(id);
    justAdded = id;
    clearTimeout(timer);
    timer = setTimeout(() => (justAdded = null), 1500);
  }

  function openQuick(p: Product) {
    quick = p;
    dialog?.showModal();
  }
</script>

<section id="products" class="section products" aria-labelledby="products-title">
  <div class="container">

    <div class="section-header reveal" use:reveal>
      <span class="eyebrow"><i class="fa-solid fa-mug-hot" aria-hidden="true"></i> Premium Selection</span>
      <h2 id="products-title" class="section-title">Our Signature Blends</h2>
      <p class="section-subtitle">
        Hand-selected beans from the world's finest growing regions, roasted in small batches for peak flavor and freshness.
      </p>
    </div>

    <div class="tabs reveal" use:reveal role="group" aria-label="Filter by roast">
      {#each productCategories as cat (cat)}
        <button class="tab" class:active={active === cat} aria-pressed={active === cat} onclick={() => (active = cat)}>
          {cat === 'All' ? 'All Blends' : cat + ' Roast'}
        </button>
      {/each}
    </div>

    <!-- {#key}: filter badalte hi cards dobara mount hoke animate hote hain -->
    <div class="grid stagger" use:reveal={0.05}>
      {#key active}
        {#each filtered as p, i (p.id)}
          {@const wished = wishlist.includes(p.id)}
          
          <!-- Wrapped in <a> for full-card clickability -->
          <a href="/products/{p.id}" class="card-link" style="--i: {i}">
            <article class="card">
              <div class="image">
                <img src={p.img} alt="{p.name} coffee" width="600" height="400" loading="lazy" decoding="async" />
                <span class="tag" style="background: {p.tagColor}"><i class="fa-solid fa-tag" aria-hidden="true"></i> {p.tag}</span>

                <div class="actions">
                  <!-- stopPropagation prevents navigation when clicking these buttons -->
                  <button class="icon-btn" aria-label="Quick view {p.name}" onclick={(e) => { e.stopPropagation(); openQuick(p); }}>
                    <i class="fa-solid fa-eye" aria-hidden="true"></i>
                  </button>
                  <button class="icon-btn" class:wished aria-pressed={wished}
                    aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                    onclick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}>
                    <i class={wished ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div class="info">
                <div class="origin"><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>{p.origin}</span></div>
                <h3>{p.name}</h3>

                <div class="rating" role="img" aria-label="Rated {p.rating} out of 5 from {p.reviews} reviews">
                  <span class="stars" aria-hidden="true">{#each starIcons(p.rating) as s}<i class={s}></i>{/each}</span>
                  <span class="reviews" aria-hidden="true">({p.reviews})</span>
                </div>

                <p class="notes"><i class="fa-solid fa-mug-saucer" aria-hidden="true"></i> {p.notes}</p>

                <div class="footer">
                  <div class="price-wrap">
                    <span class="price">{formatPrice(p.price)}</span>
                    <span class="unit">/ {p.weight} bag</span>
                  </div>
                  <button class="btn btn-primary add" class:added={justAdded === p.id} onclick={(e) => { e.stopPropagation(); addToCart(p.id); }} aria-label="Add {p.name} to cart">
                    {#if justAdded === p.id}
                      <i class="fa-solid fa-check" aria-hidden="true"></i><span>Added!</span>
                    {:else}
                      <i class="fa-solid fa-cart-plus" aria-hidden="true"></i><span>Add</span>
                    {/if}
                  </button>
                </div>
              </div>
            </article>
          </a>
        {/each}
      {/key}
    </div>

    <div class="more reveal" use:reveal>
      <p>Not sure where to start?</p>
      <a href="#newsletter" class="btn btn-outline-dark"><i class="fa-solid fa-envelope" aria-hidden="true"></i> Get 10% off your first bag</a>
    </div>
  </div>
</section>

<!-- Quick view: native <dialog> -->
<dialog bind:this={dialog} class="quick" aria-label={quick?.name ?? 'Product details'}
  onclick={(e) => e.target === dialog && dialog?.close()} onclose={() => (quick = null)}>
  {#if quick}
    <button class="close" aria-label="Close" onclick={() => dialog?.close()}><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
    <img src={quick.img} alt="{quick.name} coffee" width="600" height="400" />
    <div class="quick-body">
      <div class="origin"><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>{quick.origin}</span></div>
      <h3>{quick.name}</h3>
      <p class="notes">{quick.notes}</p>
      <p>{quick.description}</p>
      <ul class="meta">
        <li><i class="fa-solid fa-weight-scale" aria-hidden="true"></i> {quick.weight}</li>
        <li><i class="fa-solid fa-fire" aria-hidden="true"></i> {quick.category} roast</li>
        <li><i class="fa-solid fa-calendar-check" aria-hidden="true"></i> {quick.roastDate}</li>
      </ul>
      <div class="footer">
        <span class="price">{formatPrice(quick.price)}</span>
        <button class="btn btn-primary" onclick={() => { if (quick) { addToCart(quick.id); dialog?.close(); } }}>
          <i class="fa-solid fa-cart-plus" aria-hidden="true"></i> Add to cart
        </button>
      </div>
    </div>
  {/if}
</dialog>

<style>
  .products { background: var(--color-bg); }
  .section-header { margin-bottom: 2rem; }

  .tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.8rem; margin-bottom: 2.5rem; }
  .tab {
    padding: 0.6rem 1.5rem; border: 1px solid rgba(59, 36, 22, 0.2); border-radius: 50px;
    color: var(--color-muted); font-weight: 600; font-size: 0.95rem; cursor: pointer;
    transition: var(--transition);
  }
  .tab:hover { border-color: var(--color-accent-dark); color: var(--color-accent-dark); }
  .tab.active { background: var(--color-accent-dark); border-color: var(--color-accent-dark); color: #fff; box-shadow: 0 4px 12px rgba(180, 83, 9, 0.3); }

  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 3rem; }

  /* Link wrapper for full-card clickability */
  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
    border-radius: var(--radius);
    transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
  }
  .card-link:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }
  .card-link:hover { 
    transform: translateY(-10px); 
    box-shadow: 0 20px 40px rgba(59, 36, 22, 0.12); 
  }

  .card {
    height: 100%;
    overflow: hidden; 
    background: var(--color-white); 
    border: 1px solid rgba(59, 36, 22, 0.06);
    border-radius: var(--radius); 
    box-shadow: var(--shadow-sm);
    display: flex; 
    flex-direction: column;
  }

  .image { position: relative; height: 280px; overflow: hidden; background: linear-gradient(135deg, var(--color-cream), var(--color-latte)); }
  .image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease); }
  .card-link:hover .image img { transform: scale(1.1); }

  .tag {
    position: absolute; z-index: 2; top: 1rem; left: 1rem; display: flex; align-items: center; gap: 0.4rem;
    padding: 0.4rem 1rem; border-radius: 50px; color: #fff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
  }

  .actions {
    position: absolute; z-index: 2; top: 1rem; right: 1rem; display: flex; flex-direction: column; gap: 0.5rem;
    opacity: 0; transform: translateX(10px); transition: opacity 0.3s, transform 0.3s var(--ease);
  }
  .card-link:hover .actions, .card-link:focus-within .actions { opacity: 1; transform: none; }
  @media (hover: none) { .actions { opacity: 1; transform: none; } }

  .icon-btn {
    display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%;
    background: var(--color-white); color: var(--color-brown-dark); box-shadow: var(--shadow-sm);
    cursor: pointer; border: none; transition: var(--transition);
  }
  .icon-btn:hover { background: var(--color-accent-dark); color: #fff; transform: scale(1.1); }
  .icon-btn.wished { background: #fee2e2; color: #dc2626; }

  .info { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; }
  .origin {
    display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.6rem;
    color: var(--color-accent-dark); font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  }
  .info h3 { margin-bottom: 0.6rem; font-size: 1.4rem; line-height: 1.3; }

  .rating { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.8rem; }
  .stars { display: flex; gap: 0.2rem; color: var(--color-accent); font-size: 0.85rem; }
  .reviews { font-size: 0.85rem; color: var(--color-muted); }

  .notes { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; font-style: italic; }
  .notes i { color: var(--color-accent); opacity: 0.8; }

  .footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-top: 1rem; border-top: 1px solid rgba(59, 36, 22, 0.08); margin-top: auto; }
  .price-wrap { display: flex; flex-direction: column; }
  .price { font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; line-height: 1; color: var(--color-brown-dark); }
  .unit { margin-top: 0.2rem; font-size: 0.75rem; color: var(--color-muted); }

  .add { min-width: 110px; padding: 0.75rem 1.2rem; font-size: 0.9rem; cursor: pointer; }
  .add.added, .add.added:hover { background: #047857; transform: none; box-shadow: var(--shadow-sm); }

  .more { text-align: center; }
  .more p { margin-bottom: 1rem; font-weight: 500; }

  /* Quick view dialog */
  .quick { width: min(92vw, 720px); padding: 0; overflow: hidden; border: 0; border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); color: var(--color-text); }
  .quick::backdrop { background: rgba(45, 27, 14, 0.7); backdrop-filter: blur(4px); }
  .quick[open] { animation: fadeInUp 0.35s var(--ease); }
  .quick img { width: 100%; height: 260px; object-fit: cover; }
  .quick-body { padding: 1.75rem 2rem 2rem; }
  .quick-body h3 { margin-bottom: 0.5rem; }
  .close {
    position: absolute; top: 0.8rem; right: 0.8rem; display: grid; place-items: center;
    width: 40px; height: 40px; border-radius: 50%; background: var(--color-white); box-shadow: var(--shadow-sm);
    cursor: pointer; border: none; transition: var(--transition);
  }
  .close:hover { background: var(--color-accent-dark); color: white; transform: rotate(90deg); }
  .meta { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; margin: 0 0 1.5rem; padding: 0; list-style: none; font-size: 0.9rem; font-weight: 600; color: var(--color-brown-dark); }
  .meta i { margin-right: 0.35rem; color: var(--color-accent-dark); }

  @media (max-width: 768px) {
    .grid { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
    .image { height: 240px; }
    .price { font-size: 1.5rem; }
  }
  @media (max-width: 480px) {
    .grid { grid-template-columns: 1fr; }
    .info .footer { flex-direction: column; align-items: stretch; }
    .info .price-wrap { align-items: center; }
    .tab { padding: 0.5rem 1rem; font-size: 0.85rem; }
    .more .btn { width: 100%; }
    .quick-body { padding: 1.25rem; }
    .quick .footer { flex-direction: column; align-items: stretch; }
  }
</style>