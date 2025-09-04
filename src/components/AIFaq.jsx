import React from 'react';

const AIFaq = () => {
  return (
    <section className="container" id="faq">
      <div className="prose">
        <div className="kicker">Quick answers</div>
        <h2>FAQ</h2>
        <h3>What does “right‑sized” mean in practice?</h3>
        <p>Choose the simplest architecture that achieves the KPI under real constraints—then prove it with evals and telemetry.</p>
        <h3>Where does Camwood’s “intellect” show up?</h3>
        <p>In framing, feedback design, and governance encoded as product. Taste is the edge—what not to build, what to test first.</p>
        <h3>How do we get started?</h3>
        <p>Short discovery → right‑sized architecture → working slice with measurable outcomes in weeks.</p>
        <figure className="illus" role="img" aria-label="Q&A cards">
          <header>Illustration — Clarity cards</header>
          <div className="canvas">
            <svg viewBox="0 0 800 220">
              <rect x="140" y="40" width="200" height="140" rx="14" fill="var(--color-surface)" stroke="var(--color-line)" />
              <rect x="340" y="40" width="200" height="140" rx="14" fill="#1a1e27" stroke="#2e3547" />
              <rect x="540" y="40" width="200" height="140" rx="14" fill="var(--color-surface)" stroke="var(--color-line)" />
              <g fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">
                <text x="240" y="120">Simple</text>
                <text x="440" y="120">Governed</text>
                <text x="640" y="120">Measurable</text>
              </g>
            </svg>
          </div>
          <figcaption>Answers that stay tidy and auditable.</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default AIFaq;