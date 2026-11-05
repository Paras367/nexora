<script lang="ts">

  export let title: string = "Nexora Coffee | Premium Ethically Sourced Coffee";
  export let description: string = "Discover Nexora Coffee. Ethically sourced, sustainably brewed, and crafted with purpose. Join our movement for a better world, one cup at a time.";
  export let image: string = "og.jpeg"; 
  export let url: string = "https://nexora-coffee.vercel.app"; 
  export let type: 'website' | 'article' | 'product' = 'website';
  export let jsonLd: object | null = null;
</script>

<svelte:head>

  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={url} />


  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content={type} />
  <meta property="og:site_name" content="Nexora Coffee" />


  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />


  {#if jsonLd}
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  {/if}
</svelte:head>