import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
  max-width: 1400px;
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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(4, 1fr); }
`;

// Reusing the beautiful card styling from the homepage
const TreatmentCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.$bgColor || '#f2f4f6'};
  border-radius: 2rem;
  overflow: hidden; 
  text-decoration: none;
  color: inherit;
  height: 480px; 
  padding-top: 2.5rem;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  }
`;

const CardContent = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const CardTitle = styled.h3`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #191c1e;
  margin: 0 0 1.5rem 0;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #ffffff;
  color: #3e4850;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
`;

const CardImageWrapper = styled.div`
  margin-top: auto; 
  width: 100%;
  height: 220px; 
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const CardImage = styled.img`
  width: 90%;
  height: 100%;
  object-fit: contain;
  object-position: bottom; 
`;

const Treatments = () => {
  const treatments = [
    { id: "braces", title: "Braces", bgColor: "#f0f4f8", tags: ["Alignment", "Orthodontic"], imgSrc: "/braces-boy.webp", link: "/treatments/braces" },
    { id: "invisalign", title: "Clear Aligners", bgColor: "#e2e6fa", tags: ["Alignment", "Invisible"], imgSrc: "/invisialign-girl.webp", link: "/treatments/aligners" },
    { id: "whitening", title: "Teeth Whitening", bgColor: "#fff4d2", tags: ["Cosmetic", "Fast Results"], imgSrc: "/whitening-smile.webp", link: "/treatments/whitening" },
    { id: "veneers", title: "Porcelain Veneers", bgColor: "#ffedd5", tags: ["Cosmetic", "Premium"], imgSrc: "/veneers-3d.webp", link: "/treatments/veneers" },
    { id: "implants", title: "Dental Implants", bgColor: "#dcfce7", tags: ["Surgical", "Permanent"], imgSrc: "/implant-3d.webp", link: "/treatments/implants" },
    { id: "dentures", title: "Dentures", bgColor: "#ffe4e6", tags: ["Restorative", "Removable"], imgSrc: "/dentures-3d.webp", link: "/treatments/dentures" },
    { id: "fillings", title: "Cavity Fillings", bgColor: "#e0f2fe", tags: ["Preventative", "Quick"], imgSrc: "/filling-3d.webp", link: "/treatments/fillings" },
    { id: "wisdom", title: "Wisdom Teeth", bgColor: "#f3f4f6", tags: ["Extraction", "Surgical"], imgSrc: "/wisdom-tooth-3d.webp", link: "/treatments/wisdom-teeth" }
  ];

  return (
    <PageContainer>
      <Navbar />
      <Content>
        <Header>
          <h1>Comprehensive AI Treatment Pathways</h1>
          <p>Explore our full catalog of dental solutions. Once your AI scan is complete, we will match you with the exact pathways necessary to achieve your perfect smile.</p>
        </Header>

        <CardsGrid>
          {treatments.map((item, index) => (
            <TreatmentCard 
              key={item.id} 
              href={item.link} 
              $bgColor={item.bgColor}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <TagsContainer>
                  {item.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
                </TagsContainer>
              </CardContent>
              <CardImageWrapper>
                <CardImage src={item.imgSrc} alt={item.title} loading="lazy" decoding="async" />
              </CardImageWrapper>
            </TreatmentCard>
          ))}
        </CardsGrid>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default Treatments;