import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const Content = styled.main`
  flex: 1;
  padding: 10rem 1.25rem 6rem 1.25rem;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) { padding: 12rem 2rem 6rem 2rem; }
`;

const Header = styled.div`
  text-align: center;
  max-width: 900px;
  margin-bottom: 4rem;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 6vw, 5.5rem);
    color: #26b1ff;
    line-height: 1;
    margin-bottom: 1.5rem;
    letter-spacing: 1px;
  }
  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.2rem;
    color: #3e4850;
    line-height: 1.6;
  }
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  
  @media (min-width: 1024px) { grid-template-columns: 1fr 1fr; }
`;

const GraphicContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  position: relative;

  .glow {
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(38,177,255,0.2) 0%, transparent 70%);
    z-index: 0;
  }

  img {
    width: 80%;
    max-width: 500px;
    z-index: 1;
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1));
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: #f7f9fb;
  padding: 2rem;
  border-radius: 1.5rem;
  border-left: 4px solid #26b1ff;

  h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    color: #00658d;
    margin: 0 0 0.5rem 0;
  }
  
  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.05rem;
    color: #3e4850;
    line-height: 1.6;
    margin: 0;
  }
`;

const AIAnalysis = () => {
  return (
    <PageContainer>
      <Navbar />
      <Content>
        <Header>
          <h1>Powered by Advanced Dental AI</h1>
          <p>Trained on millions of clinical dental images, our proprietary AI engine acts as a highly specialized consultant, capable of identifying orthodontic and cosmetic needs with extreme precision.</p>
        </Header>

        <AnalysisGrid>
          <TextContent>
            <FeatureCard>
              <h3>Computer Vision Accuracy</h3>
              <p>Our algorithms utilize deep learning computer vision to detect micro-variations in tooth alignment, color, and spacing, achieving a 99% accuracy rate compared to traditional clinical visual inspections.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Predictive Modeling</h3>
              <p>Curious what you'll look like post-treatment? The AI generates a realistic, 3D predictive model of your future smile before you ever commit to a procedure or aligner plan.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Secure & Anonymized</h3>
              <p>Your biometric data is encrypted at rest and in transit. During the AI analysis phase, your images are completely anonymized, ensuring your health privacy is never compromised.</p>
            </FeatureCard>
          </TextContent>
          
          <GraphicContainer initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="glow" />
            <img src="/tooth1.webp" alt="3D Tooth AI Analysis" loading="lazy" decoding="async" />
          </GraphicContainer>
        </AnalysisGrid>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default AIAnalysis;