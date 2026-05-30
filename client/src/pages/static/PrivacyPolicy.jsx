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
  flex: 1; /* Pushes the footer to the bottom */
  padding: 12rem 1.25rem 6rem 1.25rem; /* Generous top padding for floating navbar */
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

  @media (max-width: 768px) {
    padding: 2rem;
  }
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

const PrivacyPolicy = () => {
  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <TextBox>
          <PageTitle>Privacy Policy</PageTitle>
          <LastUpdated>Last Updated: May 2026</LastUpdated>

          <Text>
            At Sweet Tooth, we are committed to protecting your personal information and your right to privacy. This Privacy Policy governs the privacy policies and practices of our website and AI dental scanning platform.
          </Text>

          <SectionTitle>1. Information We Collect</SectionTitle>
          <Text>
            When you use our platform, we collect personal data that you voluntarily provide to us, including your name, email address, and payment information. Most importantly, we collect the dental scans and images you upload for AI analysis.
          </Text>

          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <Text>
            The primary use of your dental scans is to provide you with an AI-generated dental assessment, treatment recommendations, and cost estimates. Your data is processed securely to generate these personalized insights.
          </Text>

          <SectionTitle>3. Data Retention</SectionTitle>
          <Text>
            We retain your personal information and dental scans only for as long as is necessary for the purposes set out in this Privacy Policy, complying with standard healthcare data retention laws.
          </Text>

          <SectionTitle>4. Sharing of Information</SectionTitle>
          <Text>
            We do not sell your personal data. We only share your information with licensed partner clinics if you explicitly request a consultation or appointment booking through our platform.
          </Text>
        </TextBox>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default PrivacyPolicy;