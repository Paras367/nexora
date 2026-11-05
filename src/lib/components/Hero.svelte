<script lang="ts">
  const heroStats = [
    { icon: 'fa-solid fa-users', value: '12K+', label: 'Farmers Supported' },
    { icon: 'fa-solid fa-location-dot', value: '50+', label: 'Communities' },
    { icon: 'fa-solid fa-leaf', value: '100%', label: 'Organic Beans' }
  ];
</script>

<section class="hero" aria-labelledby="hero-title">
  <!-- CSS background ki jagah <img>: browser ise turant fetch karta hai (LCP better) aur alt/priority control milta hai -->
  <img
    class="hero-bg" alt="" width="1600" height="1067"
    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80"
    fetchpriority="high" decoding="async"
  />
  <div class="hero-overlay"></div>

  <div class="container hero-content">
    <span class="tagline rise" style="--d: 0.2s">
      <i class="fa-solid fa-seedling" aria-hidden="true"></i> Ethically Sourced • Sustainably Brewed
    </span>

    <h1 id="hero-title" class="rise" style="--d: 0.4s">
      Every Cup Tells a Story of <span class="accent">Hope</span>
    </h1>

    <p class="lead rise" style="--d: 0.6s">
      From the misty highlands of Ethiopia to the hills of the Western Ghats — Nexora Coffee
      empowers farmers, protects the planet, and delivers extraordinary flavor to your morning ritual.
    </p>

    <div class="hero-actions rise" style="--d: 0.8s">
      <a href="#products" class="btn btn-primary btn-lg">
        <i class="fa-solid fa-mug-hot" aria-hidden="true"></i> Explore Our Coffee
      </a>
      <a href="#impact" class="btn btn-outline btn-lg">
        See Our Impact <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>

    <dl class="hero-stats rise" style="--d: 1s">
      {#each heroStats as s (s.label)}
        <div class="stat-item">
          <i class="{s.icon} stat-icon" aria-hidden="true"></i>
          <dt class="stat-value">{s.value}</dt>
          <dd class="stat-label">{s.label}</dd>
        </div>
      {/each}
    </dl>
  </div>

  <!-- Bug fix: pehle bounce aur fade-in ek hi element par the, dono animation takra rahe the.
       Ab bahar wala fade-in karta hai, andar wala bounce -->
  <a href="#about" class="scroll-cue rise" style="--d: 1.2s" aria-label="Scroll to our story">
    <span class="cue-inner"><span>Scroll</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></span>
  </a>
</section>

<style>
  .hero {
    position: relative; isolation: isolate; overflow: hidden;
    min-height: 100dvh; padding-top: var(--nav-h);
    display: flex; align-items: center; justify-content: center; color: var(--color-white);
  }

  .hero-bg {
    position: absolute; inset: 0; z-index: -2; width: 100%; height: 100%; object-fit: cover;
    animation: kenBurns 25s ease-in-out infinite alternate;
  }
  @keyframes kenBurns { to { transform: scale(1.1); } }

  .hero-overlay {
    position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(135deg, rgba(45, 27, 14, 0.92) 0%, rgba(59, 36, 22, 0.85) 50%, rgba(107, 68, 35, 0.75) 100%);
  }

  .hero-content { max-width: 850px; padding: 2rem 1.5rem 5rem; text-align: center; }

  .tagline {
    display: inline-flex; align-items: center; gap: 0.6rem; margin-bottom: 1.5rem; padding: 0.6rem 1.4rem;
    background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 50px;
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    font-size: 0.85rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase;
  }
  .tagline i { color: var(--color-accent-light); }

  h1 {
    margin-bottom: 1.5rem; color: var(--color-white);
    font-size: clamp(2.6rem, 7vw, 5rem); font-weight: 800; line-height: 1.1; letter-spacing: -1px;
  }
  .accent { color: var(--color-accent-light); font-style: italic; }

  /* Pehle `.hero p` do baar define tha, dusra pehle ko cancel kar deta tha. Ab ek hi, `.lead` class par */
  .lead {
    max-width: 650px; margin: 0 auto 2.5rem; color: var(--color-white);
    font-size: clamp(1.05rem, 2vw, 1.25rem); font-weight: 500; line-height: 1.7;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .hero-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-bottom: 4rem; }
  .hero-actions .btn-outline i { transition: transform 0.3s ease; }
  .hero-actions .btn-outline:hover i { transform: translateX(4px); }

  .hero-stats {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;
    margin: 0; padding-top: 2.5rem; border-top: 1px solid rgba(255, 255, 255, 0.15);
  }
  .stat-item { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; min-width: 140px; }
  .stat-icon { font-size: 1.5rem; color: var(--color-accent-light); }
  .stat-value { font-family: var(--font-display); font-size: 2.2rem; font-weight: 700; line-height: 1; }
  .stat-label { margin: 0; font-size: 0.85rem; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; opacity: 0.85; }

  .scroll-cue {
    position: absolute; bottom: 2rem; inset-inline: 0; width: fit-content; margin-inline: auto;
    color: var(--color-white); font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; opacity: 0.8;
  }
  .scroll-cue:hover { opacity: 1; }
  .cue-inner { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; animation: bounce 2s infinite; }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }

  @media (max-width: 768px) {
    .hero-content { padding: 1rem 1.5rem 6rem; }
    .hero-actions { flex-direction: column; max-width: 320px; margin: 0 auto 3rem; }
    .hero-actions .btn { width: 100%; }
    .hero-stats { gap: 1.5rem; padding-top: 2rem; }
    .stat-item { min-width: 100px; }
    .stat-value { font-size: 1.8rem; }
    .scroll-cue { bottom: 1.5rem; }
  }
  @media (max-width: 400px) {
    .hero-stats { gap: 1rem; }
    .stat-item { min-width: 80px; }
    .stat-label { font-size: 0.75rem; }
  }
</style>
