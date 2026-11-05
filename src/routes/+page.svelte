<SEO 
  title="Nexora Coffee | Brewing a Better World, One Cup at a Time" 
  description="Shop premium, ethically sourced coffee blends. From Ethiopian Yirgacheffe to Colombian Supremo, every cup supports farmers and plants trees."
  jsonLd={homeJsonLd}
/>



<script lang="ts">
  import SEO from '#lib/components/SEO.svelte';

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nexora Coffee",
    "url": "https://nexora-coffee.vercel.app", 
    "logo": "https://nexora-coffee.vercel.app/favicon.png",
    "description": "Premium ethically sourced coffee supporting farmers and the planet."
  };



  import Hero from '#lib/components/Hero.svelte';
  import About from '#lib/components/About.svelte';
  import Products from '#lib/components/Products.svelte';
  import Impact from '#lib/components/Impact.svelte';
  import Testimonials from '#lib/components/Testimonials.svelte';
  import Newsletter from '#lib/components/Newsletter.svelte';
</script>

<svelte:head>
  <title>Nexora Coffee — Brewed with Purpose</title>
</svelte:head>

<Hero />
<About />
<Products />
<Impact />
<Testimonials />
<Newsletter />