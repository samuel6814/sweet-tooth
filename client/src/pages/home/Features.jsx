import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components ---

const Section = styled.section`
  padding: 6rem 0;
  background-color: #ffffff;
`;

const Container = styled.div`
  max-width: 1400px; 
  margin: 0 auto;
  padding: 0 1.25rem;
  
  @media (min-width: 768px) { padding: 0 2rem; }
  @media (min-width: 1024px) { padding: 0 4rem; }
`;

const Header = styled.div`
  text-align: center;
  max-width: 48rem;
  margin: 0 auto 4rem;

  .badge {
    display: inline-block;
    padding: 6px 20px;
    border-radius: 9999px;
    background-color: #e1f2ff;
    color: #00658d;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    color: #00658d;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    @media (min-width: 768px) { font-size: 64px; }
  }
  
  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 18px;
    color: #3e4850;
    line-height: 1.6;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) { 
    grid-template-columns: repeat(2, 1fr); 
  }
  @media (min-width: 1024px) { 
    /* Automatically creates new rows as we add more items */
    grid-template-columns: repeat(4, 1fr); 
  }
`;

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

// --- Animation Variants ---

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 60, damping: 15 }
  }
};

const Features = () => {
  // Expanded Data array with 8 treatments
  const treatments = [
    {
      id: "braces",
      title: "Braces",
      bgColor: "#f0f4f8", // Light gray/blue
      tags: ["Alignment", "Orthodontic", "Long-term"],
      imgSrc: "/braces-boy.webp", 
      link: "/treatments/braces"
    },
    {
      id: "invisalign",
      title: "Clear Aligners",
      bgColor: "#e2e6fa", // Light purple
      tags: ["Alignment", "Invisible", "Removable"],
      imgSrc: "/invisialign-girl.webp", 
      link: "/treatments/aligners"
    },
    {
      id: "whitening",
      title: "Teeth Whitening",
      bgColor: "#fff4d2", // Soft pastel yellow
      tags: ["Cosmetic", "Fast Results", "Non-invasive"],
      imgSrc: "/whitening-smile.webp", 
      link: "/treatments/whitening"
    },
    {
      id: "veneers",
      title: "Porcelain Veneers",
      bgColor: "#ffedd5", // Soft peach
      tags: ["Cosmetic", "Restorative", "Premium"],
      imgSrc: "/veneers-3d.webp", 
      link: "/treatments/veneers"
    },
    {
      id: "implants",
      title: "Dental Implants",
      bgColor: "#dcfce7", // Light mint/cyan
      tags: ["Surgical", "Permanent", "Replacement"],
      imgSrc: "/implant-3d.webp", 
      link: "/treatments/implants"
    },
    {
      id: "dentures",
      title: "Dentures",
      bgColor: "#ffe4e6", // Light pink
      tags: ["Restorative", "Removable", "Full/Partial"],
      imgSrc: "/dentures-3d.webp", 
      link: "/treatments/dentures"
    },
    {
      id: "fillings",
      title: "Cavity Fillings",
      bgColor: "#e0f2fe", // Light sky blue
      tags: ["General care", "Preventative", "Quick"],
      imgSrc: "/filling-3d.webp", 
      link: "/treatments/fillings"
    },
    {
      id: "wisdom",
      title: "Wisdom Teeth",
      bgColor: "#f3f4f6", // Cool light gray
      tags: ["Extraction", "Surgical", "Pain Relief"],
      imgSrc: "/wisdom-tooth-3d.webp", 
      link: "/treatments/wisdom-teeth"
    }
  ];

  return (
    <Section id="treatments">
      <Container>
        <Header>
          <span className="badge">AI Treatment Pathways</span>
          <h2>Discover Your Perfect Smile</h2>
          <p>
            Our advanced AI scans your teeth to recommend the most effective treatments. 
            Select a pathway below to view detailed preparation guides, timelines, and instant cost estimates.
          </p>
        </Header>

        <CardsGrid
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {treatments.map((item) => (
            <TreatmentCard 
              key={item.id} 
              href={item.link} 
              $bgColor={item.bgColor}
              variants={cardVariant}
            >
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <TagsContainer>
                  {item.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </CardContent>
              
              <CardImageWrapper>
                <CardImage src={item.imgSrc} alt={`${item.title} treatment illustration`} loading="lazy" decoding="async" />
              </CardImageWrapper>
            </TreatmentCard>
          ))}
        </CardsGrid>
      </Container>
    </Section>
  );
};

export default Features;