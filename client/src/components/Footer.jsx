import React from 'react';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #ffffff;
  padding: 48px 0;
  border-top: 1px solid #e6e8ea;
  font-family: 'Hanken Grotesk', sans-serif;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) { 
    padding: 0 2rem; 
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1024px) { padding: 0 4rem; }
`;

const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    color: #191c1e;
    letter-spacing: -0.02em;
  }
  p { font-size: 14px; color: #3e4850; }
`;

const LinksCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 768px) { grid-column: span 2; flex-direction: row; justify-content: space-around; }

  .link-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  a {
    font-size: 16px;
    color: #3e4850;
    text-decoration: none;
    transition: transform 0.2s, color 0.2s;
    &:hover { color: #00658d; transform: translateX(4px); }
  }
  
  a.highlight {
    color: #ff5722; /* Updated to match the orange brand color */
    font-weight: 700;
    display: flex;
    align-items: center;
    
    &:hover { color: #f4511e; }
  }
`;

const ActionCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  
  @media (min-width: 768px) { align-items: flex-end; justify-content: space-between; }
  
  button {
    padding: 0.5rem 1.5rem;
    background-color: #e1f2ff;
    color: #00658d;
    border: none;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover { background-color: #c6e7ff; }
  }
  
  p {
    font-size: 14px;
    color: #3e4850;
    @media (min-width: 768px) { text-align: right; }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <BrandCol>
          <h3>SWEET TOOTH</h3>
          <p>Your personal AI dental consultant. Get instant scans, treatment plans, and cost estimates from the comfort of your home.</p>
        </BrandCol>
        
        <LinksCol>
          <div className="link-group">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/security">Data Security</Link>
          </div>
          <div className="link-group">
            <Link to="/login">Patient Portal</Link>
            <Link to="/login" className="highlight">
              Start Free Scan <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </Link>
          </div>
        </LinksCol>
        
        <ActionCol>
          <button>Contact Support</button>
          <p>© {new Date().getFullYear()} Sweet Tooth AI.<br />All Rights Reserved.</p>
        </ActionCol>
      </Container>
    </FooterContainer>
  );
};

export default Footer;