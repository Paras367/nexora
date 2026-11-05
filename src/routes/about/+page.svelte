<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    Coffee, Globe, Users, Award, Leaf, 
    Target, Sparkles, Calendar, ArrowRight, Star, 
    HandHeart, ShoppingCart, CheckCircle, ArrowUpRight
  } from 'lucide-svelte';

  // ✅ BULLETPROOF SCROLL REVEAL ACTION
  // This guarantees elements will always become visible, no global state glitches.
  function reveal(node: HTMLElement, delay: number = 0) {
    node.style.opacity = '0';
    node.style.transform = 'translateY(30px)';
    node.style.transition = `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    observer.observe(node);
    
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  const values = [
    { 
      icon: 'fa-solid fa-hand-holding-heart', 
      title: 'Ethical Sourcing', 
      desc: 'We pay 40% above market price to ensure every farmer thrives, not just survives.',
      color: '#d97706'
    },
    { 
      icon: 'fa-solid fa-seedling', 
      title: 'Sustainable Farming', 
      desc: '85,000+ trees planted. Shade-grown coffee that protects biodiversity and soil health.',
      color: '#059669'
    },
    { 
      icon: 'fa-solid fa-award', 
      title: 'Quality First', 
      desc: 'Small-batch roasted within 24 hours of shipping. Peak freshness, guaranteed.',
      color: '#7c3aed'
    },
    { 
      icon: 'fa-solid fa-globe', 
      title: 'Carbon Neutral', 
      desc: '100% carbon neutral operations. From farm to cup, we offset every emission.',
      color: '#0284c7'
    }
  ];

  const milestones = [
    { year: '2019', title: 'The First Bean', desc: 'Founded in a small Seattle garage with a single roaster and a big dream.', icon: 'fa-solid fa-seedling' },
    { year: '2020', title: 'First Farm Partnership', desc: 'Partnered with 12 family farms in Ethiopia, changing 200+ lives.', icon: 'fa-solid fa-handshake' },
    { year: '2021', title: 'Going Carbon Neutral', desc: 'Achieved 100% carbon neutral certification across our entire supply chain.', icon: 'fa-solid fa-leaf' },
    { year: '2023', title: '10,000 Farmers Strong', desc: 'Expanded to 4 continents, supporting over 10,000 farming families.', icon: 'fa-solid fa-globe-americas' },
    { year: '2026', title: 'The Nexora You Know', desc: 'Serving 50,000+ coffee lovers worldwide with purpose-driven brews.', icon: 'fa-solid fa-mug-hot' }
  ];

  const stats = [
    { icon: Users, value: '12,400', label: 'Farmers Supported', suffix: '+' },
    { icon: Leaf, value: '85,000', label: 'Trees Planted', suffix: '' },
    { icon: Globe, value: '4', label: 'Continents Sourced', suffix: '' },
    { icon: Award, value: '100', label: 'Carbon Neutral', suffix: '%' }
  ];

  const team = [
    { name: 'Paras Dhiman', role: 'Founder & Head Roaster', bio: 'Coffee enthusiast turned social entrepreneur', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
    { name: 'Kartik Arora', role: 'Co-Founder & Operations', bio: 'Supply chain expert with a passion for impact', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
    { name: 'Rinki Chauhan', role: 'Head of Sustainability', bio: 'Environmental scientist & coffee advocate', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' }
  ];

  const partners = [
    'fa-brands fa-cc-visa', 'fa-brands fa-cc-mastercard', 'fa-brands fa-cc-amex',
    'fa-brands fa-cc-paypal', 'fa-brands fa-apple-pay', 'fa-solid fa-leaf', 'fa-solid fa-certificate'
  ];
</script>

<svelte:head>
  <title>About Us | Nexora Coffee — Our Story & Mission</title>
  <meta name="description" content="Discover the story behind Nexora Coffee. Ethically sourced, sustainably brewed, and crafted with purpose since 2019." />
</svelte:head>

<main class="about-page">
  
  <!-- ===== HERO SECTION ===== -->
  <section class="hero">
    <div class="hero-bg">
      <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80" alt="Coffee farm" />
      <div class="hero-overlay"></div>
    </div>
    <div class="container hero-content" in:fade={{ duration: 800 }}>
      <div class="hero-badge">
        <Coffee size={18} />
        <span>Est. 2019 · Seattle, WA</span>
      </div>
      <h1 class="hero-title">
        Brewing a Better World,<br />
        <span class="accent">One Cup at a Time</span>
      </h1>
      <p class="hero-subtitle">
        We believe great coffee should do more than wake you up — it should wake up the world. 
        From the misty highlands of Ethiopia to your morning ritual, every cup tells a story of hope, 
        partnership, and extraordinary flavor.
      </p>
      <div class="hero-cta">
        <a href="/#products" class="btn btn-primary">
          <ShoppingCart size={18} /> Explore Our Coffee
        </a>
        <a href="#mission" class="btn btn-outline">
          Our Mission <ArrowRight size={18} />
        </a>
      </div>
    </div>
    
    <div class="scroll-indicator">
      <div class="mouse"><div class="wheel"></div></div>
      <span>Scroll to explore</span>
    </div>
  </section>

  <!-- ===== STORY SECTION ===== -->
  <section class="story section-padding">
    <div class="container">
      <div class="story-grid" use:reveal>
        <div class="story-image">
          <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80" alt="Coffee beans" />
          <div class="story-image-badge">
            <Star size={24} class="badge-star" fill="currentColor" />
            <span>Rated 4.9/5 by 10,000+ customers</span>
          </div>
        </div>
        <div class="story-text">
          <span class="eyebrow">
            <Sparkles size={16} />
            Our Story
          </span>
          <h2>From Garage to Global Movement</h2>
          <p>
            In 2019, we started Nexora with a simple question: <em>What if your morning coffee could change someone's life?</em>
          </p>
          <p>
            What began as a single roaster in a Seattle garage has grown into a global movement of coffee lovers, 
            farmers, and dreamers. We travel to the world's most remote coffee-growing regions, build lasting 
            partnerships with family farms, and bring you beans that are as extraordinary in taste as they are in impact.
          </p>
          <p>
            Every bag you buy doesn't just fuel your day — it funds clean water wells, educates children, 
            and empowers women in coffee-growing communities. That's the Nexora promise.
          </p>
          <div class="story-signature">
            <span class="signature-name">— Paras Dhiman</span>
            <span class="signature-title">Founder, Nexora Coffee</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== STATS BAR ===== -->
  <section class="stats-bar section-padding">
    <div class="container">
      <div class="stats-grid">
        {#each stats as stat, i}
          <div class="stat-card" use:reveal={i * 0.1}>
            <div class="stat-icon-wrapper">
              <stat.icon size={32} class="stat-icon" />
            </div>
            <div class="stat-content">
              <span class="stat-value">{stat.value}<span class="stat-suffix">{stat.suffix}</span></span>
              <span class="stat-label">{stat.label}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ===== MISSION / VALUES SECTION ===== -->
  <section id="mission" class="values section-padding">
    <div class="container">
      <div class="section-header" use:reveal>
        <span class="eyebrow">
          <Target size={16} />
          What Drives Us
        </span>
        <h2>Our Core Values</h2>
        <p class="section-subtitle">
          Four pillars that guide every decision we make, from sourcing to shipping.
        </p>
      </div>

      <div class="values-grid">
        {#each values as value, i}
          <div class="value-card" use:reveal={i * 0.1}>
            <div class="value-icon" style="background: {value.color}15; color: {value.color}">
              <i class={value.icon} aria-hidden="true"></i>
            </div>
            <h3>{value.title}</h3>
            <p>{value.desc}</p>
            <div class="value-hover-line" style="background: {value.color}"></div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ===== IMPACT SECTION ===== -->
  <section class="impact section-padding">
    <div class="container">
      <div class="impact-grid">
        <div class="impact-content" use:reveal>
          <span class="eyebrow">
            <HandHeart size={16} />
            Our Impact
          </span>
          <h2>More Than Just Coffee</h2>
          <p class="impact-text">
            When you choose Nexora, you're joining a movement that puts people and planet first. 
            Our direct trade model ensures farmers receive fair wages, while our sustainability 
            initiatives protect the environment for future generations.
          </p>
          <ul class="impact-list">
            <li><CheckCircle size={20} class="check-icon" /> Clean water access for 15,000+ people</li>
            <li><CheckCircle size={20} class="check-icon" /> 500+ children educated through scholarships</li>
            <li><CheckCircle size={20} class="check-icon" /> 3,200+ women empowered through training</li>
            <li><CheckCircle size={20} class="check-icon" /> Carbon neutral from farm to cup</li>
          </ul>
          <a href="/#impact" class="btn btn-primary">
            See Our Full Impact Report <ArrowUpRight size={18} />
          </a>
        </div>
        <div class="impact-image" use:reveal>
          <img src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800&q=80" alt="Coffee farmer" />
          <div class="impact-badge">
            <span class="impact-badge-number">15K+</span>
            <span class="impact-badge-text">Lives Changed</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== TIMELINE SECTION ===== -->
  <section class="timeline section-padding">
    <div class="container">
      <div class="section-header" use:reveal>
        <span class="eyebrow">
          <Calendar size={16} />
          Our Journey
        </span>
        <h2>Milestones That Matter</h2>
        <p class="section-subtitle">
          Every year brings new partnerships, new impact, and new reasons to celebrate.
        </p>
      </div>

      <div class="timeline-wrapper">
        <div class="timeline-line"></div>
        {#each milestones as mile, i}
          <div class="timeline-item" use:reveal={i * 0.15}>
            <div class="timeline-dot">
              <i class={mile.icon}></i>
            </div>
            <div class="timeline-content">
              <span class="timeline-year">{mile.year}</span>
              <h3>{mile.title}</h3>
              <p>{mile.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ===== TEAM SECTION ===== -->
  <section class="team section-padding">
    <div class="container">
      <div class="section-header" use:reveal>
        <span class="eyebrow">
          <Users size={16} />
          The Humans Behind the Beans
        </span>
        <h2>Meet Our Team</h2>
        <p class="section-subtitle">
          Passionate coffee nerds on a mission to make the world better, one brew at a time.
        </p>
      </div>

      <div class="team-grid">
        {#each team as member, i}
          <div class="team-card" use:reveal={i * 0.1}>
            <div class="team-image">
              <img src={member.img} alt={member.name} />
              <div class="team-overlay">
                <div class="team-bio">
                  <p>{member.bio}</p>
                </div>
              </div>
            </div>
            <div class="team-info">
              <h3>{member.name}</h3>
              <p class="team-role">{member.role}</p>
              <div class="team-social">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i class="fa-brands fa-x-twitter"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ===== PARTNERS SECTION ===== -->
  <section class="partners section-padding">
    <div class="container">
      <div class="section-header" use:reveal>
        <span class="eyebrow">
          <HandHeart size={16} />
          Trusted By
        </span>
        <h2>Our Partners & Certifications</h2>
      </div>
      <div class="partners-grid" use:reveal>
        {#each partners as partner, i}
          <div class="partner-logo">
            <i class={partner}></i>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ===== CTA SECTION ===== -->
  <section class="cta section-padding">
    <div class="container">
      <div class="cta-card" use:reveal>
        <div class="cta-glow"></div>
        <div class="cta-content">
          <div class="cta-icon-wrapper">
            <Coffee size={48} class="cta-icon-lucide" />
          </div>
          <h2>Ready to Taste the Difference?</h2>
          <p>
            Join 50,000+ coffee lovers who start their day with purpose. 
            Every cup you brew supports farmers, plants trees, and builds a better future.
          </p>
          <div class="cta-buttons">
            <a href="/#products" class="btn btn-primary btn-lg">
              <ShoppingCart size={20} /> Shop Our Coffee
            </a>
            <a href="/#newsletter" class="btn btn-outline btn-lg">
              Get 10% Off <ArrowRight size={20} />
            </a>
          </div>
          <div class="cta-trust">
            <span><CheckCircle size={16} /> Free shipping over $50</span>
            <span><CheckCircle size={16} /> 30-day returns</span>
            <span><CheckCircle size={16} /> Carbon neutral</span>
          </div>
        </div>
      </div>
    </div>
  </section>

</main>

<style>
  /* ===== BASE ===== */
  .about-page {
    background: var(--color-bg);
    overflow-x: hidden;
  }

  .section-padding { padding: 6rem 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-accent);
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }

  .section-header { text-align: center; margin-bottom: 3.5rem; }
  .section-header h2 { 
    font-size: clamp(2rem, 4vw, 3rem); 
    margin-bottom: 1rem;
    color: var(--color-brown-dark);
  }
  .section-subtitle {
    max-width: 600px;
    margin: 0 auto;
    color: var(--color-brown);
    font-size: 1.1rem;
    line-height: 1.7;
    font-weight: 500;
  }

  /* ===== HERO ===== */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 10rem 1.5rem 6rem;
  }
  .hero-bg { position: absolute; inset: 0; z-index: 0; }
  .hero-bg img { width: 100%; height: 100%; object-fit: cover; }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(44, 24, 16, 0.85) 0%, rgba(59, 36, 22, 0.75) 100%);
  }
  .hero-content {
    position: relative; z-index: 1; text-align: center; max-width: 900px; color: var(--color-white);
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px);
    padding: 0.6rem 1.2rem; border-radius: 50px; font-size: 0.9rem; font-weight: 600;
    margin-bottom: 2rem; border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .hero-title { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.1; margin-bottom: 1.5rem; color: var(--color-white); }
  .hero-title .accent { color: var(--color-accent); font-style: italic; }
  .hero-subtitle {
    font-size: 1.25rem; line-height: 1.8; opacity: 1; margin-bottom: 2.5rem;
    max-width: 700px; margin-left: auto; margin-right: auto; color: var(--color-white); font-weight: 400;
  }
  .hero-cta { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .hero-cta .btn {
    display: inline-flex; align-items: center; gap: 0.6rem; padding: 1rem 2.5rem;
    border-radius: 50px; font-weight: 600; font-size: 1.05rem; text-decoration: none; transition: var(--transition);
  }
  .hero-cta .btn-primary { background: var(--color-accent); color: var(--color-white); }
  .hero-cta .btn-primary:hover { background: var(--color-accent-dark); transform: translateY(-3px); box-shadow: 0 10px 30px rgba(217, 119, 6, 0.4); }
  .hero-cta .btn-outline { background: transparent; color: var(--color-white); border: 2px solid rgba(255, 255, 255, 0.4); }
  .hero-cta .btn-outline:hover { background: var(--color-white); color: var(--color-brown-dark); border-color: var(--color-white); }
  
  .scroll-indicator {
    position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: var(--color-white); opacity: 0.7; font-size: 0.85rem; animation: bounce 2s infinite;
  }
  .mouse { width: 26px; height: 40px; border: 2px solid var(--color-white); border-radius: 20px; position: relative; }
  .wheel {
    width: 4px; height: 8px; background: var(--color-white); border-radius: 2px;
    position: absolute; top: 8px; left: 50%; transform: translateX(-50%); animation: scroll 2s infinite;
  }
  @keyframes scroll { 0% { opacity: 1; top: 8px; } 100% { opacity: 0; top: 20px; } }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
    40% { transform: translateX(-50%) translateY(-10px); }
    60% { transform: translateX(-50%) translateY(-5px); }
  }

  /* ===== STORY ===== */
  .story { background: var(--color-bg); }
  .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .story-image { position: relative; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-xl); }
  .story-image img { width: 100%; height: 600px; object-fit: cover; display: block; }
  .story-image-badge {
    position: absolute; bottom: 2rem; left: 2rem; background: var(--color-white);
    padding: 1.2rem 1.8rem; border-radius: var(--radius); display: flex; align-items: center; gap: 1rem;
    box-shadow: var(--shadow-lg); font-weight: 600; color: var(--color-brown-dark);
  }
  .badge-star { color: var(--color-accent); }
  .story-text h2 { font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 1.5rem; color: var(--color-brown-dark); }
  .story-text p { font-size: 1.1rem; line-height: 1.9; color: var(--color-brown); margin-bottom: 1.5rem; font-weight: 400; }
  .story-text p em { color: var(--color-accent-dark); font-style: italic; font-weight: 600; }
  .story-signature { margin-top: 2.5rem; padding-top: 2rem; border-top: 2px solid var(--color-cream); display: flex; flex-direction: column; gap: 0.3rem; }
  .signature-name { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: var(--color-brown-dark); }
  .signature-title { font-size: 0.95rem; color: var(--color-accent); font-weight: 600; }

  /* ===== STATS BAR ===== */
  .stats-bar { background: linear-gradient(135deg, var(--color-brown-dark) 0%, var(--color-brown) 100%); color: var(--color-white); padding: 5rem 0; }
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
  .stat-card {
    display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05); border-radius: var(--radius);
    border: 1px solid rgba(255, 255, 255, 0.1); transition: var(--transition);
  }
  .stat-card:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-5px); }
  .stat-icon-wrapper {
    width: 60px; height: 60px; background: rgba(217, 119, 6, 0.2);
    border-radius: 50%; display: grid; place-items: center; flex-shrink: 0;
  }
  .stat-icon { color: var(--color-accent); }
  .stat-content { display: flex; flex-direction: column; }
  .stat-value { font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; line-height: 1; color: var(--color-white); }
  .stat-suffix { color: var(--color-accent); font-size: 1.5rem; }
  .stat-label { font-size: 0.95rem; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-top: 0.3rem; }

  /* ===== VALUES ===== */
  .values { background: var(--color-cream); }
  .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem; }
  .value-card {
    background: var(--color-white); padding: 3rem 2rem; border-radius: var(--radius);
    box-shadow: var(--shadow-sm); transition: var(--transition); border: 1px solid rgba(59, 36, 22, 0.05);
    text-align: center; position: relative; overflow: hidden;
  }
  .value-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px;
    background: linear-gradient(90deg, var(--color-accent), transparent); opacity: 0; transition: opacity 0.3s;
  }
  .value-card:hover::before { opacity: 1; }
  .value-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-xl); }
  .value-icon {
    width: 80px; height: 80px; margin: 0 auto 2rem; border-radius: 50%;
    display: grid; place-items: center; font-size: 2rem; transition: var(--transition);
  }
  .value-card:hover .value-icon { transform: scale(1.15) rotate(-5deg); }
  .value-card h3 { font-size: 1.4rem; margin-bottom: 1rem; color: var(--color-brown-dark); }
  .value-card p { color: var(--color-brown); line-height: 1.7; font-size: 1rem; font-weight: 400; }
  .value-hover-line {
    position: absolute; bottom: 0; left: 50%; width: 0; height: 3px;
    transform: translateX(-50%); transition: width 0.3s;
  }
  .value-card:hover .value-hover-line { width: 60%; }

  /* ===== IMPACT ===== */
  .impact { background: var(--color-bg); }
  .impact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .impact-content h2 { font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 1.5rem; color: var(--color-brown-dark); }
  .impact-text { font-size: 1.1rem; line-height: 1.9; color: var(--color-brown); margin-bottom: 2rem; font-weight: 400; }
  .impact-list { list-style: none; padding: 0; margin: 0 0 2.5rem 0; }
  .impact-list li { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; font-size: 1.05rem; color: var(--color-brown); font-weight: 500; }
  .check-icon { color: var(--color-accent); flex-shrink: 0; }
  .impact-image { position: relative; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-xl); }
  .impact-image img { width: 100%; height: 500px; object-fit: cover; }
  .impact-badge {
    position: absolute; bottom: 2rem; right: 2rem; background: var(--color-white);
    padding: 1.5rem 2rem; border-radius: var(--radius); text-align: center; box-shadow: var(--shadow-lg);
  }
  .impact-badge-number { display: block; font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: var(--color-accent); line-height: 1; }
  .impact-badge-text { font-size: 0.9rem; color: var(--color-brown); font-weight: 600; margin-top: 0.5rem; }

  /* ===== TIMELINE ===== */
  .timeline { background: var(--color-bg); }
  .timeline-wrapper { position: relative; max-width: 800px; margin: 0 auto; padding: 2rem 0; }
  .timeline-line { position: absolute; left: 30px; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, var(--color-accent) 0%, var(--color-cream) 100%); border-radius: 3px; }
  .timeline-item { position: relative; padding-left: 100px; margin-bottom: 3.5rem; }
  .timeline-item:last-child { margin-bottom: 0; }
  .timeline-dot {
    position: absolute; left: 10px; top: 0; width: 40px; height: 40px;
    background: var(--color-accent); border-radius: 50%; display: grid; place-items: center;
    color: var(--color-white); box-shadow: 0 0 0 8px var(--color-bg), 0 0 0 10px var(--color-accent); font-size: 0.9rem;
  }
  .timeline-year {
    display: inline-block; background: var(--color-accent); color: var(--color-white);
    padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.9rem; font-weight: 700; margin-bottom: 1rem;
  }
  .timeline-content h3 { font-size: 1.5rem; margin-bottom: 0.8rem; color: var(--color-brown-dark); }
  .timeline-content p { color: var(--color-brown); line-height: 1.7; font-size: 1.05rem; font-weight: 400; }

  /* ===== TEAM ===== */
  .team { background: var(--color-cream); }
  .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; }
  .team-card { background: var(--color-white); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); transition: var(--transition); }
  .team-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-xl); }
  .team-image { position: relative; height: 350px; overflow: hidden; }
  .team-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .team-card:hover .team-image img { transform: scale(1.1); }
  .team-overlay {
    position: absolute; inset: 0; background: linear-gradient(to top, rgba(59, 36, 22, 0.9) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s; display: flex; align-items: flex-end; padding: 2rem;
  }
  .team-card:hover .team-overlay { opacity: 1; }
  .team-bio { color: var(--color-white); font-size: 0.95rem; line-height: 1.6; }
  .team-info { padding: 2rem; text-align: center; }
  .team-info h3 { font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--color-brown-dark); }
  .team-role { color: var(--color-accent); font-weight: 600; font-size: 0.95rem; margin-bottom: 1rem; }
  .team-social { display: flex; justify-content: center; gap: 0.8rem; }
  .team-social a {
    width: 40px; height: 40px; background: var(--color-cream); border-radius: 50%;
    display: grid; place-items: center; color: var(--color-brown-dark); font-size: 1rem; transition: var(--transition);
  }
  .team-social a:hover { background: var(--color-accent); color: var(--color-white); transform: translateY(-3px); }

  /* ===== PARTNERS ===== */
  .partners { background: var(--color-white); padding: 4rem 0; }
  .partners-grid { display: flex; justify-content: center; align-items: center; gap: 3rem; flex-wrap: wrap; opacity: 0.6; }
  .partner-logo { font-size: 2.5rem; color: var(--color-brown-light); transition: var(--transition); }
  .partner-logo:hover { color: var(--color-accent); transform: scale(1.2); }

  /* ===== CTA ===== */
  .cta { background: var(--color-bg); }
  .cta-card {
    position: relative; background: linear-gradient(135deg, var(--color-brown-dark) 0%, var(--color-brown) 100%);
    border-radius: var(--radius-lg); padding: 6rem 3rem; text-align: center; color: var(--color-white); overflow: hidden;
  }
  .cta-glow {
    position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, transparent 60%); pointer-events: none;
  }
  .cta-content { position: relative; z-index: 1; max-width: 750px; margin: 0 auto; }
  .cta-icon-wrapper {
    width: 100px; height: 100px; background: rgba(217, 119, 6, 0.2);
    border-radius: 50%; display: grid; place-items: center; margin: 0 auto 2rem;
  }
  .cta-icon-lucide { color: var(--color-accent); }
  .cta-content h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1.5rem; color: var(--color-white); }
  .cta-content p { font-size: 1.2rem; line-height: 1.8; opacity: 1; margin-bottom: 3rem; color: var(--color-white); font-weight: 400; }
  .cta-buttons { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem; }
  .cta-buttons .btn {
    display: inline-flex; align-items: center; gap: 0.6rem; padding: 1.2rem 2.5rem;
    border-radius: 50px; font-weight: 600; font-size: 1.1rem; text-decoration: none; transition: var(--transition);
  }
  .cta-buttons .btn-primary { background: var(--color-accent); color: var(--color-white); }
  .cta-buttons .btn-primary:hover { background: var(--color-accent-dark); transform: translateY(-3px); box-shadow: 0 10px 30px rgba(217, 119, 6, 0.4); }
  .cta-buttons .btn-outline { background: transparent; color: var(--color-white); border: 2px solid rgba(255, 255, 255, 0.4); }
  .cta-buttons .btn-outline:hover { background: var(--color-white); color: var(--color-brown-dark); border-color: var(--color-white); }
  .cta-trust { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; font-size: 0.9rem; opacity: 0.9; }
  .cta-trust span { display: flex; align-items: center; gap: 0.5rem; }
  .cta-trust svg { color: var(--color-accent); }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 900px) {
    .story-grid, .impact-grid { grid-template-columns: 1fr; gap: 3rem; }
    .story-image img, .impact-image img { height: 400px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .timeline-line { left: 20px; }
    .timeline-item { padding-left: 70px; }
    .timeline-dot { left: 5px; width: 30px; height: 30px; }
  }

  @media (max-width: 600px) {
    .section-padding { padding: 4rem 0; }
    .hero { min-height: 90vh; padding: 8rem 1rem 4rem; }
    .hero-subtitle { font-size: 1.1rem; }
    .hero-cta { flex-direction: column; }
    .hero-cta .btn { width: 100%; justify-content: center; }
    .story-image-badge { font-size: 0.9rem; padding: 1rem 1.5rem; bottom: 1rem; left: 1rem; }
    .stat-value { font-size: 2rem; }
    .stats-grid { grid-template-columns: 1fr; gap: 1rem; }
    .stat-card { padding: 1rem; }
    .cta-card { padding: 4rem 1.5rem; }
    .cta-buttons { flex-direction: column; }
    .cta-buttons .btn { width: 100%; justify-content: center; }
    .cta-trust { flex-direction: column; gap: 0.8rem; }
    .partners-grid { gap: 2rem; }
    .partner-logo { font-size: 2rem; }
  }
</style>