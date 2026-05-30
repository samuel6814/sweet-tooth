import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wallet, ShieldCheck, FileText } from 'lucide-react';
import Currency from '../../components/Currency';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const Header = styled.div`
  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    color: #00658d;
    margin: 0 0 0.5rem 0;
    letter-spacing: 1px;
  }
  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.1rem;
    color: #3e4850;
    margin: 0;
  }
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 768px) { grid-template-columns: 1fr 1fr; }
`;

const SummaryCard = styled(motion.div)`
  background: ${(props) => props.$primary ? 'linear-gradient(135deg, #ff5722 0%, #d84315 100%)' : '#ffffff'};
  color: ${(props) => props.$primary ? '#ffffff' : '#191c1e'};
  border: ${(props) => props.$primary ? 'none' : '1px solid #e0e3e5'};
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${(props) => props.$primary ? 'rgba(255,255,255,0.9)' : '#3e4850'};
  }

  .amount {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3rem;
    margin: 0;
    line-height: 1;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    margin: 0;
    opacity: 0.9;
  }
`;

const EstimatesList = styled(motion.div)`
  background: #ffffff;
  border-radius: 1.5rem;
  border: 1px solid #e0e3e5;
  overflow: hidden;
`;

const EstimateRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e3e5;

  &:last-child { border-bottom: none; }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .info {
    h4 {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: #191c1e;
      margin: 0 0 0.25rem 0;
    }
    span {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.9rem;
      color: #8fa3b0;
    }
  }

  .cost-details {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .price {
      font-family: 'Hanken Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.2rem;
      color: #00658d;
    }

    button {
      background: #f2f4f6;
      border: none;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #3e4850;
      cursor: pointer;
      transition: background 0.2s;
      &:hover { background: #e1f2ff; color: #00658d; }
    }
  }
`;

const UserFinance = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <Header>
        <h1>Financial Estimates</h1>
        <p>Review the predicted costs for your AI-recommended treatments.</p>
      </Header>

      <TopGrid>
        <SummaryCard $primary initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3><Wallet size={20} /> Total Estimated Pathway</h3>
          <p className="amount"><Currency amount={3000} /> - <Currency amount={20000} /></p>
          <p>Based on your active Braces consultation in Kumasi.</p>
        </SummaryCard>
        
        <SummaryCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3><ShieldCheck size={20} color="#10b981" /> Insurance Status</h3>
          <p className="amount" style={{ fontSize: '2rem', fontFamily: 'Hanken Grotesk', fontWeight: '700', color: '#191c1e' }}>
            National Health Insurance (NHIS)
          </p>
          <p style={{ color: '#f59e0b', fontWeight: '600' }}>Note: Orthodontics generally not fully covered.</p>
        </SummaryCard>
      </TopGrid>

      <h2 style={{ fontFamily: 'Hanken Grotesk', fontSize: '1.2rem', marginTop: '1rem', color: '#191c1e' }}>Saved Breakdowns</h2>
      
      <EstimatesList initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <EstimateRow>
          <div className="info">
            <h4>Orthodontic Braces</h4>
            <span>Generated: May 15, 2026</span>
          </div>
          <div className="cost-details">
            <span className="price"><Currency amount={3000} /> - <Currency amount={20000} /></span>
            <button title="View Breakdown" onClick={() => navigate('/treatments/braces')}><FileText size={18} /></button>
          </div>
        </EstimateRow>
        
        <EstimateRow>
          <div className="info">
            <h4>Teeth Whitening</h4>
            <span>Generated: May 15, 2026</span>
          </div>
          <div className="cost-details">
            <span className="price"><Currency amount={800} /> - <Currency amount={2500} /></span>
            <button title="View Breakdown" onClick={() => navigate('/treatments/whitening')}><FileText size={18} /></button>
          </div>
        </EstimateRow>
      </EstimatesList>

    </PageContainer>
  );
};

export default UserFinance;