import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fb;
`;

const ContentContainer = styled.main`
  flex: 1;
  padding: 12rem 1.25rem 6rem 1.25rem;
  display: flex;
  justify-content: center;
`;

const TextBox = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: #ffffff;
  padding: 4rem;
  border-radius: 2rem;
  box-shadow: 0 10px 40px rgba(0, 101, 141, 0.05);

  @media (max-width: 768px) { padding: 2rem; }
`;

const PageTitle = styled.h1`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  color: #00658d;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
`;

const LastUpdated = styled.p`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.9rem;
  color: #ff5722;
  font-weight: 600;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SectionTitle = styled.h2`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #191c1e;
  margin: 2.5rem 0 1rem 0;
`;

const Text = styled.p`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1.05rem;
  color: #3e4850;
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const DataSecurity = () => {
  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <TextBox>
          <PageTitle>Data Security</PageTitle>
          <LastUpdated>Last Updated: May 2026</LastUpdated>

          <Text>
            Because we handle highly sensitive health and biometric data, security is the foundation of the Sweet Tooth platform. We employ enterprise-grade security measures to ensure your dental scans and personal information are protected.
          </Text>

          <SectionTitle>Encryption at Rest and in Transit</SectionTitle>
          <Text>
            All data transmitted between your browser and our servers is encrypted using industry-standard TLS 1.3. Once your dental scans and personal data reach our servers, they are encrypted at rest using AES-256 encryption.
          </Text>

          <SectionTitle>Healthcare Compliance</SectionTitle>
          <Text>
            Our data storage and processing pipelines are designed to be fully compliant with HIPAA (Health Insurance Portability and Accountability Act) and GDPR standards. Your scans are treated as Protected Health Information (PHI).
          </Text>

          <SectionTitle>AI Processing Privacy</SectionTitle>
          <Text>
            When your scans are processed by our AI algorithms, they are temporarily anonymized. The AI model analyzes the imagery without direct association to your personal identity. We do not use your personal scans to train public AI models without explicit, opt-in consent.
          </Text>

          <SectionTitle>Infrastructure Security</SectionTitle>
          <Text>
            Our backend infrastructure is hosted on secure, isolated cloud networks. We utilize strict role-based access control (RBAC), multi-factor authentication (MFA) for all internal systems, and conduct regular third-party penetration testing.
          </Text>
        </TextBox>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default DataSecurity;