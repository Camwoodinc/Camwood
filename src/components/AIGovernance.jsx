import React from 'react';

const AIGovernance = () => {
  const calloutData = [
    { title: "PII coverage:", description: "high‑fidelity masking at rest & in transit." },
    { title: "Eval reliability:", description: "tight variance on gold‑sets; decision‑linked metrics." },
    { title: "Review SLA:", description: "sub‑day human loop with audit trails." },
    { title: "Drift:", description: "streaming telemetry with safe rollback." },
  ];

  const Callout = ({ title, description }) => (
    <div className="callout">
      <h3 className="callout-title">{title}</h3>
      <p className="callout-description">{description}</p>
    </div>
  );

  return (
    <section className="container" id="governance">
      <div className="prose">
        <div className="kicker">Trust by construction</div>
        <h2>Governance</h2>
        <div className="grid">
          {calloutData.map((data, index) => (
            <Callout key={index} title={data.title} description={data.description} />
          ))}
        </div>
        <figure className="illus shield" role="img" aria-label="Compliance shield illustration">
          <header>Illustration — Policy in code</header>
          <div className="canvas">
            <svg viewBox="0 0 800 220" className="shield">
              <g transform="translate(320,30)">
                <path className="s1" d="M80 0 L160 30 L160 110 C160 150 120 180 80 190 C40 180 0 150 0 110 L0 30 Z" />
                <path className="s2" d="M80 20 L140 44 L140 110 C140 140 110 162 80 170 C50 162 20 140 20 110 L20 44 Z" />
                <g fill="none" stroke="#4d74ff" strokeWidth="3">
                  <path d="M50 90 L75 115 L115 75" />
                </g>
              </g>
            </svg>
          </div>
          <figcaption>Compliance as a first‑class surface: auditable, testable, observable.</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default AIGovernance;