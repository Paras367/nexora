<script lang="ts">
  import { navLinks, products } from '../data';
  import { cart } from '../stores/cart.svelte.ts';
  import { slide, fade } from 'svelte/transition';
  import { toast } from '../stores/toast.svelte';
  import { goto } from '$app/navigation';

  let y = $state(0);
  let w = $state(0);
  let isOpen = $state(false);
  let active = $state('');
  let progress = $state(0);
  let cartBounce = $state(false);
  
  // Search State
  let isSearchOpen = $state(false);
  let searchQuery = $state('');
  let searchRef = $state<HTMLElement | null>(null);

  const scrolled = $derived(y > 20);
  
  const closeAll = () => { 
    isOpen = false; 
    isSearchOpen = false; 
    searchQuery = '';
  };

  const toggle = () => (isOpen = !isOpen);
  
  const toggleSearch = () => {
    isSearchOpen = !isSearchOpen;
    if (isSearchOpen) {
      setTimeout(() => document.getElementById('nav-search')?.focus(), 150);
    } else {
      searchQuery = '';
    }
  };

  // ✅ REAL SEARCH: Reactive filtering of products
  const searchResults = $derived(
    searchQuery.trim().length > 1 
      ? products.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.notes.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5) // Limit to top 5 results
      : []
  );

  const handleSearchSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      goto(`/products/${searchResults[0].id}`);
      closeAll();
    } else if (searchQuery.trim().length > 1) {
      toast.info('No coffee blends found matching your search.');
    }
  };

  const selectProduct = (id: string) => {
    goto(`/products/${id}`);
    closeAll();
  };

  // Close search dropdown when clicking outside
  $effect(() => {
    if (!isSearchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef && !searchRef.contains(e.target as Node)) {
        isSearchOpen = false;
        searchQuery = '';
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  // Menu khula ho toh peeche ka scroll band
  $effect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  });

  // Desktop width par aate hi drawer band
  $effect(() => { if (w > 900) { isOpen = false; } });

  // Scroll progress calculation (0 to 100)
  $effect(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
  });

  // Cart badge bounce animation trigger
  $effect(() => {
    if (cart.count > 0) {
      cartBounce = true;
      const timer = setTimeout(() => (cartBounce = false), 400);
      return () => clearTimeout(timer);
    }
  });

  // Scroll-spy: jo section screen par hai uska link highlight
  $effect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    const io = new IntersectionObserver(
      (entries) => { 
        for (const e of entries) {
          if (e.isIntersecting) active = '#' + e.target.id; 
        }
      },
      { rootMargin: '-10% 0px -60% 0px' }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={w} onkeydown={(e) => e.key === 'Escape' && closeAll()} />

<header class="navbar" class:scrolled>
  <!-- Scroll Progress Bar -->
  <div class="scroll-progress" style="width: {progress}%"></div>

  <nav class="container nav-container" aria-label="Main">
    <!-- ✅ ENHANCED LOGO: Favicon with Animation -->
    <a href="/" class="logo" onclick={closeAll}>
      <img src="/favicon.png" alt="Nexora Logo" class="logo-favicon" />
      <span class="logo-text">Nexora</span>
    </a>

    <ul class="nav-links desktop-only">
      {#each navLinks as link (link.href)}
        <li>
          <a href={link.href} class:active={active === link.href} aria-current={active === link.href ? 'true' : undefined}>
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="nav-actions">
      <!-- ✅ REAL SEARCH: Inline Search Bar with Dropdown -->
      {#if isSearchOpen}
        <div class="search-container" in:slide={{ axis: 'x', duration: 300 }} bind:this={searchRef}>
          <form class="inline-search" onsubmit={handleSearchSubmit}>
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input 
              id="nav-search" 
              type="text" 
              placeholder="Search blends, origins..." 
              bind:value={searchQuery} 
              autocomplete="off"
            />
            {#if searchQuery}
              <button type="button" class="clear-search" onclick={() => searchQuery = ''} aria-label="Clear search">
                <i class="fa-solid fa-xmark"></i>
              </button>
            {/if}
          </form>

          <!-- Search Results Dropdown -->
          {#if searchQuery.length > 1}
            <div class="search-dropdown" in:fade={{ duration: 200 }}>
              {#if searchResults.length > 0}
                <ul class="results-list">
                  {#each searchResults as product}
                    <li>
                      <button class="result-item" onclick={() => selectProduct(product.id)}>
                        <img src={product.img} alt={product.name} />
                        <div class="result-info">
                          <span class="result-name">{product.name}</span>
                          <span class="result-meta">
                            <i class="fa-solid fa-location-dot"></i> {product.origin}
                          </span>
                        </div>
                        <span class="result-price">${product.price.toFixed(2)}</span>
                      </button>
                    </li>
                  {/each}
                </ul>
              {:else}
                <div class="no-results">
                  <i class="fa-solid fa-mug-hot"></i>
                  <p>No blends found for "<strong>{searchQuery}</strong>"</p>
                </div>
              {/if}
              <div class="search-footer">
                <span>Press <kbd>Enter</kbd> to view top match</span>
              </div>
            </div>
          {/if}
        </div>
      {/if}
      
      <!-- Search Toggle Button -->
      <button class="icon-btn search-toggle" onclick={toggleSearch} aria-label="Toggle search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>

      <a href="/#products" class="btn btn-primary cta desktop-only">
        <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i> Order Now
      </a>

      <a href="/#products" class="bag" aria-label="Cart, {cart.count} {cart.count === 1 ? 'item' : 'items'}">
        <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i>
        {#if cart.count > 0}
          <span class="bag-count" class:bounce={cartBounce}>{cart.count}</span>
        {/if}
      </a>

      <button
        class="hamburger" class:active={isOpen} onclick={toggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="mobile-menu"
      >
        <span class="line line-1"></span><span class="line line-2"></span><span class="line line-3"></span>
      </button>
    </div>
  </nav>
</header>

<!-- Overlay + drawer -->
<button type="button" class="overlay" class:active={isOpen} aria-label="Close menu" tabindex="-1" onclick={closeAll}></button>

<div id="mobile-menu" class="drawer" class:active={isOpen} inert={!isOpen}>
  <div class="drawer-content">
    <div class="drawer-header">
      <!-- ✅ ENHANCED MOBILE LOGO -->
      <div class="drawer-logo">
        <img src="/favicon.png" alt="Nexora Logo" class="drawer-favicon" />
        <span>Nexora</span>
      </div>
      <button class="close-drawer" onclick={closeAll} aria-label="Close menu">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- ✅ REAL SEARCH: Mobile Search with Results -->
    <div class="mobile-search-container" bind:this={searchRef}>
      <form class="mobile-search" onsubmit={(e) => { e.preventDefault(); if(searchResults.length > 0) selectProduct(searchResults[0].id); }}>
        <i class="fa-solid fa-magnifying-glass"></i>
        <input 
          type="text" 
          placeholder="Search coffee, gear..." 
          bind:value={searchQuery}
          autocomplete="off"
        />
        {#if searchQuery}
          <button type="button" class="clear-search-mobile" onclick={() => searchQuery = ''}>
            <i class="fa-solid fa-xmark"></i>
          </button>
        {/if}
      </form>
      
      {#if searchQuery.length > 1}
        <div class="mobile-search-results" in:fade>
          {#if searchResults.length > 0}
            {#each searchResults as product}
              <button class="mobile-result-item" onclick={() => selectProduct(product.id)}>
                <img src={product.img} alt={product.name} />
                <div class="mobile-result-info">
                  <span class="mobile-result-name">{product.name}</span>
                  <span class="mobile-result-price">${product.price.toFixed(2)}</span>
                </div>
              </button>
            {/each}
          {:else}
            <p class="mobile-no-results">No blends found.</p>
          {/if}
        </div>
      {/if}
    </div>

    <ul class="drawer-links">
      {#each navLinks as link, i (link.href)}
        <li style="transition-delay: {i * 0.06}s">
          <a href={link.href} class:active={active === link.href} onclick={closeAll}>
            <i class={link.icon} aria-hidden="true"></i>
            <span>{link.label}</span>
            {#if active === link.href}
              <i class="fa-solid fa-chevron-right active-indicator"></i>
            {/if}
          </a>
        </li>
      {/each}
    </ul>

    <div class="drawer-cta">
      <a href="/#products" class="btn btn-primary" onclick={closeAll}>
        <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i> Order Now
      </a>
      <p class="drawer-note">
        <i class="fa-solid fa-truck-fast"></i> Free shipping on orders over $50
      </p>
    </div>
  </div>
</div>

<style>
  .navbar {
    --nav-fg: var(--color-white);
    position: fixed; inset: 0 0 auto 0; z-index: 110;
    padding: 1.2rem 0; background: transparent;
    transition: padding 0.4s var(--transition), background 0.4s var(--transition), box-shadow 0.4s var(--transition);
  }
  .navbar.scrolled {
    --nav-fg: var(--color-brown-dark);
    padding: 0.8rem 0;
    background: rgba(253, 248, 243, 0.92);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(59, 36, 22, 0.08);
    box-shadow: 0 4px 30px rgba(59, 36, 22, 0.08);
  }

  /* Scroll Progress Bar */
  .scroll-progress {
    position: absolute; top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, var(--color-accent), var(--color-accent-light));
    z-index: 115; transition: width 0.1s linear; box-shadow: 0 0 10px var(--color-accent);
  }

  .nav-container { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }

  /* ✅ ENHANCED LOGO STYLES */
  .logo {
    display: flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--nav-fg);
    transition: transform 0.3s var(--transition); flex-shrink: 0; white-space: nowrap;
  }
  .logo:hover { transform: scale(1.03); }
  
  .logo-favicon { 
    width: 36px; 
    height: 36px; 
    object-fit: contain;
    transition: transform 0.4s var(--transition), filter 0.4s var(--transition);
    animation: logoFloat 4s ease-in-out infinite;
  }
  
  .logo:hover .logo-favicon { 
    animation: none; /* Pause float on hover for crisp interaction */
    transform: rotate(-12deg) scale(1.15); 
    filter: drop-shadow(0 6px 12px rgba(217, 119, 6, 0.5));
  }

  @keyframes logoFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-4px) scale(1.05); }
  }

  .nav-links { display: flex; align-items: center; gap: 0.5rem; list-style: none; margin: 0; padding: 0; margin-left: auto; }
  .nav-links a { 
    position: relative; padding: 0.5rem 1rem; font-size: 0.95rem; font-weight: 500; color: var(--nav-fg);
    border-radius: var(--radius-full); transition: color 0.3s var(--transition);
  }
  /* Animated Underline */
  .nav-links a::after {
    content: ''; position: absolute; bottom: 0; left: 50%; width: 0; height: 2px;
    background: var(--color-accent); transition: all 0.3s var(--transition);
    transform: translateX(-50%); border-radius: 2px;
  }
  .nav-links a:hover::after, .nav-links a.active::after { width: 60%; }
  .nav-links a:hover, .nav-links a.active { color: var(--color-accent); }
  
  /* Scrolled state adjustments */
  .navbar.scrolled .nav-links a { color: var(--color-brown-dark); }
  .navbar.scrolled .nav-links a:hover, .navbar.scrolled .nav-links a.active { color: var(--color-accent-dark); }
  .navbar.scrolled .nav-links a::after { background: var(--color-accent-dark); }

  .nav-actions { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
  .cta { padding: 0.65rem 1.4rem; font-size: 0.9rem; }

  /* Icon Buttons */
  .icon-btn {
    display: grid; place-items: center; width: 44px; height: 44px;
    border-radius: 50%; background: transparent; border: none;
    color: var(--nav-fg); font-size: 1.1rem; cursor: pointer; transition: var(--transition);
  }
  .icon-btn:hover { background: rgba(255, 255, 255, 0.15); color: var(--color-accent); }
  .navbar.scrolled .icon-btn:hover { background: rgba(59, 36, 22, 0.08); }

  /* ✅ REAL SEARCH: Desktop Search Container */
  .search-container { position: relative; margin-right: 0.5rem; z-index: 120; }
  .inline-search {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--color-white); border-radius: 50px;
    padding: 0.4rem 0.4rem 0.4rem 1rem;
    box-shadow: var(--shadow-md); border: 1px solid rgba(59, 36, 22, 0.1);
    transition: var(--transition);
  }
  .inline-search:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
  }
  .search-icon { color: var(--color-muted); font-size: 0.9rem; }
  .inline-search input {
    border: none; outline: none; background: transparent;
    font-size: 0.95rem; color: var(--color-brown-dark); width: 160px;
  }
  .clear-search {
    width: 28px; height: 28px; border-radius: 50%; border: none;
    background: rgba(59, 36, 22, 0.05); color: var(--color-muted);
    cursor: pointer; display: grid; place-items: center; transition: var(--transition);
  }
  .clear-search:hover { background: var(--color-accent); color: white; }

  .search-dropdown {
    position: absolute; top: calc(100% + 10px); right: 0;
    width: 320px; background: var(--color-white);
    border-radius: var(--radius); box-shadow: var(--shadow-xl);
    border: 1px solid rgba(59, 36, 22, 0.08);
    overflow: hidden;
  }
  .results-list { list-style: none; margin: 0; padding: 0.5rem; max-height: 300px; overflow-y: auto; }
  .result-item {
    display: flex; align-items: center; gap: 1rem; width: 100%;
    padding: 0.8rem; border-radius: var(--radius-sm);
    background: transparent; border: none; cursor: pointer;
    transition: var(--transition); text-align: left;
  }
  .result-item:hover { background: var(--color-cream); }
  .result-item img {
    width: 48px; height: 48px; border-radius: var(--radius-sm);
    object-fit: cover; border: 1px solid rgba(59, 36, 22, 0.1);
  }
  .result-info { flex: 1; display: flex; flex-direction: column; gap: 0.2rem; }
  .result-name { font-weight: 600; color: var(--color-brown-dark); font-size: 0.95rem; }
  .result-meta { font-size: 0.8rem; color: var(--color-muted); display: flex; align-items: center; gap: 0.3rem; }
  .result-meta i { color: var(--color-accent); font-size: 0.7rem; }
  .result-price { font-weight: 700; color: var(--color-accent-dark); font-size: 0.95rem; }
  
  .no-results { padding: 2rem 1rem; text-align: center; color: var(--color-muted); }
  .no-results i { font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5; display: block; }
  .no-results p { margin: 0; font-size: 0.9rem; }
  
  .search-footer {
    padding: 0.8rem 1rem; background: var(--color-cream);
    font-size: 0.8rem; color: var(--color-muted); text-align: center;
    border-top: 1px solid rgba(59, 36, 22, 0.05);
  }
  .search-footer kbd {
    background: var(--color-white); padding: 0.1rem 0.4rem;
    border-radius: 4px; border: 1px solid rgba(59, 36, 22, 0.2);
    font-family: inherit; font-size: 0.75rem;
  }

  /* Cart bag */
  .bag { 
    position: relative; display: grid; place-items: center; width: 44px; height: 44px; 
    font-size: 1.15rem; color: var(--nav-fg); border-radius: 50%; 
    transition: background 0.3s var(--transition), color 0.3s var(--transition);
  }
  .bag:hover { background: rgba(255, 255, 255, 0.15); color: var(--color-accent); }
  .navbar.scrolled .bag:hover { background: rgba(59, 36, 22, 0.08); }
  
  .bag-count {
    position: absolute; top: 0; right: 0; min-width: 20px; height: 20px; padding: 0 5px;
    display: grid; place-items: center; border-radius: 10px;
    background: var(--color-accent); color: #fff; font-size: 0.72rem; font-weight: 700;
    border: 2px solid var(--color-bg);
  }
  .bag-count.bounce { animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  @keyframes pop { 
    0% { transform: scale(0.4); } 
    50% { transform: scale(1.3); } 
    100% { transform: scale(1); } 
  }

  /* Hamburger */
  .hamburger {
    display: none; flex-direction: column; justify-content: center; align-items: center; gap: 6px;
    width: 44px; height: 44px; padding: 0; border-radius: 50%;
    background: transparent; border: none; cursor: pointer; flex-shrink: 0;
  }
  .line { width: 24px; height: 2.5px; border-radius: 2px; background: var(--nav-fg); transition: all 0.3s var(--transition); }
  .hamburger.active .line { background: var(--color-brown-dark); }
  .hamburger.active .line-1 { transform: translateY(8.5px) rotate(45deg); }
  .hamburger.active .line-2 { opacity: 0; transform: scaleX(0); }
  .hamburger.active .line-3 { transform: translateY(-8.5px) rotate(-45deg); }

  /* Mobile overlay + drawer */
  .overlay {
    position: fixed; inset: 0; z-index: 100; width: 100%; padding: 0; border-radius: 0;
    background: rgba(45, 27, 14, 0.6); backdrop-filter: blur(6px);
    opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s;
  }
  .overlay.active { opacity: 1; visibility: visible; }

  .drawer {
    position: fixed; top: 0; right: 0; z-index: 105; width: 85%; max-width: 380px; height: 100dvh;
    background: var(--color-bg); box-shadow: -10px 0 50px rgba(59, 36, 22, 0.2);
    transform: translateX(100%); visibility: hidden;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.5s;
  }
  .drawer.active { transform: none; visibility: visible; }
  
  .drawer-content { display: flex; flex-direction: column; height: 100%; padding: 1.5rem 2rem 2rem; overflow-y: auto; }

  .drawer-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(59, 36, 22, 0.08);
  }
  .drawer-logo {
    display: flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--color-brown-dark);
  }
  .drawer-favicon {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
  
  .close-drawer {
    width: 40px; height: 40px; border-radius: 50%;
    display: grid; place-items: center;
    background: rgba(59, 36, 22, 0.05); color: var(--color-brown-dark);
    border: none; cursor: pointer; transition: var(--transition);
  }
  .close-drawer:hover { background: var(--color-accent); color: white; transform: rotate(90deg); }

  /* ✅ REAL SEARCH: Mobile Search */
  .mobile-search-container { position: relative; margin-bottom: 1.5rem; }
  .mobile-search {
    display: flex; align-items: center; gap: 0.8rem;
    background: var(--color-white); border: 1px solid rgba(59, 36, 22, 0.1);
    border-radius: 50px; padding: 0.8rem 1.2rem; transition: var(--transition);
  }
  .mobile-search:focus-within { border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1); }
  .mobile-search i { color: var(--color-muted); }
  .mobile-search input {
    flex: 1; border: none; outline: none; background: transparent;
    font-size: 1rem; color: var(--color-brown-dark);
  }
  .clear-search-mobile {
    background: none; border: none; color: var(--color-muted); cursor: pointer;
    display: grid; place-items: center; padding: 0.2rem;
  }
  .mobile-search-results {
    position: absolute; top: 100%; left: 0; right: 0;
    background: var(--color-white); border-radius: var(--radius);
    box-shadow: var(--shadow-lg); border: 1px solid rgba(59, 36, 22, 0.08);
    margin-top: 0.5rem; overflow: hidden; z-index: 110;
  }
  .mobile-result-item {
    display: flex; align-items: center; gap: 1rem; width: 100%;
    padding: 1rem; border: none; background: transparent;
    border-bottom: 1px solid rgba(59, 36, 22, 0.05); cursor: pointer;
    transition: var(--transition); text-align: left;
  }
  .mobile-result-item:last-child { border-bottom: none; }
  .mobile-result-item:hover { background: var(--color-cream); }
  .mobile-result-item img {
    width: 40px; height: 40px; border-radius: var(--radius-sm); object-fit: cover;
  }
  .mobile-result-info { flex: 1; display: flex; flex-direction: column; }
  .mobile-result-name { font-weight: 600; color: var(--color-brown-dark); font-size: 0.9rem; }
  .mobile-result-price { color: var(--color-accent-dark); font-weight: 700; font-size: 0.9rem; }
  .mobile-no-results { padding: 1.5rem; text-align: center; color: var(--color-muted); font-size: 0.9rem; }

  .drawer-links { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; list-style: none; margin: 0; padding: 0; }
  .drawer-links li {
    opacity: 0; transform: translateX(30px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .drawer.active .drawer-links li { opacity: 1; transform: translateX(0); }
  
  .drawer-links a {
    display: flex; align-items: center; gap: 1rem; padding: 1rem 1.2rem;
    font-size: 1.1rem; font-weight: 600; color: var(--color-brown-dark); border-radius: var(--radius);
    transition: all 0.3s var(--transition);
  }
  .drawer-links a i { width: 24px; text-align: center; color: var(--color-muted); transition: color 0.3s; }
  .drawer-links a:hover, .drawer-links a.active { background: rgba(59, 36, 22, 0.06); color: var(--color-brown-dark); }
  .drawer-links a:hover i, .drawer-links a.active i { color: var(--color-accent); }
  .active-indicator { margin-left: auto; font-size: 0.9rem; color: var(--color-accent) !important; }

  .drawer-cta { padding-top: 1.5rem; border-top: 1px solid rgba(59, 36, 22, 0.1); }
  .drawer-cta .btn { width: 100%; padding: 1rem; font-size: 1.05rem; justify-content: center; }
  .drawer-note {
    text-align: center; font-size: 0.85rem; color: var(--color-muted); margin-top: 1rem;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  }
  .drawer-note i { color: var(--color-accent); }

  /* 📱 Mobile Responsiveness & Overlap Fixes */
  @media (max-width: 900px) {
    .desktop-only { display: none; }
    .hamburger { display: flex; }
    .nav-actions { margin-left: auto; gap: 0.5rem; }
  }

  @media (max-width: 600px) {
    .navbar { padding: 1rem 0; }
    .nav-container { gap: 0.75rem; }
    .logo { font-size: 1.3rem; gap: 0.4rem; }
    .logo-text { font-size: 1.2rem; }
    .logo-favicon { width: 32px; height: 32px; }
    .icon-btn, .bag, .hamburger { width: 40px; height: 40px; font-size: 1rem; }
  }

  @media (max-width: 400px) {
    .drawer { width: 100%; max-width: none; }
    .logo-text { display: none; }
    .inline-search input { width: 100px; }
    .search-dropdown { width: 100vw; right: -1.5rem; border-radius: 0 0 var(--radius) var(--radius); }
  }
</style>