import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Camera, Cpu, FileCheck } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fb;
`;

const Content = styled.main`
  flex: 1;
  padding: 10rem 1.25rem 6rem 1.25rem;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 768px) { padding: 12rem 2rem 6rem 2rem; }
`;

const Header = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 6vw, 5rem);
    color: #00658d;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  @media (min-width: 1024px) { grid-template-columns: 1fr 1fr; }
`;

const ImageWrapper = styled(motion.div)`
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 101, 141, 0.1);
  height: 600px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const StepItem = styled(motion.div)`
  display: flex;
  gap: 1.5rem;

  .icon-box {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    background-color: #e1f2ff;
    color: #00658d;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    color: #191c1e;
    margin: 0 0 0.5rem 0;
    letter-spacing: 0.5px;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.05rem;
    color: #3e4850;
    line-height: 1.6;
    margin: 0;
  }
`;

const HowItWorks = () => {
  return (
    <PageContainer>
      <Navbar />
      <Content>
        <Header>
          <h1>The Journey to Your Perfect Smile</h1>
          <p>Skip the waiting room. Sweet Tooth combines advanced AI with your smartphone camera to deliver professional-grade dental consultation from the comfort of your home.</p>
        </Header>

        <Grid>
          <ImageWrapper initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <img src="/tooth2.jpg" alt="Person scanning teeth" />
          </ImageWrapper>

          <StepsList>
            <StepItem initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="icon-box"><Camera size={32} /></div>
              <div>
                <h3>1. Capture Your Scan</h3>
                <p>Using our secure web app, follow the on-screen guide to capture a 3D sweep of your upper and lower arches using your smartphone camera. It takes less than 2 minutes.</p>
              </div>
            </StepItem>
            
            <StepItem initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="icon-box"><Cpu size={32} /></div>
              <div>
                <h3>2. Instant AI Diagnosis</h3>
                <p>Our proprietary AI engine instantly processes your images, mapping out alignment issues, plaque buildup, and aesthetic opportunities with 99% accuracy.</p>
              </div>
            </StepItem>

            <StepItem initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <div className="icon-box"><FileCheck size={32} /></div>
              <div>
                <h3>3. Get Your Treatment Plan</h3>
                <p>Receive a comprehensive digital report detailing your recommended treatments, step-by-step preparation guides, timelines, and accurate cost estimates.</p>
              </div>
            </StepItem>
          </StepsList>
        </Grid>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default HowItWorks;