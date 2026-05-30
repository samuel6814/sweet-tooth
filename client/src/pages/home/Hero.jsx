import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Styled Components ---

const SectionWrapper = styled.section`
  width: 100%;
  padding: 7rem 1.5rem 10rem 1.5rem; 
  background-color: #ffffff; 
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden; 
`;

const Frame = styled(motion.div)`
  width: 100%; 
  min-height: 75vh;
  
  /* Split Gradient Background */
  background: linear-gradient(90deg, #e1f2ff 0%, #d4ebfd 38%, #ffffff 42%, #ffffff 100%);
  
  border-radius: 30px; 
  position: relative; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 3rem; 
  box-sizing: border-box;

  @media (max-width: 1024px) {
    background: linear-gradient(180deg, #e1f2ff 0%, #d4ebfd 30%, #ffffff 40%, #ffffff 100%);
  }
`;

const HeadlineWrapper = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const FadingHeadline = styled(motion.h1)`
  /* SWITCHED TO BEBAS NEUE FOR THE TALL, CONDENSED LOOK */
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400; /* Bebas Neue is naturally thick, so 400 is standard */
  
  /* Because the font is narrower, we can make it massive again! */
  font-size: clamp(4rem, 12vw, 13rem); 
  
  color: #26b1ff; /* Bright cyan/blue matching the image */
  margin: 0;
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: 2px;
  white-space: nowrap;
  
  /* Slight vertical stretch to perfectly match the proportions in your image */
  transform: scaleY(1.1);
  transform-origin: bottom;
  
  /* The fading/disappearing mask effect */
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%, black 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 20%, black 100%);
`;

const ContentGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
  z-index: 12;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 22rem; 
  }
`;

const LeftSide = styled(motion.div)`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  z-index: 12;

  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
    text-align: center;
  }
`;

const InfoBubble = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1.05rem;
  color: #333;
  line-height: 1.6;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -15px; 
    top: 50%;
    transform: translateY(-50%);
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid #ffffff;

    @media (max-width: 1024px) {
      display: none; 
    }
  }
`;

const OpenHours = styled.div`
  font-family: 'Hanken Grotesk', sans-serif;
  .label {
    font-weight: 700;
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.25rem;
  }
  .time {
    font-weight: 500;
    font-size: 1rem;
    color: #191c1e;
  }
`;

const CtaButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2.5rem;
  background-color: #ff5722; 
  color: #ffffff;
  border-radius: 9999px;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(255, 87, 34, 0.3);
  cursor: pointer;
  width: fit-content;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

const ToothGraphic = styled(motion.img)`
  position: absolute;
  /* Using your manual 30% adjustment for perfect positioning */
  left: 30%;
  transform: translateX(-50%);
  bottom: -10rem; 
  height: 85vh; 
  max-height: 800px;
  width: auto;
  z-index: 10; 
  pointer-events: none;
  filter: drop-shadow(0 30px 40px rgba(0, 101, 141, 0.15));

  @media (max-width: 1024px) {
    height: 55vh;
    bottom: -4rem;
    left: 50%; 
  }
`;

const RightSide = styled(motion.div)`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  z-index: 12;
  align-items: flex-end; 

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Hanken Grotesk', sans-serif;
  text-align: right; 
  
  @media (max-width: 1024px) {
    text-align: center;
  }

  .number {
    font-family: 'Poppins', sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: #ff5722; 
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
  }
`;

// --- Animation Variants ---

const textVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: "easeOut" } 
  }
};

const popVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 60, damping: 15, delay: 0.4 } 
  }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom * 0.2 }
  })
};

const Hero = () => {
  return (
    <SectionWrapper>
      <Frame
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeadlineWrapper>
          <FadingHeadline
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            EVERY SMILE MATTERS
          </FadingHeadline>
        </HeadlineWrapper>

        <ToothGraphic 
          src="/tooth1.png" 
          alt="Dental Care Splashing Tooth" 
          variants={popVariants}
          initial="hidden"
          animate="visible"
        />

        <ContentGrid>
          <LeftSide>
            <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
              <InfoBubble>
                Experience the future of dentistry. Scan your teeth from your phone to get instant treatment recommendations, cost estimates, and personalized oral care plans.
              </InfoBubble>
            </motion.div>
            
            <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible">
              <OpenHours>
                <div className="label">Always Available</div>
                <div className="time">24/7 AI Analysis</div>
              </OpenHours>
            </motion.div>

            <CtaButton 
              href="/dashboard"
              custom={5} 
              variants={fadeUpVariants} 
              initial="hidden" 
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SCAN YOUR TEETH NOW <ArrowUpRight size={22} style={{ marginLeft: '10px' }} />
            </CtaButton>
          </LeftSide>

          <RightSide>
            <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
              <StatItem>
                <span className="number">99%</span>
                <span className="label">Scan Accuracy</span>
              </StatItem>
            </motion.div>
            
            <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible">
              <StatItem>
                <span className="number">Instant</span>
                <span className="label">Cost Estimates</span>
              </StatItem>
            </motion.div>

            <motion.div custom={5} variants={fadeUpVariants} initial="hidden" animate="visible">
              <StatItem>
                <span className="number">50+</span>
                <span className="label">Treatment Plans</span>
              </StatItem>
            </motion.div>
          </RightSide>
        </ContentGrid>
      </Frame>
    </SectionWrapper>
  );
};

export default Hero;