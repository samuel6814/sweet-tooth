import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// --- Styled Components ---

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fb;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Massive top padding to account for the floating navbar */
  padding: 10rem 1.25rem 6rem 1.25rem;
  
  @media (min-width: 768px) { padding: 12rem 2rem 6rem 2rem; }
`;

const AuthBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  background-color: #ffffff;
  border-radius: 2rem;
  box-shadow: 0 20px 50px rgba(0, 101, 141, 0.08);
  overflow: hidden;
  min-height: 600px;
`;

const ImageSide = styled.div`
  display: none;
  flex: 1;
  position: relative;
  background-color: #e1f2ff;
  
  @media (min-width: 900px) {
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 101, 141, 0.7), transparent);
    z-index: 1;
  }

  .text-content {
    position: absolute;
    bottom: 3rem;
    left: 3rem;
    right: 3rem;
    z-index: 2;
    color: white;

    h2 {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 3rem;
      margin-bottom: 0.5rem;
      letter-spacing: 1px;
    }
    p {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 1.1rem;
      line-height: 1.5;
      opacity: 0.9;
    }
  }
`;

const FormSide = styled.div`
  flex: 1;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) { padding: 4rem; }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 2px solid #e0e3e5;
  margin-bottom: 2.5rem;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => (props.$active ? '#00658d' : '#8fa3b0')};
  padding-bottom: 1rem;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #ff5722; /* Orange accent */
    border-radius: 3px 3px 0 0;
    transform: scaleX(${(props) => (props.$active ? 1 : 0)});
    transition: transform 0.3s ease;
    transform-origin: left;
  }

  &:hover {
    color: #00658d;
  }
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #3e4850;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid #bdc8d1;
  border-radius: 1rem;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1rem;
  color: #191c1e;
  background-color: #f7f9fb;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #26b1ff;
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(38, 177, 255, 0.1);
  }

  &::placeholder {
    color: #a0aab2;
  }
`;

const SubmitButton = styled(motion.button)`
  margin-top: 1rem;
  width: 100%;
  padding: 1.2rem;
  background-color: #ff5722;
  color: #ffffff;
  border: none;
  border-radius: 1rem;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 10px 20px rgba(255, 87, 34, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f4511e;
  }
`;

const ForgotPassword = styled.a`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.9rem;
  color: #00658d;
  text-align: right;
  text-decoration: none;
  font-weight: 600;
  margin-top: -0.5rem;
  
  &:hover { text-decoration: underline; }
`;

// --- Animation Variants ---
const formVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary console log, will be replaced with better-auth logic later
    console.log(`${activeTab} form submitted`);
  };

  return (
    <PageContainer>
      <Navbar />
      
      <MainContent>
        <AuthBox>
          <ImageSide>
            <img src="/login-image.png" alt="Smiling patient showing perfect teeth" />
            <div className="overlay" />
            <div className="text-content">
              <h2>Your Perfect Smile Awaits</h2>
              <p>Log in to access your personalized AI dental scans, treatment progress, and clinical cost estimates.</p>
            </div>
          </ImageSide>

          <FormSide>
            <TabsContainer>
              <TabButton 
                $active={activeTab === 'login'} 
                onClick={() => setActiveTab('login')}
              >
                Log In
              </TabButton>
              <TabButton 
                $active={activeTab === 'signup'} 
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </TabButton>
            </TabsContainer>

            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <Form 
                  key="login-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleSubmit}
                >
                  <InputGroup>
                    <label>Email Address</label>
                    <Input type="email" placeholder="hello@example.com" required />
                  </InputGroup>
                  <InputGroup>
                    <label>Password</label>
                    <Input type="password" placeholder="••••••••" required />
                  </InputGroup>
                  <ForgotPassword href="#">Forgot your password?</ForgotPassword>
                  
                  <SubmitButton whileTap={{ scale: 0.98 }}>
                    Sign In <ArrowRight size={20} />
                  </SubmitButton>
                </Form>
              ) : (
                <Form 
                  key="signup-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleSubmit}
                >
                  <InputGroup>
                    <label>Full Name</label>
                    <Input type="text" placeholder="John Doe" required />
                  </InputGroup>
                  <InputGroup>
                    <label>Email Address</label>
                    <Input type="email" placeholder="hello@example.com" required />
                  </InputGroup>
                  <InputGroup>
                    <label>Password</label>
                    <Input type="password" placeholder="Create a strong password" required />
                  </InputGroup>
                  
                  <SubmitButton whileTap={{ scale: 0.98 }}>
                    Create Account <ArrowRight size={20} />
                  </SubmitButton>
                </Form>
              )}
            </AnimatePresence>
          </FormSide>
        </AuthBox>
      </MainContent>

      <Footer />
    </PageContainer>
  );
};

export default Auth;