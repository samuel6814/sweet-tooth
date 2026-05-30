import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Hero from './Hero';
import Features from './Features'; 
import HowItWorks from './HowItWorks'; 
import Footer from '../../components/Footer';
import ServicesMarquee from './ServicesMarquee';

const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fb; 
  width: 100%;
  overflow-x: hidden; 
`;

const Content = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HomeLayout = () => {
  return (
    <PageContainer>
      <Navbar />
      <Content>
        <Hero />
        <ServicesMarquee/>
        <Features />
        <HowItWorks />
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default HomeLayout;