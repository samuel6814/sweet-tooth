import React from 'react';
import styled from 'styled-components';
import { ScanFace, Stethoscope } from 'lucide-react';

const Section = styled.section`
  padding: 48px 0;
  background-color: #f7f9fb;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;
  @media (min-width: 768px) { padding: 0 2rem; }
  @media (min-width: 1024px) { padding: 0 4rem; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const ImageWrapper = styled.div`
  position: relative;
  
  .main-img {
    aspect-ratio: 4 / 5;
    border-radius: 1.5rem;
    overflow: hidden;
    position: relative;
    z-index: 10;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
`;

const Content = styled.div`
  font-family: 'Hanken Grotesk', sans-serif;

  .badge {
    display: inline-block;
    padding: 4px 16px;
    border-radius: 9999px;
    background-color: #e0e3e5;
    color: #3e4850;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    color: #00658d;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    @media (min-width: 768px) { font-size: 64px; }
  }
  
  p.lead {
    font-size: 18px;
    color: #3e4850;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.5rem; }
  
  li {
    display: flex;
    align-items: flex-start;
    
    .icon-box {
      margin-top: 4px;
      margin-right: 1rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: #c6e7ff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #00658d;
    }
    
    h4 { font-weight: 700; color: #191c1e; font-size: 18px; margin-bottom: 4px; }
    p { color: #3e4850; font-size: 16px; }
  }
`;

const HowItWorks = () => {
  return (
    <Section id="how-it-works">
      <Container>
        <Grid>
          <ImageWrapper>
            <div className="main-img">
              <img src="/tooth2.jpg" alt="AI Dental Scanning Process" />
            </div>
          </ImageWrapper>
          
          <Content>
            <span className="badge">Simple Process</span>
            <h2>From Scan to <br />Perfect Smile.</h2>
            <p className="lead">Skip the waiting room. Get professional-grade dental consultation and treatment planning from the comfort of your home in just a few minutes.</p>
            <ul>
              <li>
                <div className="icon-box"><ScanFace size={16} /></div>
                <div>
                  <h4>1. Capture Your Scan</h4>
                  <p>Use your smartphone camera to easily capture a 3D model of your teeth and gums through our secure portal.</p>
                </div>
              </li>
              <li>
                <div className="icon-box"><Stethoscope size={16} /></div>
                <div>
                  <h4>2. Instant AI Diagnosis</h4>
                  <p>Our AI analyzes your scan instantly, providing treatment options, preparation steps, and cost breakdowns.</p>
                </div>
              </li>
            </ul>
          </Content>
        </Grid>
      </Container>
    </Section>
  );
};

export default HowItWorks;