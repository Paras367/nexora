<script lang="ts">
  import { stats, initiatives } from '../data';
  import { reveal, countUp } from '../actions';
  import { formatNumber } from '../utils';
</script>

<section id="impact" class="section impact" aria-labelledby="impact-title">
  <div class="container">

    <div class="section-header reveal" use:reveal>
      <span class="eyebrow"><i class="fa-solid fa-heart-pulse" aria-hidden="true"></i> Our Social Impact</span>
      <h2 id="impact-title" class="section-title">Brewing a Better Future</h2>
      <p class="section-subtitle">Every sip of Nexora funds real change. Here's what your support has made possible around the globe.</p>
    </div>

    <ul class="stats stagger" use:reveal>
      {#each stats as s, i (s.label)}
        <li class="stat-card" style="--i: {i}">
          <span class="shine" aria-hidden="true"></span>
          <div class="stat-icon"><i class={s.icon} aria-hidden="true"></i></div>
          <!-- SSR mein final number render hota hai; browser mein countUp 0 se chadhata hai -->
          <span class="stat-value">
            <span use:countUp={{ to: s.value, decimals: s.decimals, prefix: s.prefix }}>{(s.prefix ?? '') + formatNumber(s.value, s.decimals)}</span><span class="suffix">{s.suffix ?? ''}</span>
          </span>
          <span class="stat-label">{s.label}</span>
        </li>
      {/each}
    </ul>

    <div class="initiatives stagger" use:reveal={0.05}>
      {#each initiatives as init, i (init.id)}
        <article class="initiative" style="--i: {i}; --c: {init.color}">
          <div class="init-icon"><i class={init.icon} aria-hidden="true"></i></div>
          <h3>{init.title}</h3>
          <p>{init.desc}</p>
          {#if init.impact}
            <div class="metric"><i class="fa-solid fa-chart-line" aria-hidden="true"></i><span>{init.impact}</span></div>
          {/if}
          <!-- href="#" page ko top par fenk deta tha; ab sahi section par -->
          <a href="#newsletter" class="learn-more">Get involved <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
        </article>
      {/each}
    </div>

    <div class="cta-banner reveal" use:reveal>
      <div class="glow" aria-hidden="true"></div>
      <div class="cta-content">
        <i class="fa-solid fa-mug-hot cta-icon" aria-hidden="true"></i>
        <h3>Join the Movement</h3>
        <!-- NOTE: About mein "5% of all profits" likha hai, yahan "1% of every sale" — dono alag claims hain, ek final karo -->
        <p>1% of every sale goes directly to our foundation. Together, we're changing lives — one cup at a time.</p>
        <a href="#newsletter" class="btn btn-primary btn-lg"><i class="fa-solid fa-hand-holding-heart" aria-hidden="true"></i> Become a Supporter</a>
      </div>
    </div>

  </div>
</section>

<style>
  .impact { background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-cream) 100%); }

  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin: 0 0 4rem; padding: 0; list-style: none; }
  .stat-card {
    position: relative; overflow: hidden; padding: 2.5rem 1.5rem; text-align: center;
    background: var(--color-white); border: 1px solid rgba(59, 36, 22, 0.05); border-radius: var(--radius);
    box-shadow: var(--shadow-sm); transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease), border-color 0.4s;
  }
  .stat-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); border-color: var(--color-accent); }

  .shine {
    position: absolute; top: 0; left: -100%; width: 50%; height: 100%; pointer-events: none;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.35), transparent);
    transform: skewX(-25deg); transition: left 0.7s ease;
  }
  .stat-card:hover .shine { left: 150%; }

  .stat-icon {
    display: grid; place-items: center; width: 64px; height: 64px; margin: 0 auto 1.2rem;
    background: rgba(217, 119, 6, 0.1); border-radius: 50%; transition: var(--transition);
  }
  .stat-icon i { font-size: 1.8rem; color: var(--color-accent-dark); transition: var(--transition); }
  .stat-card:hover .stat-icon { background: var(--color-accent-dark); transform: scale(1.1); }
  .stat-card:hover .stat-icon i { color: #fff; }

  .stat-value { display: block; margin-bottom: 0.4rem; font-family: var(--font-display); font-size: 2.4rem; font-weight: 800; line-height: 1; color: var(--color-brown-dark); font-variant-numeric: tabular-nums; }
  .suffix { font-size: 1.5rem; font-weight: 700; color: var(--color-accent-dark); }
  .stat-label { font-size: 0.95rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--color-muted); }

  .initiatives { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 4rem; }
  .initiative {
    position: relative; overflow: hidden; display: flex; flex-direction: column; padding: 2.5rem 2rem;
    background: var(--color-white); border: 1px solid rgba(59, 36, 22, 0.05); border-radius: var(--radius);
    box-shadow: var(--shadow-sm); transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
  }
  /* Side bar ab har card ke apne color mein (pehle sab accent orange the) */
  .initiative::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 4px; background: var(--c); transition: width 0.3s; }
  .initiative:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
  .initiative:hover::before { width: 6px; }

  .init-icon {
    display: grid; place-items: center; width: 56px; height: 56px; margin-bottom: 1.5rem;
    border-radius: 12px; font-size: 1.5rem; color: var(--c);
    background: color-mix(in srgb, var(--c) 10%, white); transition: var(--transition);
  }
  .initiative:hover .init-icon { transform: scale(1.1) rotate(-5deg); }
  .initiative h3 { margin-bottom: 0.8rem; font-size: 1.4rem; }
  .initiative p { flex: 1; margin-bottom: 1.5rem; line-height: 1.6; }

  .metric {
    display: inline-flex; align-items: center; gap: 0.5rem; width: fit-content; margin-bottom: 1.5rem;
    padding: 0.5rem 1rem; border-radius: 50px; background: rgba(16, 185, 129, 0.1); color: #047857;
    font-size: 0.85rem; font-weight: 600;
  }
  .learn-more { display: inline-flex; align-items: center; gap: 0.5rem; width: fit-content; color: var(--color-accent-dark); font-weight: 600; font-size: 0.95rem; }
  .learn-more i { transition: transform 0.3s; }
  .learn-more:hover { gap: 0.8rem; }
  .learn-more:hover i { transform: translateX(4px); }

  .cta-banner {
    position: relative; overflow: hidden; padding: 4rem 2rem; text-align: center; color: #fff;
    background: linear-gradient(135deg, var(--color-brown-dark), var(--color-brown)); border-radius: var(--radius); box-shadow: var(--shadow-lg);
  }
  .glow { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; pointer-events: none; background: radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, transparent 60%); }
  .cta-content { position: relative; z-index: 2; max-width: 650px; margin: 0 auto; }
  .cta-icon { display: block; margin-bottom: 1.5rem; font-size: 3rem; color: var(--color-accent-light); }
  .cta-banner h3 { margin-bottom: 1rem; color: #fff; font-size: clamp(1.8rem, 4vw, 2.5rem); }
  .cta-banner p { max-width: 600px; margin: 0 auto 2rem; color: var(--color-bg); font-size: 1.15rem; font-weight: 500; line-height: 1.7; }

  @media (max-width: 768px) {
    .stats { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .stat-card { padding: 1.5rem 1rem; }
    .stat-value { font-size: 1.8rem; }
    .suffix { font-size: 1.1rem; }
    .stat-label { font-size: 0.8rem; }
    .initiatives { grid-template-columns: 1fr; gap: 1.5rem; }
    .cta-banner { padding: 3rem 1.5rem; }
    .cta-banner .btn { width: 100%; }
  }
  @media (max-width: 480px) { .stats { grid-template-columns: 1fr; } }
</style>
