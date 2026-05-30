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

const TermsOfService = () => {
  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <TextBox>
          <PageTitle>Terms of Service</PageTitle>
          <LastUpdated>Last Updated: May 2026</LastUpdated>

          <Text>
            Welcome to Sweet Tooth. By accessing or using our website, AI scanning tools, and services, you agree to be bound by these Terms of Service.
          </Text>

          <SectionTitle>1. Medical Disclaimer</SectionTitle>
          <Text>
            <strong>Sweet Tooth's AI analysis is for informational and educational purposes only.</strong> It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your dentist or other qualified health provider with any questions you may have regarding a medical condition.
          </Text>

          <SectionTitle>2. Account Responsibilities</SectionTitle>
          <Text>
            To use the scanning features, you must register for an account. You are entirely responsible for maintaining the confidentiality of your password and account, and for any and all activities that occur under your account.
          </Text>

          <SectionTitle>3. Accuracy of AI Estimates</SectionTitle>
          <Text>
            While our AI models boast a 99% accuracy rate in pattern recognition, treatment cost estimates and timelines are approximate. Final clinical decisions and pricing are determined by licensed dental professionals during an in-person consultation.
          </Text>

          <SectionTitle>4. User Conduct</SectionTitle>
          <Text>
            You agree to only upload scans of your own teeth or the teeth of a minor for whom you are the legal guardian. Uploading false, misleading, or inappropriate images will result in immediate account termination.
          </Text>
        </TextBox>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default TermsOfService;