<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { 
    Coffee, Search, Home, Bug, Lightbulb, 
    BookOpen, Heart, Mail, History, ChevronRight 
  } from 'lucide-svelte';

  // Dynamic coffee-themed messages based on status code
  const getErrorMessage = (status: number) => {
    switch (status) {
      case 404: return "We spilled the beans, but this page is missing.";
      case 500: return "Our espresso machine jammed. We're fixing it right now.";
      case 403: return "Sorry, this blend is reserved for our VIP members.";
      case 503: return "We're currently roasting a fresh batch. Check back soon!";
      default: return "Oops! Something went wrong on our end.";
    }
  };

  const message = getErrorMessage(page.status);

  // Random coffee facts to entertain users
  const coffeeFacts = [
    "Coffee beans are actually the seeds of a fruit called a coffee cherry.",
    "Finland drinks the most coffee per capita in the world.",
    "The word 'coffee' comes from the Arabic word 'qahwa', meaning wine.",
    "A single coffee tree can produce about 10 pounds of coffee per year.",
    "Coffee is the second most traded commodity in the world after oil.",
    "The first webcam was invented to check a coffee pot at Cambridge University.",
    "Decaf coffee still contains a small amount of caffeine (about 2-5mg per cup).",
    "Brazil produces about one-third of all the coffee in the world."
  ];
  
  const randomFact = coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)];

  // Popular pages to keep users engaged
  const popularPages = [
    { href: '/#products', label: 'Our Coffee', icon: Coffee },
    { href: '/about', label: 'Our Story', icon: BookOpen },
    { href: '/#impact', label: 'Social Impact', icon: Heart },
    { href: '/#newsletter', label: 'Join Us', icon: Mail }
  ];

  // Search functionality
  let searchQuery = $state('');
  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      goto(`/#products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Report error functionality
  const reportError = () => {
    const subject = `Error ${page.status} Report - Nexora Coffee`;
    const body = `Hi Nexora Team,\n\nI encountered an error on your website:\n\nStatus Code: ${page.status}\nError Message: ${page.error?.message || 'Not Found'}\nURL: ${window.location.href}\n\nPlease look into this. Thanks!`;
    window.location.href = `mailto:hello@nexora.coffee?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Go back functionality
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      goto('/');
    }
  };
</script>

<svelte:head>
  <title>{page.status} Error - Nexora Coffee</title>
</svelte:head>

