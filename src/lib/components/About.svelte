<script lang="ts">
  import { reveal } from '../actions';

  const values = [
    { icon: 'fa-solid fa-leaf', title: 'Sustainable', desc: 'Carbon-neutral shipping & regenerative farming practices.' },
    { icon: 'fa-solid fa-handshake', title: 'Fair Trade', desc: 'Direct partnerships with transparent, above-market pricing.' },
    { icon: 'fa-solid fa-heart', title: 'Community', desc: '5% of all profits directly fund local education and water projects.' }
  ];
</script>

<section id="about" class="section about" aria-labelledby="about-title">
  <div class="container about-grid">

    <div class="image-wrap reveal reveal-left" use:reveal>
      <div class="image">
        <img
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
          alt="Coffee farmers harvesting beans" width="800" height="550" loading="lazy" decoding="async"
        />
        <!-- Rename: global .badge se takra raha tha (uppercase + inline-flex dono apply ho jaate the) -->
        <div class="est-badge"><i class="fa-solid fa-award" aria-hidden="true"></i><span>Est. 2018</span></div>
      </div>
      <div class="frame" aria-hidden="true"></div>
    </div>

    <div class="text reveal reveal-right" use:reveal>
      <span class="eyebrow"><i class="fa-solid fa-mug-saucer" aria-hidden="true"></i> Our Story</span>
      <h2 id="about-title">More Than Coffee — A <span class="highlight">Movement</span> for Change</h2>

      <p>
        Nexora was born from a simple belief: great coffee shouldn't come at the cost of someone
        else's livelihood. We partner directly with smallholder farmers across Africa, Latin America,
        and Asia, paying fair wages and investing in their communities.
      </p>
      <p>
        Every bag you buy funds education, clean water, and sustainable farming practices.
        This isn't charity — it's a <strong>partnership</strong>.
      </p>

      <ul class="values stagger" use:reveal>
        {#each values as v, i (v.title)}
          <li class="value-card" style="--i: {i}">
            <div class="value-icon"><i class={v.icon} aria-hidden="true"></i></div>
            <div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          </li>
        {/each}
      </ul>
    </div>

  </div>
</section>

<style>
  .about { background: var(--color-cream); overflow: hidden; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }

  .image-wrap { position: relative; }
  .image { position: relative; z-index: 2; overflow: hidden; border-radius: var(--radius); box-shadow: var(--shadow-lg); }
  .image img { width: 100%; height: 550px; object-fit: cover; transition: transform 0.6s var(--ease); }
  .image:hover img { transform: scale(1.03); }

  .frame {
    position: absolute; z-index: 1; top: -20px; left: -20px; width: 100%; height: 100%;
    border: 3px solid var(--color-accent); border-radius: var(--radius); opacity: 0.3;
    transition: transform 0.6s ease;
  }
  .image-wrap:hover .frame { transform: translate(-10px, -10px); }

  .est-badge {
    position: absolute; z-index: 3; right: 2rem; bottom: 2rem;
    display: flex; align-items: center; gap: 0.6rem; padding: 0.8rem 1.5rem;
    background: var(--color-white); color: var(--color-brown-dark); border-radius: 50px;
    box-shadow: var(--shadow-md); font-family: var(--font-display); font-weight: 700;
  }
  .est-badge i { color: var(--color-accent-dark); font-size: 1.2rem; }

  h2 { margin-bottom: 1.5rem; font-size: clamp(2rem, 4vw, 2.8rem); line-height: 1.2; }
  .highlight { color: var(--color-accent-dark); font-style: italic; }
  .text > p { margin-bottom: 1.2rem; font-size: 1.1rem; line-height: 1.7; }
  .text > p strong { color: var(--color-brown-dark); }

  .values { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2.5rem 0 0; padding: 0; list-style: none; }
  .value-card {
    padding: 1.5rem; background: var(--color-white); border: 1px solid rgba(59, 36, 22, 0.06);
    border-radius: var(--radius); transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), border-color 0.3s;
  }
  .value-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); border-color: var(--color-accent); }

  .value-icon {
    display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 1rem;
    background: rgba(217, 119, 6, 0.1); border-radius: 12px; transition: var(--transition);
  }
  .value-icon i { font-size: 1.3rem; color: var(--color-accent-dark); transition: var(--transition); }
  .value-card:hover .value-icon { background: var(--color-accent-dark); }
  .value-card:hover .value-icon i { color: var(--color-white); }

  .value-card h3 { margin-bottom: 0.4rem; font-family: var(--font-body); font-size: 1.05rem; letter-spacing: 0; }
  .value-card p { margin: 0; font-size: 0.9rem; line-height: 1.5; }

  @media (max-width: 900px) {
    .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    .image img { height: 400px; }
    .frame { display: none; }
    .values { grid-template-columns: 1fr; gap: 1rem; }
    .value-card { display: flex; align-items: flex-start; gap: 1rem; padding: 1.2rem; }
    .value-icon { margin: 0; flex-shrink: 0; }
  }
  @media (max-width: 480px) {
    .image img { height: 300px; }
    .est-badge { right: 1rem; bottom: 1rem; padding: 0.6rem 1rem; font-size: 0.9rem; }
  }
</style>
