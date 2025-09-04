import React from 'react';
import Callout from './Callout';

const AIArchitecture = () => {
  return (
    <section className="container" id="architecture">
      <div className="prose">
        <div className="kicker">Under the hood</div>
        <h2>Architecture</h2>
        <div className="grid">
          <Callout title="Data layer:" description="contracts, lineage, semantic caches, feature stores." />
          <Callout title="Model layer:" description="retrieval, compact fine‑tunes, classic ML, rules." />
          <Callout title="Orchestration:" description="guardrails, routing, fallbacks, experiment switches." />
          <Callout title="Experience:" description="fast UIs that invite feedback and build trust." />
        </div>
        <figure className="illus layers" role="img" aria-label="Layered architecture blocks">
          <header>Illustration — Composable stack</header>
          <div className="canvas">
            <svg viewBox="0 0 800 220" className="layers">
              <g id="stack" transform="translate(160,120)">
                <rect x="0" y="0" width="480" height="60" rx="12" />
                <rect x="40" y="-50" width="400" height="50" rx="12" className="hl" />
                <rect x="80" y="-100" width="320" height="40" rx="12" />
                <rect x="120" y="-140" width="240" height="30" rx="12" className="hl" />
              </g>
              <g fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">
                <text x="400" y="190">Experience</text>
                <text x="400" y="130">Orchestration</text>
                <text x="400" y="85">Model</text>
                <text x="400" y="50">Data</text>
              </g>
            </svg>
          </div>
          <figcaption>Blocks you can rearrange as needs evolve—no monoliths.</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default AIArchitecture;