<main class="error-page">
  <!-- Animated Background Particles -->
  <div class="bg-particles" aria-hidden="true">
    {#each Array(10) as _, i}
      <div class="particle" style="
        left: {Math.random() * 100}%;
        animation-delay: {Math.random() * 5}s;
        animation-duration: {10 + Math.random() * 10}s;
      ">
        <i class="fa-solid fa-seedling"></i>
      </div>
    {/each}
  </div>

  <!-- Decorative Background Elements -->
  <div class="bg-decoration" aria-hidden="true">
    <span class="bg-code">{page.status}</span>
    <Coffee class="floating-icon" size={120} />
  </div>

  <div class="container">
    <div class="error-content">
      
      <!-- Error Badge -->
      <div class="error-badge">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>Error {page.status}</span>
      </div>

      <!-- Spilled Coffee Illustration (Refined SVG) -->
      <div class="illustration">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Coffee Cup -->
          <ellipse cx="100" cy="140" rx="35" ry="10" fill="#3b2416" opacity="0.1"/>
          <path d="M 70 100 Q 70 140 100 140 Q 130 140 130 100 L 130 80 Q 130 70 100 70 Q 70 70 70 80 Z" fill="#6b4423"/>
          <ellipse cx="100" cy="80" rx="30" ry="8" fill="#3b2416"/>
          <!-- Handle -->
          <path d="M 130 90 Q 150 90 150 105 Q 150 120 130 120" fill="none" stroke="#6b4423" stroke-width="6" stroke-linecap="round"/>
          <!-- Spilled Coffee -->
          <ellipse cx="100" cy="145" rx="40" ry="8" fill="#d97706" opacity="0.6"/>
          <!-- Coffee Beans Scattered -->
          <ellipse cx="60" cy="150" rx="4" ry="6" fill="#3b2416" transform="rotate(30 60 150)"/>
          <ellipse cx="140" cy="155" rx="4" ry="6" fill="#3b2416" transform="rotate(-45 140 155)"/>
          <ellipse cx="80" cy="160" rx="4" ry="6" fill="#3b2416" transform="rotate(60 80 160)"/>
          <ellipse cx="120" cy="162" rx="4" ry="6" fill="#3b2416" transform="rotate(-20 120 162)"/>
          <!-- Steam -->
          <path class="steam-1" d="M 90 60 Q 85 50 90 40" fill="none" stroke="#a67c52" stroke-width="2.5" stroke-linecap="round"/>
          <path class="steam-2" d="M 100 55 Q 105 45 100 35" fill="none" stroke="#a67c52" stroke-width="2.5" stroke-linecap="round"/>
          <path class="steam-3" d="M 110 60 Q 115 50 110 40" fill="none" stroke="#a67c52" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>
      
      <h1>{message}</h1>
      
      {#if page.error?.message}
        <p class="technical-details">
          <i class="fa-solid fa-code"></i> Technical details: {page.error.message}
        </p>
      {/if}

      <!-- Search Bar -->
      <div class="search-container">
        <form class="search-form" onsubmit={handleSearch}>
          <Search class="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search for coffee, blends, or help..." 
            bind:value={searchQuery}
            aria-label="Search"
          />
          <button type="submit" class="search-btn">Search</button>
        </form>
      </div>

      <!-- Action Buttons -->
      <div class="error-actions">
        <button class="btn btn-secondary" onclick={goBack}>
          <History size={18} /> Go Back
        </button>
        <a href="/" class="btn btn-primary">
          <Home size={18} /> Return Home
        </a>
      </div>

      <!-- Popular Pages -->
      <div class="popular-pages">
        <h3>Popular Pages</h3>
        <div class="popular-grid">
          {#each popularPages as pg, i}
            <a href={pg.href} class="popular-link" style="animation-delay: {i * 0.1}s">
              <svelte:component this={pg.icon} size={20} />
              <span>{pg.label}</span>
              <ChevronRight size={16} class="link-arrow" />
            </a>
          {/each}
        </div>
      </div>

      <!-- Random Coffee Fact -->
      <div class="coffee-fact">
        <Lightbulb class="fact-icon" size={24} />
        <div class="fact-content">
          <strong>Did you know?</strong>
          <p>{randomFact}</p>
        </div>
      </div>

      <!-- Report Error Link -->
      <button class="report-error" onclick={reportError}>
        <Bug size={16} /> Report this error
      </button>

    </div>
  </div>
</main>

<style>
  .error-page {
    position: relative;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 50% 30%, var(--color-cream) 0%, var(--color-bg) 60%);
    padding: 6rem 1.5rem 4rem;
    overflow: hidden;
  }

  /* Animated Background Particles */
  .bg-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .particle {
    position: absolute;
    bottom: -20px;
    font-size: 1.2rem;
    color: var(--color-accent);
    opacity: 0.1;
    animation: floatUp linear infinite;
  }
  @keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.1; }
    90% { opacity: 0.1; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }

  /* Background Decoration */
  .bg-decoration {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 0;
  }
  .bg-code {
    font-family: var(--font-display);
    font-size: 25vw;
    font-weight: 800;
    color: var(--color-brown-dark);
    opacity: 0.03;
    line-height: 1;
    user-select: none;
  }
  .floating-icon {
    position: absolute;
    color: var(--color-accent);
    opacity: 0.06;
    animation: float 8s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  /* Glassmorphism Content Card */
  .error-content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 600px;
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    padding: 3.5rem 2.5rem;
    border-radius: calc(var(--radius) + 12px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 25px 80px rgba(59, 36, 22, 0.1);
  }

  .error-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(217, 119, 6, 0.1);
    color: var(--color-accent-dark);
    padding: 0.5rem 1.2rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  /* Spilled Coffee Illustration */
  .illustration {
    width: 160px;
    height: 160px;
    margin: 0 auto 2rem;
    animation: gentleBounce 4s ease-in-out infinite;
  }
  @keyframes gentleBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .illustration svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  /* Smoother Steam Animations */
  .steam-1, .steam-2, .steam-3 {
    animation: steam 3s ease-in-out infinite;
  }
  .steam-2 { animation-delay: 0.5s; }
  .steam-3 { animation-delay: 1s; }
  
  @keyframes steam {
    0% { transform: translateY(0) scaleX(1); opacity: 0; }
    20% { opacity: 0.6; }
    50% { transform: translateY(-20px) scaleX(1.2); opacity: 0.4; }
    100% { transform: translateY(-40px) scaleX(0.8); opacity: 0; }
  }

  .error-content h1 {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 2.4rem);
    color: var(--color-brown-dark);
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .technical-details {
    background: rgba(220, 38, 38, 0.05);
    border-left: 3px solid #dc2626;
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #991b1b;
    margin-bottom: 2rem;
    text-align: left;
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
  }
  .technical-details i {
    margin-top: 2px;
    color: #dc2626;
  }

  /* Search Bar */
  .search-container {
    margin-bottom: 2rem;
  }
  .search-form {
    display: flex;
    align-items: center;
    background: var(--color-white);
    border: 2px solid rgba(59, 36, 22, 0.1);
    border-radius: 50px;
    padding: 0.4rem;
    transition: var(--transition);
  }
  .search-form:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.15);
  }
  .search-icon {
    margin-left: 0.8rem;
    color: var(--color-muted);
    flex-shrink: 0;
  }
  .search-form input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    font-family: inherit;
    background: transparent;
    color: var(--color-text);
    min-width: 0;
  }
  .search-form input::placeholder {
    color: var(--color-muted);
    opacity: 0.7;
  }
  .search-btn {
    background: var(--color-accent);
    color: var(--color-white);
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: var(--transition);
    white-space: nowrap;
  }
  .search-btn:hover {
    background: var(--color-accent-dark);
  }

  /* Action Buttons */
  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem 1.8rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    font-size: 1rem;
    transition: var(--transition);
    border: none;
    cursor: pointer;
  }

  .btn-primary {
    background: var(--color-accent);
    color: var(--color-white);
    box-shadow: 0 4px 15px rgba(217, 119, 6, 0.3);
  }
  .btn-primary:hover {
    background: var(--color-accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(217, 119, 6, 0.4);
  }

  .btn-secondary {
    background: var(--color-white);
    color: var(--color-brown-dark);
    border: 2px solid rgba(59, 36, 22, 0.15);
  }
  .btn-secondary:hover {
    border-color: var(--color-brown-dark);
    background: rgba(59, 36, 22, 0.05);
    transform: translateY(-2px);
  }

  /* Popular Pages */
  .popular-pages {
    margin-bottom: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(59, 36, 22, 0.08);
  }
  .popular-pages h3 {
    font-size: 0.85rem;
    color: var(--color-muted);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 1.2rem;
  }
  .popular-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  .popular-link {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(59, 36, 22, 0.08);
    border-radius: var(--radius);
    text-decoration: none;
    color: var(--color-brown-dark);
    font-size: 0.95rem;
    font-weight: 600;
    transition: var(--transition);
    opacity: 0;
    animation: fadeInUp 0.5s ease forwards;
  }
  .popular-link :global(svg) {
    color: var(--color-accent);
    flex-shrink: 0;
  }
  .popular-link .link-arrow {
    margin-left: auto;
    opacity: 0;
    transform: translateX(-5px);
    transition: var(--transition);
    color: var(--color-muted);
  }
  .popular-link:hover {
    background: var(--color-white);
    border-color: rgba(217, 119, 6, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(59, 36, 22, 0.08);
  }
  .popular-link:hover .link-arrow {
    opacity: 1;
    transform: translateX(0);
    color: var(--color-accent);
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Coffee Fact */
  .coffee-fact {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(245, 235, 224, 0.6));
    padding: 1.2rem;
    border-radius: var(--radius);
    margin-bottom: 1.5rem;
    text-align: left;
    border: 1px solid rgba(217, 119, 6, 0.15);
  }
  .fact-icon {
    color: var(--color-accent);
    flex-shrink: 0;
    margin-top: 2px;
  }
  .fact-content {
    flex: 1;
  }
  .fact-content strong {
    display: block;
    color: var(--color-brown-dark);
    font-size: 0.95rem;
    margin-bottom: 0.3rem;
  }
  .fact-content p {
    color: var(--color-muted);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }

  /* Report Error */
  .report-error {
    background: none;
    border: none;
    color: var(--color-muted);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: var(--transition);
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 4px;
  }
  .report-error:hover {
    color: var(--color-accent);
    background: rgba(217, 119, 6, 0.05);
  }

  /* 📱 Mobile Responsiveness */
  @media (max-width: 600px) {
    .error-page {
      padding: 5rem 1rem 3rem;
    }
    .error-content {
      padding: 2.5rem 1.5rem;
    }
    .error-actions {
      flex-direction: column;
    }
    .btn {
      width: 100%;
      justify-content: center;
    }
    .popular-grid {
      grid-template-columns: 1fr;
    }
    .bg-code {
      font-size: 40vw;
    }
    .floating-icon {
      width: 80px;
      height: 80px;
    }
    .illustration {
      width: 120px;
      height: 120px;
    }
    .search-form {
      flex-direction: column;
      border-radius: var(--radius);
      padding: 0.8rem;
      gap: 0.8rem;
    }
    .search-icon {
      display: none;
    }
    .search-form input {
      width: 100%;
      padding: 0.8rem;
      text-align: center;
    }
    .search-btn {
      width: 100%;
    }
  }
</style>