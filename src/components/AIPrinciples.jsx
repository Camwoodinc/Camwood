import React, { useEffect } from 'react';

const AIPrinciples = () => {
    useEffect(() => {
        // Animate flows on view
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.transition = 'stroke-dashoffset 1.2s ease';
                    const len = el.getTotalLength();
                    el.style.strokeDasharray = len;
                    el.style.strokeDashoffset = len;
                    requestAnimationFrame(() => {
                        el.style.strokeDashoffset = '0';
                    });
                    io.unobserve(el);
                }
            });
        }, { threshold: 0.4 });

        ['flow1', 'flow2', 'flow3', 'flow4', 'flow5', 'flow6'].forEach(id => {
            const p = document.getElementById(id);
            if (p) io.observe(p);
        });

        // Expandable callouts (click + keyboard)
        document.querySelectorAll('.callout[role="button"]').forEach(c => {
            const toggle = () => c.setAttribute('aria-expanded', c.getAttribute('aria-expanded') !== 'true');
            c.addEventListener('click', toggle);
            c.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle();
                }
            });
        });

        return () => {
            io.disconnect();
        };
    }, []);

    const calloutData = [
        {
            id: 'p-scale',
            title: 'Scale last.',
            description: 'Prove value small, then grow.',
            moreText: 'Keeps latency, cost, and risk in check while we learn from real users.',
            iconPath: 'M4 18h16M6 14h12M8 10h8M10 6h4',
            iconStroke: '#4d74ff',
        },
        {
            id: 'p-dignity',
            title: 'Data dignity.',
            description: 'Contracts, lineage, consent.',
            moreText: 'We encode PII policy as tests and log evidence for auditors.',
            iconPath: 'M12 3l7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4z',
            iconStroke: '#4d74ff',
            iconFill: '#1a1e27',
            additionalIconPath: 'M8 12l3 3 5-5',
            additionalIconStroke: '#3fbf7f',
        },
        {
            id: 'p-human',
            title: 'Human in the loop.',
            description: 'Feedback that compounds.',
            moreText: 'Operators can correct, label, and steer; the system learns fast.',
            iconPath: 'M4 12a8 8 0 1016 0',
            iconStroke: '#8b5cf6',
            additionalIconPath: 'M12 12a2 2 0 110-4 2 2 0 010 4z',
            additionalIconFill: '#f59e0b',
        }
    ];

    const Callout = ({ id, title, description, moreText, iconPath, iconStroke, iconFill, additionalIconPath, additionalIconStroke, additionalIconFill }) => (
        <div className="callout" id={id} role="button" tabIndex="0" aria-expanded="false">
            <div className="callout-content">
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={iconPath} stroke={iconStroke} strokeWidth="2" fill={iconFill || 'none'} strokeLinecap="round" />
                    {additionalIconPath && <path d={additionalIconPath} stroke={additionalIconStroke || 'none'} strokeWidth="2" fill={additionalIconFill || 'none'} strokeLinecap="round" />}
                </svg>
                <h3 className="callout-title">{title}</h3>
                <p className="callout-description">{description}</p>
                <p className="callout-more-text">{moreText}</p>
            </div>
        </div>
    );

    return (
        <section className="container" id="principles">
            <div className="prose">
                <div className="layout-grid">
                    <aside className="local-toc" aria-label="On this page">
                        <strong>
                            <p>Principles</p>
                            <ul>
                                <li><a href="#p-scale">Scale last</a></li>
                                <li><a href="#p-dignity">Data dignity</a></li>
                                <li><a href="#p-human">Human in the loop</a></li>
                            </ul>
                        </strong>
                    </aside>
                    <div>
                        <div className="kicker">Our point of view</div>
                        <h2>Principles</h2>
                        <div className="grid">
                            {calloutData.map(data => (
                                <Callout key={data.id} {...data} />
                            ))}
                        </div>
                        <figure className="illus vectorfield" role="img" aria-label="Vectors converging to a compass point">
                            <header>Illustration — Data → Direction</header>
                            <div className="canvas">
                                <svg viewBox="0 0 800 220" preserveAspectRatio="none">
                                    <defs>
                                        <marker id="arrowHead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#4d74ff" />
                                        </marker>
                                        <radialGradient id="compass" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity=".3" />
                                            <stop offset="100%" stopColor="#4d74ff" stopOpacity=".1" />
                                        </radialGradient>
                                    </defs>
                                    <g className="flow" fill="none">
                                        <path id="flow1" d="M20 30 C 200 40, 260 120, 400 110" />
                                        <path id="flow2" d="M20 60 C 220 70, 260 140, 400 110" />
                                        <path id="flow3" d="M20 90 C 200 120, 260 160, 400 110" />
                                        <path id="flow4" d="M780 30 C 600 40, 540 120, 400 110" />
                                        <path id="flow5" d="M780 60 C 580 70, 540 140, 400 110" />
                                        <path id="flow6" d="M780 90 C 600 120, 540 160, 400 110" />
                                    </g>
                                    <g fill="none">
                                        <path className="arrow" d="M80 180 L 380 120" stroke="var(--color-line)" />
                                        <path className="arrow" d="M720 180 L 420 120" stroke="var(--color-line)" />
                                    </g>
                                    <g>
                                        <circle cx="400" cy="110" r="70" fill="url(#compass)" stroke="var(--color-line)" />
                                        <line x1="400" y1="110" x2="440" y2="80" stroke="#f59e0b" strokeWidth="3" />
                                        <circle cx="400" cy="110" r="4" fill="#f59e0b" />
                                    </g>
                                </svg>
                            </div>
                            <figcaption>Signals converge to a navigable heading. Insight that points somewhere useful.</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIPrinciples;