import React, { useEffect } from 'react';
import Callout from './Callout';

const AIOutcomes = () => {
    useEffect(() => {
        // Animate sparkline
        const sparklinePath = document.getElementById('spark');
        if (sparklinePath) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const length = sparklinePath.getTotalLength();
                        sparklinePath.style.strokeDasharray = length;
                        sparklinePath.style.strokeDashoffset = length;
                        setTimeout(() => {
                            sparklinePath.style.transition = 'stroke-dashoffset 2s ease-in-out';
                            sparklinePath.style.strokeDashoffset = '0';
                        }, 50);
                        observer.unobserve(sparklinePath);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(sparklinePath);
        }

        // Count-up stats
        const statsContainer = document.getElementById('stats');
        if (statsContainer) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statsContainer.querySelectorAll('[data-count]').forEach(el => {
                            const end = +el.getAttribute('data-count');
                            const start = 0;
                            const duration = 900;
                            const startTime = performance.now();
                            const tick = (currentTime) => {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                el.textContent = Math.round(start + (end - start) * progress);
                                if (progress < 1) {
                                    requestAnimationFrame(tick);
                                }
                            };
                            requestAnimationFrame(tick);
                        });
                        statsObserver.disconnect();
                    }
                });
            }, { threshold: 0.6 });
            statsObserver.observe(statsContainer);
        }
    }, []);

    return (
        <section className="container" id="outcomes">
            <div className="prose">
                <div className="kicker">Why it matters</div>
                <h2>Outcomes</h2>
                <div className="grid" id="stats">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Time-to-decision:</td>
                                    <td><span data-count="42">0</span>% faster</td>
                                </tr>
                                <tr>
                                    <td>Cost-to-serve:</td>
                                    <td><span data-count="28">0</span>% lower</td>
                                </tr>
                                <tr>
                                    <td>Accuracy @ constraints:</td>
                                    <td><span data-count="17">0</span> pt gain</td>
                                </tr>
                                <tr>
                                    <td>Trust/CSAT:</td>
                                    <td><span data-count="22">0</span>% lift</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <figure className="illus" role="img" aria-label="Sparkline of improvement with annotations">
                    <header>Illustration — Learning curve</header>
                    <div className="canvas">
                        <svg viewBox="0 0 800 220" preserveAspectRatio="none">
                            <polyline
                                id="spark"
                                points="0,180 80,176 160,168 240,150 320,138 400,120 480,110 560,98 640,86 720,72 800,64"
                                fill="none"
                                stroke="#3fbf7f"
                                strokeWidth="3"
                            />
                            <g fill="var(--color-text-muted)" fontSize="12">
                                <text x="60" y="194">Baseline</text>
                                <text x="360" y="144">Right‑size & govern</text>
                                <text x="670" y="60">Human loop & evals</text>
                            </g>
                        </svg>
                    </div>
                    <figcaption>Steady compounding beats flashy spikes. We optimize for durable gains.</figcaption>
                </figure>
            </div>
        </section>
    );
};

export default AIOutcomes;