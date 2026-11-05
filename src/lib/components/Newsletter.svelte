<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { toast } from '../stores/toast.svelte';

  type Status = 'idle' | 'loading' | 'success';

  let email = $state('');
  let status = $state<Status>('idle');
  let error = $state('');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Simulated backend call (Replace with your actual API call later)
  async function subscribe(_email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Simulate success
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    error = '';
    const value = email.trim();

    if (!EMAIL_RE.test(value)) {
      error = 'Please enter a valid email address.';
      toast.error(error);
      return;
    }

    status = 'loading';
    try {
      await subscribe(value);
      status = 'success';
      email = '';
      toast.success('Welcome to the Nexora family! Check your inbox for 10% off.');
    } catch {
      status = 'idle';
      error = "We couldn't subscribe you right now. Please try again.";
      toast.error(error);
    }
  }
</script>

<section id="newsletter" class="section newsletter" aria-labelledby="newsletter-title">
  <div class="container">
    <div class="box" in:fly={{ y: 40, duration: 600, delay: 200 }}>
      
      <!-- Subtle background decoration -->
      <div class="bg-decoration" aria-hidden="true">
        <i class="fa-solid fa-mug-hot"></i>
      </div>

      <div class="header">
        <div class="icon-wrapper">
          <i class="fa-solid fa-envelope-open-text icon" aria-hidden="true"></i>
        </div>
        <h2 id="newsletter-title">Join the Nexora Family</h2>
        <p>
          Get 10% off your first order, exclusive brewing tips, and stories from the farms.
          Plus, every new subscription plants a tree. <i class="fa-solid fa-seedling tree" aria-hidden="true"></i>
        </p>
      </div>

      <div class="content" aria-live="polite">
        {#if status === 'success'}
          <div class="success" in:fade={{ duration: 400 }}>
            <div class="success-icon">
              <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
            </div>
            <div class="success-text">
              <strong>You're on the list!</strong>
              <p>Check your inbox for your 10% discount code.</p>
            </div>
            <button class="reset-btn" onclick={() => status = 'idle'} aria-label="Subscribe another email">
              <i class="fa-solid fa-arrow-rotate-left"></i>
            </button>
          </div>
        {:else}
          <form class="form" novalidate onsubmit={handleSubmit}>
            <div class="field">
              <label for="nl-email" class="sr-only">Email address</label>
              <i class="fa-solid fa-envelope field-icon" aria-hidden="true"></i>
              <input
                id="nl-email" 
                type="email" 
                name="email" 
                placeholder="your@email.com"
                autocomplete="email" 
                inputmode="email" 
                required
                bind:value={email} 
                disabled={status === 'loading'}
                aria-invalid={error ? 'true' : undefined} 
                aria-describedby={error ? 'nl-error' : undefined}
              />
            </div>
            <button type="submit" class="btn btn-primary" disabled={status === 'loading'}>
              {#if status === 'loading'}
                <i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i>
                <span>Subscribing…</span>
              {:else}
                <span>Subscribe</span>
                <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
              {/if}
            </button>
          </form>

          {#if error}
            <p id="nl-error" class="error" role="alert" in:fly={{ y: -10, duration: 300 }}>
              <i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
              <span>{error}</span>
            </p>
          {/if}
        {/if}
      </div>

      <p class="privacy">
        <i class="fa-solid fa-lock" aria-hidden="true"></i> 
        No spam. Unsubscribe anytime. We respect your inbox.
      </p>
    </div>
  </div>
</section>

<style>
  /* Screen Reader Only Utility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .newsletter { 
    padding: 6rem 0; 
    background: var(--color-cream); 
    position: relative;
  }

  .box {
    position: relative; 
    overflow: hidden; 
    max-width: 680px; 
    margin: 0 auto; 
    padding: 4rem 3rem; 
    text-align: center;
    background: var(--color-white); 
    border: 1px solid rgba(59, 36, 22, 0.05);
    border-radius: calc(var(--radius) + 8px); 
    box-shadow: var(--shadow-xl);
    z-index: 1;
  }
  
  /* Top gradient accent line */
  .box::before { 
    content: ''; 
    position: absolute; 
    inset: 0 0 auto 0; 
    height: 4px; 
    background: linear-gradient(90deg, var(--color-accent), var(--color-accent-light), var(--color-accent)); 
  }

  /* Subtle background decoration */
  .bg-decoration {
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 10rem;
    color: var(--color-accent);
    opacity: 0.03;
    transform: rotate(15deg);
    pointer-events: none;
  }

  .header { margin-bottom: 2.5rem; position: relative; z-index: 2; }
  
  .icon-wrapper { 
    display: grid; 
    place-items: center; 
    width: 80px; 
    height: 80px; 
    margin: 0 auto 1.5rem; 
    background: linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(217, 119, 6, 0.05)); 
    border-radius: 50%; 
    border: 1px solid rgba(217, 119, 6, 0.15);
  }
  .icon { font-size: 2.2rem; color: var(--color-accent); }
  
  h2 { margin-bottom: 1rem; font-size: clamp(1.8rem, 4vw, 2.4rem); }
  .header p { max-width: 520px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6; color: var(--color-muted); }
  .tree { margin-left: 0.2rem; color: #059669; }

  .content { position: relative; z-index: 2; min-height: 120px; }

  .form { display: flex; gap: 0.75rem; max-width: 520px; margin: 0 auto; }
  .field { position: relative; flex: 1; }
  .field-icon { 
    position: absolute; 
    top: 50%; 
    left: 1.2rem; 
    transform: translateY(-50%); 
    color: var(--color-muted); 
    pointer-events: none; 
    transition: var(--transition); 
  }
  .field:focus-within .field-icon { color: var(--color-accent); }
  
  .field input { 
    width: 100%;
    padding: 1rem 1.2rem 1rem 3rem; 
    border: 2px solid var(--color-cream); 
    border-radius: 50px; 
    background: var(--color-bg); 
    font-size: 1rem;
    transition: var(--transition);
  }
  .field input:focus { 
    background: var(--color-white); 
    border-color: var(--color-accent);
    box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.1);
    outline: none;
  }
  .field input[aria-invalid='true'] { border-color: var(--color-error); }
  .field input:disabled { opacity: 0.7; cursor: not-allowed; }
  
  .form .btn { 
    padding: 1rem 2rem; 
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .error { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    gap: 0.5rem; 
    margin: 1.2rem 0 0; 
    color: #b91c1c; 
    font-size: 0.9rem; 
    font-weight: 500; 
  }

  .success {
    display: flex; 
    align-items: center; 
    justify-content: center; 
    gap: 1.2rem; 
    max-width: 520px; 
    margin: 0 auto; 
    padding: 1.5rem;
    background: #ecfdf5; 
    border: 1px solid #a7f3d0; 
    border-radius: var(--radius); 
    color: #065f46; 
    text-align: left;
    position: relative;
  }
  .success-icon { 
    flex-shrink: 0; 
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    background: #d1fae5;
    border-radius: 50%;
    font-size: 1.5rem; 
    color: #059669; 
  }
  .success-text strong { display: block; margin-bottom: 0.3rem; font-size: 1.15rem; }
  .success-text p { margin: 0; color: #047857; font-size: 0.95rem; line-height: 1.5; }
  
  .reset-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: transparent;
    color: #059669;
    border: none;
    cursor: pointer;
    transition: var(--transition);
  }
  .reset-btn:hover {
    background: rgba(5, 150, 105, 0.1);
    transform: rotate(-180deg);
  }

  .privacy { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    gap: 0.5rem; 
    margin: 2.5rem 0 0; 
    font-size: 0.85rem; 
    color: var(--color-muted);
    position: relative;
    z-index: 2;
  }
  .privacy i { font-size: 0.8rem; color: var(--color-accent); }

  @media (max-width: 600px) {
    .newsletter { padding: 4rem 0; }
    .box { margin: 0 1rem; padding: 3rem 1.5rem; }
    .form { flex-direction: column; gap: 1rem; }
    .form .btn { width: 100%; padding: 1rem; justify-content: center; }
    .success { flex-direction: column; text-align: center; gap: 1rem; }
    .success-text { text-align: center; }
    .reset-btn { top: -10px; right: -10px; background: var(--color-white); border: 1px solid #a7f3d0; }
  }
</style>