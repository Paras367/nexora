<script lang="ts">
    import {
        Code2,
        Cpu,
        ShieldCheck,
        Layers,
        ArrowUpRight
    } from "lucide-svelte";

    const services = [
        {
            number: "01",
            title: "Digital Engineering",
            description: "Modern web applications, scalable systems and powerful digital infrastructure.",
            icon: Code2,
            tag: "DEVELOPMENT"
        },
        {
            number: "02",
            title: "Artificial Intelligence",
            description: "Intelligent solutions, AI-powered workflows and next-generation automation.",
            icon: Cpu,
            tag: "INTELLIGENCE"
        },
        {
            number: "03",
            title: "Cybersecurity",
            description: "Security-focused engineering, privacy and resilient digital systems.",
            icon: ShieldCheck,
            tag: "SECURITY"
        },
        {
            number: "04",
            title: "Creative Technology",
            description: "Unique digital experiences combining visual design and technology.",
            icon: Layers,
            tag: "EXPERIENCE"
        }
    ];
</script>

<section class="section services-section" id="services">
    <div class="section-header">
        <div>
            <span class="section-eyebrow">01 / WHAT WE DO</span>
            <h2>Engineering the <span>possibilities.</span></h2>
        </div>

        <p>
            Technology is more than code.
            It's how we transform ideas into reality.
        </p>
    </div>

    <div class="service-grid">
        {#each services as service}
            <article class="service-card">
                <div class="service-top">
                    <span>{service.number}</span>
                    <service.icon size={23} strokeWidth={1.5}/>
                </div>

                <div class="service-content">
                    <span class="service-tag">{service.tag}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>

                <a href="#contact" class="service-link" aria-label={`Learn about ${service.title}`}>
                    <ArrowUpRight size={19}/>
                </a>
            </article>
        {/each}
    </div>
</section>