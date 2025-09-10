import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframes for the floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

// Define styled components with improved aesthetics
const HeroSectionStyled = styled.section`
  background-color: var(--color-background-hero);
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;

  @media (min-width: 768px) {
    padding: 100px 0;
  }
`;

const Card = styled.div`
  background-color: var(--color-card-background);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    padding: 40px;
    text-align: left;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 60px;
  }
`;

const Eyebrow = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 24px;
  line-height: 1.2;
  color: var(--color-text-heading);

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 500px;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CtaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
  }

  &.alt {
    background-color: var(--color-secondary);
    color: var(--color-text-on-secondary);
    border: 2px solid var(--color-secondary);
    
    &:hover {
      background-color: var(--color-secondary-dark);
      border-color: var(--color-secondary-dark);
    }
  }
`;

const Kbd = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, Monaco, monospace;
  background-color: var(--color-kbd-background);
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 13px;
  color: var(--color-text-muted);
`;

const IllustrationFigure = styled.figure`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  animation: ${float} 6s ease-in-out infinite;
  
  @media (min-width: 768px) {
    margin: 0;
  }
`;

const IllustrationHeader = styled.header`
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const IllustrationCanvas = styled.div`
  width: 100%;
  background-color: var(--color-canvas-background);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  /* Use padding-bottom to maintain 800x260 aspect ratio (260/800 = 0.325) */
  padding-bottom: 32.5%;
  
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Figcaption = styled.figcaption`
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 16px;
  line-height: 1.5;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const HeroSection = () => {
  useEffect(() => {
    const parallax = document.getElementById('parallax');
    const layer = document.getElementById('parallaxLayer');

    const handleMouseMove = (e) => {
      const b = e.currentTarget.getBoundingClientRect();
      const cx = (e.clientX - b.left) / b.width - 0.5;
      const cy = (e.clientY - b.top) / b.height - 0.5;
      if (layer) {
        layer.setAttribute('transform', `translate(${cx * 12}, ${cy * 8})`);
      }
    };

    if (parallax) {
      parallax.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (parallax) {
        parallax.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <HeroSectionStyled className="container" id="top">
      <Card>
        <Content>
          <div>
            <Eyebrow>Essays from the Camwood team</Eyebrow>
            <Title>AI at Camwood: Turning Data into Direction</Title>
            <Paragraph>
              At Camwood, we believe intelligence should feel light, helpful, and precise. Not every problem needs a
              skyscraper of compute; most need a right‑sized, well‑governed system that converts raw signals into clear
              decisions. This is our craft: humane AI that respects constraints, scales elegantly, and earns trust.
            </Paragraph>
            <CtaContainer>
              <Button href="#principles" className="alt">Read the Principles</Button>
              <Button href="#process">See the Process</Button>
              <Kbd>Tip: Use ← / → to switch sections</Kbd>
            </CtaContainer>
          </div>
          <IllustrationFigure role="img" aria-label="Abstract illustration of data streams settling into order">
            <IllustrationHeader>Illustration — From noise to signal</IllustrationHeader>
            <IllustrationCanvas id="parallax">
              <svg viewBox="0 0 800 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4d74ff" stopOpacity=".7" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity=".25" />
                  </linearGradient>
                  <filter id="soft"><feGaussianBlur stdDeviation="1.0" /></filter>
                </defs>
                <g opacity=".6" stroke="var(--color-line)">
                  <rect x="0" y="0" width="800" height="260" fill="none" />
                  <path d="M40 0 V260 M80 0 V260 M120 0 V260 M160 0 V260 M200 0 V260 M240 0 V260 M280 0 V260 M320 0 V260 M360 0 V260 M400 0 V260 M440 0 V260 M480 0 V260 M520 0 V260 M560 0 V260 M600 0 V260 M640 0 V260 M680 0 V260 M720 0 V260 M760 0 V260" />
                  <path d="M0 40 H800 M0 80 H800 M0 120 H800 M0 160 H800 M0 200 H800 M0 240 H800" />
                </g>
                <g id="parallaxLayer" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, Monaco, monospace" fontSize="12" fill="url(#glow)" filter="url(#soft)">
                  <g transform="translate(80,0)">
                    <text x="0" y="40">0 1 0 1 1 0 1 0 1 0 1 0</text>
                    <text x="0" y="80">1 1 2 3 5 8 13 21</text>
                    <text x="0" y="120">… data → pattern → insight</text>
                  </g>
                  <g transform="translate(360,0)">
                    <text x="0" y="40">A B S T R A C T I O N</text>
                    <text x="0" y="80">M E T R I C S</text>
                    <text x="0" y="120">D E C I S I O N S</text>
                  </g>
                </g>
              </svg>
            </IllustrationCanvas>
            <Figcaption>Code‑drawn visual: raw sequences settle into guided motion. No stock art; pure HTML/SVG.</Figcaption>
          </IllustrationFigure>
        </Content>
      </Card>
    </HeroSectionStyled>
  );
};

export default HeroSection;