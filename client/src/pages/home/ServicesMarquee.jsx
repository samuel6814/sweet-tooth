import React from 'react';
import styled, { keyframes } from 'styled-components';

// --- Animation ---
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// --- Styled Components ---
const MarqueeContainer = styled.div`
  width: 100%;
  background: #c6e7ff; /* Soft light blue matching the reference */
  padding: 1.5rem 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  /* 30s duration is a good speed, linear keeps it constant, infinite loops it */
  animation: ${scroll} 30s linear infinite;

  /* Pause the marquee when the user hovers over it */
  &:hover {
    animation-play-state: paused;
  }
`;

const MarqueeGroup = styled.div`
  display: flex;
  align-items: center;
`;

const ServiceText = styled.span`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 2.5rem;
  color: #001e2d; /* Very dark blue/black for high contrast */
  font-weight: 400;
  white-space: nowrap;
`;

const Separator = styled.span`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 2.5rem;
  color: #001e2d;
  font-weight: 300;
  margin: 0 3rem; /* Spacing between the text and the plus signs */
  user-select: none;
`;

const ServicesMarquee = () => {
  // Array of your AI / Dental services
  const services = [
    "Braces",
    "Dental Care",
    "Dentist",
    "Dentures",
    "AI Scan",
    "Teeth Whitening",
    "Clear Aligners",
    "Consultation"
  ];

  // We render the list twice so that when it scrolls to the end of the first list, 
  // the second list is fully visible, and the jump back to 0% is invisible to the user.
  return (
    <MarqueeContainer>
      <MarqueeTrack>
        {/* First Set */}
        <MarqueeGroup>
          {services.map((service, index) => (
            <React.Fragment key={`set1-${index}`}>
              <ServiceText>{service}</ServiceText>
              <Separator>+</Separator>
            </React.Fragment>
          ))}
        </MarqueeGroup>

        {/* Second Set (Duplicate for seamless loop) */}
        <MarqueeGroup>
          {services.map((service, index) => (
            <React.Fragment key={`set2-${index}`}>
              <ServiceText>{service}</ServiceText>
              <Separator>+</Separator>
            </React.Fragment>
          ))}
        </MarqueeGroup>
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default ServicesMarquee;