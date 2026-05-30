import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UploadCloud, Camera, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScanBox = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  background: #ffffff;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 101, 141, 0.08);
  border: 1px solid #e0e3e5;
  text-align: center;

  @media (max-width: 768px) { padding: 2rem 1.5rem; }
`;

const Header = styled.div`
  margin-bottom: 2.5rem;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    color: #00658d;
    margin: 0 0 0.5rem 0;
    letter-spacing: 1px;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.1rem;
    color: #3e4850;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.5;
  }
`;

const Dropzone = styled.div`
  border: 3px dashed ${(props) => (props.$isDragging ? '#ff5722' : '#bdc8d1')};
  background-color: ${(props) => (props.$isDragging ? '#fff6f3' : '#fcfdfd')};
  border-radius: 1.5rem;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #26b1ff;
    background-color: #e1f2ff;
  }

  .icon-group {
    display: flex;
    gap: 1rem;
    color: #00658d;
  }

  h3 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #191c1e;
    margin: 0;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    color: #8fa3b0;
    margin: 0;
  }

  .primary-btn {
    background: #ff5722;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 9999px;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover { background: #f4511e; }
  }
`;

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e3e5;

  .badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #8fa3b0;
    font-weight: 600;
  }
`;

const NewScan = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    startMockAnalysis();
  };

  const startMockAnalysis = () => {
    setIsAnalyzing(true);
    // In a real app, this would upload the file to your backend
    setTimeout(() => {
      alert("Scan complete! Redirecting to results...");
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <PageContainer>
      <Navbar />
      <Content>
        <ScanBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header>
            <h1>Start Your Free AI Scan</h1>
            <p>Get instant insights on your oral health, treatment options, and cost estimates in seconds.</p>
          </Header>

          {isAnalyzing ? (
            <Dropzone style={{ borderColor: '#26b1ff', backgroundColor: '#e1f2ff' }}>
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                style={{ color: '#00658d' }}
              >
                <Sparkles size={48} />
              </motion.div>
              <h3>Analyzing your smile...</h3>
              <p>Our AI is cross-referencing thousands of dental data points.</p>
            </Dropzone>
          ) : (
            <Dropzone 
              $isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={startMockAnalysis}
            >
              <div className="icon-group">
                <UploadCloud size={48} />
                <Camera size={48} />
              </div>
              <div>
                <h3>Drag & Drop your photo here</h3>
                <p>or click to browse your files</p>
              </div>
              <button className="primary-btn">
                <Camera size={18} /> Take Photo Now
              </button>
            </Dropzone>
          )}

          <TrustBadges>
            <div className="badge"><ShieldCheck size={18} color="#10b981" /> HIPAA Compliant</div>
            <div className="badge"><ShieldCheck size={18} color="#10b981" /> End-to-End Encrypted</div>
          </TrustBadges>

        </ScanBox>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default NewScan;