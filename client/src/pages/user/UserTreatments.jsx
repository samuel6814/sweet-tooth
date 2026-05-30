import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClipboardList, Clock, ArrowRight, Bookmark } from 'lucide-react';
import Currency from '../../components/Currency'; // Reusing our component!

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

const SectionTitle = styled.h2`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #191c1e;
  margin: 1rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 2px solid #e0e3e5;
  padding-bottom: 0.75rem;
`;

const TreatmentList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TreatmentCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e0e3e5;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 101, 141, 0.05);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.8rem;
    color: #191c1e;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #8fa3b0;

    span {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }

  .status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    width: fit-content;
    margin-top: 0.5rem;

    &.active { background: #e1f2ff; color: #00658d; }
    &.saved { background: #f2f4f6; color: #3e4850; }
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) { align-items: flex-end; }

  .cost {
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: #ff5722;
    margin: 0;
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: #00658d;
    color: white;
    text-decoration: none;
    border-radius: 9999px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    transition: background 0.2s;

    &:hover { background: #004c6b; }
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const UserTreatments = () => {
  return (
    <PageContainer>
      <Header>
        <h1>Treatment Plans</h1>
        <p>Review the pathways recommended by your AI consultations.</p>
      </Header>

      <SectionTitle>Active Research</SectionTitle>
      <TreatmentList variants={containerVariants} initial="hidden" animate="visible">
        
        <TreatmentCard variants={itemVariants}>
          <Info>
            <h3>Orthodontic Braces</h3>
            <div className="meta">
              <span><Clock size={16} /> 12 - 24 Months</span>
              <span><ClipboardList size={16} /> Alignment</span>
            </div>
            <div className="status active">Consultation In Progress</div>
          </Info>
          <ActionArea>
            <p className="cost">Est: <Currency amount={15000} /> - <Currency amount={45000} /></p>
            <Link to="/treatments/braces">Resume AI Chat <ArrowRight size={16} /></Link>
          </ActionArea>
        </TreatmentCard>

      </TreatmentList>

      <SectionTitle style={{ marginTop: '2rem' }}>Saved for Later</SectionTitle>
      <TreatmentList variants={containerVariants} initial="hidden" animate="visible">
        
        <TreatmentCard variants={itemVariants}>
          <Info>
            <h3>Teeth Whitening</h3>
            <div className="meta">
              <span><Clock size={16} /> 1 - 2 Hours</span>
              <span><Bookmark size={16} /> Cosmetic</span>
            </div>
            <div className="status saved">Saved from May 15 Scan</div>
          </Info>
          <ActionArea>
            <p className="cost">Est: <Currency amount={800} /> - <Currency amount={2500} /></p>
            <Link to="/treatments/whitening" style={{ background: '#f2f4f6', color: '#191c1e' }}>
              View Details <ArrowRight size={16} />
            </Link>
          </ActionArea>
        </TreatmentCard>

      </TreatmentList>
    </PageContainer>
  );
};

export default UserTreatments;