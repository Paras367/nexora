<script lang="ts">
  import { testimonials } from '../data';
  import { reveal } from '../actions';
  import { starIcons } from '../utils';
</script>

<section id="testimonials" class="section testimonials" aria-labelledby="reviews-title">
  <div class="container">

    <div class="section-header reveal" use:reveal>
      <span class="eyebrow"><i class="fa-solid fa-comments" aria-hidden="true"></i> Testimonials</span>
      <h2 id="reviews-title" class="section-title">Loved by Coffee Lovers Worldwide</h2>
      <p class="section-subtitle">Real stories from our devoted customers and the farming partners we work with.</p>
    </div>

    <div class="grid stagger" use:reveal={0.05}>
      {#each testimonials as t, i (t.id)}
        <!-- figure > blockquote + figcaption: footer ko blockquote ke andar rakhna semantically galat tha -->
        <figure class="card" style="--i: {i}">
          <i class="fa-solid fa-quote-right bg-quote" aria-hidden="true"></i>

          <div class="stars" role="img" aria-label="Rated {t.rating} out of 5">
            {#each starIcons(t.rating) as s}<i class={s} aria-hidden="true"></i>{/each}
          </div>

          <blockquote><p>“{t.text}”</p></blockquote>

          <figcaption>
            <div class="avatar">
              <img src={t.image} alt="" width="56" height="56" loading="lazy" decoding="async" />
              {#if t.verified}
                <span class="verified" role="img" aria-label="Verified partner or customer" title="Verified">
                  <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                </span>
              {/if}
            </div>
            <div class="author">
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          </figcaption>
        </figure>
      {/each}
    </div>

  </div>
</section>

<style>
  .testimonials { position: relative; overflow: hidden; background: var(--color-bg); }
  .testimonials::before {
    content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
    background-image: radial-gradient(var(--color-brown-light) 1px, transparent 1px); background-size: 32px 32px;
  }
  .container { position: relative; }

  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr)); gap: 2rem; }

  .card {
    position: relative; display: flex; flex-direction: column; margin: 0; padding: 2.5rem 2rem 2rem;
    background: var(--color-white); border: 1px solid rgba(59, 36, 22, 0.05); border-radius: var(--radius);
    box-shadow: var(--shadow-sm); transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease), border-color 0.4s;
  }
  .card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(59, 36, 22, 0.1); border-color: rgba(217, 119, 6, 0.3); }

  .bg-quote { position: absolute; top: 1.5rem; right: 1.5rem; font-size: 4rem; color: var(--color-accent); opacity: 0.07; transition: var(--transition); pointer-events: none; }
  .card:hover .bg-quote { opacity: 0.13; transform: scale(1.1) rotate(-5deg); }

  .stars { display: flex; gap: 0.25rem; margin-bottom: 1.2rem; color: var(--color-accent); }

  blockquote { flex: 1; margin: 0 0 2rem; }
  blockquote p { margin: 0; color: var(--color-text); font-size: 1.05rem; font-style: italic; line-height: 1.7; }

  figcaption { display: flex; align-items: center; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--color-cream); }
  .avatar { position: relative; flex-shrink: 0; }
  .avatar img { width: 56px; height: 56px; object-fit: cover; border: 2px solid var(--color-cream); border-radius: 50%; transition: var(--transition); }
  .card:hover .avatar img { border-color: var(--color-accent); transform: scale(1.05); }

  .verified {
    position: absolute; right: -2px; bottom: -2px; display: grid; place-items: center;
    color: #059669; background: var(--color-white); border-radius: 50%; font-size: 1.1rem;
  }

  .author { display: flex; flex-direction: column; }
  .author strong { margin-bottom: 0.2rem; color: var(--color-brown-dark); font-size: 1.05rem; }
  .author span { color: var(--color-muted); font-size: 0.85rem; font-weight: 500; }

  @media (max-width: 768px) {
    .grid { gap: 1.5rem; }
    .card { padding: 2rem 1.5rem; }
    .bg-quote { top: 1rem; right: 1rem; font-size: 3rem; }
  }
  @media (max-width: 480px) {
    blockquote p { font-size: 1rem; }
    .avatar img { width: 48px; height: 48px; }
  }
</style>
