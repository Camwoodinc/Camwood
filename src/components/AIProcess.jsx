import React, { useState } from 'react';
import Callout from './Callout';

const AIProcess = () => {
  const [needleValue, setNeedleValue] = useState(-30);

  const handleSliderChange = (e) => {
    setNeedleValue(e.target.value);
  };

  return (
    <section className="container" id="process">
      <div className="prose">
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '18px', alignItems: 'start' }}>
          <aside className="local-toc" aria-label="On this page">
            <strong style={{ fontSize: '12px', letterSpacing: '.3px', textTransform: 'uppercase' }}>Process</strong>
            <a href="#s-frame">Frame & ground</a>
            <a href="#s-size">Right‑size</a>
            <a href="#s-govern">Govern & align</a>
            <a href="#s-ship">Ship & learn</a>
          </aside>
          <div>
            <div className="kicker">How we work</div>
            <h2>Process</h2>
            <div className="grid">
              <Callout
                id="s-frame"
                icon={<svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#8b5cf6" strokeWidth="2" fill="none" /><path d="M6 12h12M12 6v12" stroke="#4d74ff" strokeWidth="2" /></svg>}
                title="1) Frame & ground:"
                description="decisions, KPIs, risks, eval sets."
                moreText="Define the decision loop and measurement first; it guides everything else."
              />
              <Callout
                id="s-size"
                icon={<svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18M6 14h12M9 10h6M11 6h2" stroke="#3fbf7f" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>}
                title="2) Right‑size:"
                description="rules, retrieval, classic ML, compact LLMs."
                moreText="Pick the smallest effective architecture; revisit as data and needs evolve."
              />
              <Callout
                id="s-govern"
                icon={<svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4z" fill="#1a1e27" stroke="#4d74ff" /><path d="M8 12l3 3 5-5" stroke="#3fbf7f" strokeWidth="2" fill="none" /></svg>}
                title="3) Govern & align:"
                description="policy in code, red‑team prompts, rollback switches."
                moreText="Guardrails are features, not paperwork; they ship with the product."
              />
              <Callout
                id="s-ship"
                icon={<svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16l6-8 4 5 3-3 3 6" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>}
                title="4) Ship & learn:"
                description="instrument, release, measure, iterate."
                moreText="Tight loops, A/Bs, and operator insight drive durable gains."
              />
            </div>
            <div className="play" aria-label="Right-sizing playground">
              <div>
                <label htmlFor="needle" style={{ display: 'block', fontWeight: '700' }}>Dial in “right‑sized”</label>
                <input
                  id="needle"
                  type="range"
                  min="-90"
                  max="90"
                  value={needleValue}
                  step="1"
                  onChange={handleSliderChange}
                  style={{ width: '100%' }}
                />
                <small className="muted">Move the slider to see where Camwood aims—minimal architecture, maximum impact.</small>
              </div>
              <figure className="illus dial" role="img" aria-label="Right-sizing dial illustration">
                <header>Interactive — Right‑sizing</header>
                <div className="canvas">
                  <svg viewBox="0 0 800 220" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradDial" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3fbf7f" />
                        <stop offset="50%" stopColor="#4d74ff" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(400,190)">
                      <path className="track" d="M-240 0 A240 240 0 0 1 240 0" fill="none" />
                      <path className="progress" d="M-240 0 A240 240 0 0 1 80 -206" fill="none" />
                      <g strokeLinecap="round">
                        <line className="tick" x1="-240" y1="0" x2="-236" y2="-8" />
                        <line className="tick" x1="-160" y1="-120" x2="-154" y2="-126" />
                        <line className="tick" x1="0" y1="-240" x2="0" y2="-248" />
                        <line className="tick" x1="160" y1="-120" x2="166" y2="-126" />
                        <line className="tick" x1="240" y1="0" x2="244" y2="-8" />
                      </g>
                      <g id="needleGroup" transform={`rotate(${needleValue})`}>
                        <line x1="0" y1="0" x2="80" y2="-206" stroke="#f59e0b" strokeWidth="3" />
                        <circle cx="0" cy="0" r="4" fill="#f59e0b" />
                      </g>
                    </g>
                    <g fontSize="12" fill="var(--color-text-muted)" textAnchor="middle">
                      <text x="90" y="205">Over‑engineering</text>
                      <text x="400" y="32">Right‑sized</text>
                      <text x="710" y="205">Under‑fit</text>
                    </g>
                  </svg>
                </div>
                <figcaption>We aim for the smallest architecture that wins against your target metric.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProcess;