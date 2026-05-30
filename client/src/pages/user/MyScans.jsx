import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    color: #00658d;
    margin: 0 0 0.5rem 0;
    letter-spacing: 1px;
  }
  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.1rem;
    color: #3e4850;
    margin: 0;
  }

  button {
    background-color: #ff5722;
    color: white;
    border: none;
    border-radius: 9999px;
    padding: 0.6rem 1.5rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover { background-color: #f4511e; }
  }
`;

const ScansGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1200px) { grid-template-columns: repeat(3, 1fr); }
`;

const ScanCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 1.5rem;
  border: 1px solid #e0e3e5;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 101, 141, 0.08);
    border-color: #26b1ff;
  }
`;

const ScanImageMock = styled.div`
  height: 160px;
  background: linear-gradient(135deg, #e1f2ff 0%, #f7f9fb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8fa3b0;
  position: relative;

  .score-badge {
    position: absolute;
    bottom: -1rem;
    right: 1.5rem;
    background: #00658d;
    color: white;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem;
    border: 4px solid #ffffff;
  }
`;

const ScanDetails = styled.div`
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;

  .date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #8fa3b0;
    font-weight: 600;
  }

  .issues {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex: 1;

    div {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.9rem;
      color: #3e4850;
      line-height: 1.4;

      .warning { color: #f59e0b; flex-shrink: 0; margin-top: 2px;}
      .success { color: #10b981; flex-shrink: 0; margin-top: 2px;}
    }
  }

  .view-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 1rem;
    background: #f7f9fb;
    border: none;
    border-radius: 0.75rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    color: #00658d;
    cursor: pointer;
    transition: background 0.2s;

    &:hover { background: #e1f2ff; }
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const MyScans = () => {
  const [scans, setScans] = React.useState([]);

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/scans`)
      .then(res => res.json())
      .then(data => setScans(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageContainer>
      <Header>
        <div>
          <h1>My AI Scans</h1>
          <p>Track your oral health progress and review past diagnostic reports.</p>
        </div>
        <button>+ New Scan</button>
      </Header>

      <ScansGrid variants={containerVariants} initial="hidden" animate="visible">
        {scans.map((scan) => (
          <ScanCard key={scan.id} variants={itemVariants}>
            <ScanImageMock>
              <Activity size={48} opacity={0.2} />
              <div className="score-badge">{scan.score}</div>
            </ScanImageMock>
            <ScanDetails>
              <div className="date"><Calendar size={16} /> {scan.date}</div>
              <div className="issues">
                {scan.issues.map((issue, i) => (
                  <div key={`issue-${i}`}><AlertCircle size={16} className="warning"/> {issue}</div>
                ))}
                {scan.improvements.map((imp, i) => (
                  <div key={`imp-${i}`}><CheckCircle2 size={16} className="success"/> {imp}</div>
                ))}
              </div>
              <button className="view-btn">Full AI Report <ChevronRight size={18} /></button>
            </ScanDetails>
          </ScanCard>
        ))}
      </ScansGrid>
    </PageContainer>
  );
};

export default MyScans;