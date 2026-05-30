import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { authClient } from '../../lib/auth';
import { 
  UploadCloud, 
  Camera, 
  Activity, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';

// --- Styled Components ---

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const Header = styled.div`
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
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 1.5rem;
  border: 1px solid #e0e3e5;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 101, 141, 0.02);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    box-shadow: 0 10px 24px rgba(0, 101, 141, 0.06);
  }

  /* Specific Card Spans */
  &.span-2 {
    @media (min-width: 768px) { grid-column: span 2; }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #191c1e;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  a {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #26b1ff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    &:hover { text-decoration: underline; }
  }
`;

// --- Specific Widget Styles ---

const UploadWidget = styled.div`
  flex: 1;
  border: 2px dashed #bdc8d1;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  background-color: #f7f9fb;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #ff5722;
    background-color: #fff6f3;
    
    .icon-wrapper {
      background-color: #ff5722;
      color: white;
    }
  }

  .icon-wrapper {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #e1f2ff;
    color: #00658d;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  h4 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #191c1e;
    margin: 0;
  }

  p {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.95rem;
    color: #8fa3b0;
    margin: 0;
  }
`;

const ScoreWidget = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;

  .score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradient(#26b1ff 85%, #f2f4f6 0deg);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 80px;
      height: 80px;
      background-color: #ffffff;
      border-radius: 50%;
    }

    span {
      position: relative;
      z-index: 1;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.5rem;
      color: #00658d;
      margin-top: 5px;
    }
  }

  .score-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.95rem;
      color: #3e4850;
      margin: 0;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.8rem;
      border-radius: 9999px;
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      background-color: #dcfce7;
      color: #166534;
    }
  }
`;

const IssueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid #e0e3e5;
  padding-top: 1.5rem;

  .issue-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.95rem;
    color: #3e4850;

    .icon.warning { color: #f59e0b; }
    .icon.success { color: #10b981; }
  }
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f7f9fb;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid transparent;
  transition: border-color 0.2s;

  &:hover {
    border-color: #bdc8d1;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    h4 {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #191c1e;
      margin: 0;
    }
    span {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 0.85rem;
      color: #8fa3b0;
    }
  }

  .btn-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00658d;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
`;

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const DashboardOverview = () => {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name ? session.user.name.split(' ')[0] : 'there';

  return (
    <DashboardContainer>
      <Header>
        <h1>Welcome back, {firstName}!</h1>
        <p>Here is an overview of your oral health and treatment progress.</p>
      </Header>

      <BentoGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Upload Card */}
        <Card variants={itemVariants}>
          <CardHeader>
            <h3><Camera size={20} color="#00658d" /> New AI Analysis</h3>
          </CardHeader>
          <UploadWidget>
            <div className="icon-wrapper">
              <UploadCloud size={32} />
            </div>
            <div>
              <h4>Upload or Take a Photo</h4>
              <p>Drag and drop your scan here</p>
            </div>
          </UploadWidget>
        </Card>

        {/* Recent Scan Results Card */}
        <Card className="span-2" variants={itemVariants}>
          <CardHeader>
            <h3><Activity size={20} color="#00658d" /> Latest Scan Results</h3>
            <Link to="/dashboard/scans">View Full Report <ArrowRight size={16} /></Link>
          </CardHeader>
          
          <ScoreWidget>
            <div className="score-circle">
              <span>85%</span>
            </div>
            <div className="score-details">
              <p>Scan captured on May 15, 2026</p>
              <div className="status"><CheckCircle2 size={16} /> Good overall health</div>
            </div>
          </ScoreWidget>

          <IssueList>
            <div className="issue-item">
              <AlertCircle size={18} className="icon warning" style={{ flexShrink: 0 }} />
              <span>Mild crowding detected on the lower anterior teeth. Orthodontic review recommended.</span>
            </div>
            <div className="issue-item">
              <CheckCircle2 size={18} className="icon success" style={{ flexShrink: 0 }} />
              <span>No signs of severe plaque buildup or visible cavities detected.</span>
            </div>
          </IssueList>
        </Card>

        {/* Active Treatments Card */}
        <Card variants={itemVariants}>
          <CardHeader>
            <h3><TrendingUp size={20} color="#00658d" /> Active Research</h3>
            <Link to="/dashboard/treatments">View All <ArrowRight size={16} /></Link>
          </CardHeader>
          
          <Link to="/treatments/braces" style={{ textDecoration: 'none' }}>
            <ActionItem>
              <div className="info">
                <h4>Orthodontic Braces</h4>
                <span>AI Consultation • In Progress</span>
              </div>
              <div className="btn-icon"><ArrowRight size={18} /></div>
            </ActionItem>
          </Link>
          
          <ActionItem>
            <div className="info">
              <h4>Teeth Whitening</h4>
              <span>Saved for later</span>
            </div>
            <div className="btn-icon"><ArrowRight size={18} /></div>
          </ActionItem>
        </Card>

        {/* Saved Clinics Card */}
        <Card className="span-2" variants={itemVariants}>
          <CardHeader>
            <h3><MapPin size={20} color="#00658d" /> Saved Local Clinics</h3>
            <Link to="/dashboard/clinics">Find More <ArrowRight size={16} /></Link>
          </CardHeader>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ActionItem style={{ margin: 0, border: '1px solid #e0e3e5' }}>
              <div className="info">
                <h4>Kumasi Premier Dental</h4>
                <span>Bantama High St • 1.2 km away</span>
              </div>
              <button style={{ 
                padding: '0.5rem 1rem', 
                background: '#e1f2ff', 
                color: '#00658d', 
                border: 'none', 
                borderRadius: '9999px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                Book Appointment
              </button>
            </ActionItem>

            <ActionItem style={{ margin: 0, border: '1px solid #e0e3e5' }}>
              <div className="info">
                <h4>Ashanti Orthodontics</h4>
                <span>Adum • 4.1 km away</span>
              </div>
              <button style={{ 
                padding: '0.5rem 1rem', 
                background: '#e1f2ff', 
                color: '#00658d', 
                border: 'none', 
                borderRadius: '9999px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                Book Appointment
              </button>
            </ActionItem>
          </div>
        </Card>

      </BentoGrid>
    </DashboardContainer>
  );
};

export default DashboardOverview;