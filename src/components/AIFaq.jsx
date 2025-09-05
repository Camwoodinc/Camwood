import React, { useEffect } from 'react';

const AIFaq = () => {
    useEffect(() => {
        // Simple Intersection Observer to fade in elements on scroll
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.prose h3, .prose p, .prose figure').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            fadeInObserver.observe(element);
        });

        // Add class to animate SVG on scroll
        const svgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    svgObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const svgElement = document.querySelector('.illus svg');
        if (svgElement) {
            svgObserver.observe(svgElement);
        }

        return () => {
            fadeInObserver.disconnect();
            if (svgElement) {
                svgObserver.disconnect();
            }
        };
    }, []);

    const faqItems = [
        {
            question: 'What does “right‑sized” mean in practice?',
            answer: 'Choose the simplest architecture that achieves the KPI under real constraints—then prove it with evals and telemetry.'
        },
        {
            question: 'Where does Camwood’s “intellect” show up?',
            answer: 'In framing, feedback design, and governance encoded as product. Taste is the edge—what not to build, what to test first.'
        },
        {
            question: 'How do we get started?',
            answer: 'Short discovery → right‑sized architecture → working slice with measurable outcomes in weeks.'
        },
    ];

    const cardsData = [
        { text: 'Simple', color: 'var(--color-surface)', stroke: 'var(--color-line)' },
        { text: 'Governed', color: '#1a1e27', stroke: '#2e3547' },
        { text: 'Measurable', color: 'var(--color-surface)', stroke: 'var(--color-line)' },
    ];

    return (
        <section className="container" id="faq">
            <div className="prose">
                <div className="kicker">Quick answers</div>
                <h2>FAQ</h2>
                <div className="faq-list">
                    {faqItems.map((item, index) => (
                        <div key={index} className="faq-item">
                            <h3>{item.question}</h3>
                            <p>{item.answer}</p>
                        </div>
                    ))}
                </div>
                <figure className="illus" role="img" aria-label="Q&A cards">
                    <header>Illustration — Clarity cards</header>
                    <div className="canvas">
                        <svg viewBox="0 0 800 220">
                            {cardsData.map((card, index) => (
                                <g key={index} className="card-group" style={{ transitionDelay: `${index * 0.2}s` }}>
                                    <rect
                                        x={140 + index * 200}
                                        y="40"
                                        width="200"
                                        height="140"
                                        rx="14"
                                        fill={card.color}
                                        stroke={card.stroke}
                                    />
                                    <text
                                        x={240 + index * 200}
                                        y="120"
                                        fill={card.stroke === '#2e3547' ? 'white' : 'var(--color-text-muted)'}
                                        fontSize="12"
                                        textAnchor="middle"
                                    >
                                        {card.text}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>
                    <figcaption>Answers that stay tidy and auditable.</figcaption>
                </figure>
            </div>
        </section>
    );
};

export default AIFaq;