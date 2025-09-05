import React from 'react';

const AIArchitecture = () => {
  const calloutData = [
    {
      id: "data-layer",
      title: "Data layer:",
      description: "contracts, lineage, semantic caches, feature stores."
    },
    {
      id: "model-layer",
      title: "Model layer:",
      description: "retrieval, compact fine‑tunes, classic ML, rules."
    },
    {
      id: "orchestration",
      title: "Orchestration:",
      description: "guardrails, routing, fallbacks, experiment switches."
    },
    {
      id: "experience",
      title: "Experience:",
      description: "fast UIs that invite feedback and build trust."
    }
  ];

  const Callout = ({ id, title, description }) => (
    <div className="callout" id={id}>
      <div className="callout-content">
        <h3 className="callout-title">{title}</h3>
        <p className="callout-description">{description}</p>
      </div>
    </div>
  );

  return (
    <section className="container" id="architecture">
      <div className="prose">
        <div className="layout-grid">
          <aside className="local-toc" aria-label="On this page">
            <strong>
              <p>Architecture</p>
              <ul>
                <li><a href="#data-layer">Data layer</a></li>
                <li><a href="#model-layer">Model layer</a></li>
                <li><a href="#orchestration">Orchestration</a></li>
                <li><a href="#experience">Experience</a></li>
              </ul>
            </strong>
          </aside>
          <div>
            <div className="kicker">Under the hood</div>
            <h2>Architecture</h2>
            <div className="grid">
              {calloutData.map(data => (
                <Callout key={data.id} {...data} />
              ))}
            </div>
          </div>
        </div>
        <figure className="illus layers" role="img" aria-label="Layered architecture blocks">
          <header>Illustration — Composable stack</header>
          <div className="canvas">
            <svg viewBox="0 0 400 110" className="layers">
              <g id="stack" transform="translate(110, 75)">
                <rect x="0" y="0" width="170" height="30" rx="6" />
                <rect x="20" y="-25" width="130" height="25" rx="6" className="hl" />
                <rect x="40" y="-45" width="90" height="20" rx="6" />
                <rect x="60" y="-60" width="50" height="15" rx="6" className="hl" />
              </g>
              <g fill="var(--color-text-muted)" fontSize="6" textAnchor="middle">
                <text x="195" y="95">Experience</text>
                <text x="195" y="65">Orchestration</text>
                <text x="195" y="42.5">Model</text>
                <text x="195" y="25">Data</text>
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