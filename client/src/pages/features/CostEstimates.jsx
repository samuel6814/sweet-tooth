import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Calculator, ShieldCheck, Banknote } from 'lucide-react';

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
  @media (min-width: 768px) { padding: 12rem 2rem 6rem 2rem; }
`;

const Header = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 6vw, 5rem);
    color: #ff5722; /* Highlighting the cost aspect with the brand orange */
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
  gap: 2rem;
  
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
`;

const PricingCard = styled(motion.div)`
  background-color: #f7f9fb;
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e3e5;
  transition: transform 0.3s;

  &:hover { transform: translateY(-5px); }

  .icon-wrapper {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #ffeae3;
    color: #ff5722;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.2rem;
    color: #191c1e;
    margin: 0 0 1rem 0;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.05rem;
    color: #3e4850;
    line-height: 1.6;
    margin: 0;
  }
`;

const Banner = styled.div`
  margin-top: 4rem;
  background: linear-gradient(135deg, #00658d 0%, #004c6b 100%);
  border-radius: 2rem;
  padding: 4rem 2rem;
  text-align: center;
  color: white;

  h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }
  
  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const CostEstimates = () => {
  const cards = [
    {
      icon: <Calculator size={32} />,
      title: "Real-Time Calculations",
      text: "Our AI engine connects directly with regional dental pricing databases to generate real-time estimates based on your exact location and required treatments."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "No Hidden Fees",
      text: "We believe in 100% transparency. Your AI report breaks down costs by materials, labor, and clinic fees so you know exactly what you are paying for."
    },
    {
      icon: <Banknote size={32} />,
      title: "Insurance Integration",
      text: "Input your insurance provider during your scan, and our system will automatically calculate your out-of-pocket estimates versus covered costs."
    }
  ];

  return (
    <PageContainer>
      <Navbar />
      <Content>
        <Header>
          <h1>Transparent Pricing, No Surprises</h1>
          <p>Financial anxiety shouldn't keep you from a healthy smile. Sweet Tooth empowers you with highly accurate, location-based cost estimates before you ever step foot in a clinic.</p>
        </Header>

        <Grid>
          {cards.map((card, index) => (
            <PricingCard 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="icon-wrapper">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </PricingCard>
          ))}
        </Grid>

        <Banner>
          <h2>Ready to see your estimate?</h2>
          <p>Create a free account, scan your teeth in under 2 minutes, and receive your comprehensive financial breakdown instantly.</p>
        </Banner>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default CostEstimates;