import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Star, Phone, ExternalLink, Navigation, Search } from 'lucide-react';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

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

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e0e3e5;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 300px;

  input {
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Hanken Grotesk', sans-serif;
    margin-left: 0.5rem;
    width: 100%;
    color: #191c1e;
  }
`;

const ClinicsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
`;

const ClinicCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 1.5rem;
  border: 1px solid #e0e3e5;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0, 101, 141, 0.06);
    border-color: #26b1ff;
  }
`;

const ClinicInfo = styled.div`
  h3 {
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #191c1e;
    margin: 0 0 0.5rem 0;
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #8fa3b0;

    .rating {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #f59e0b;
      font-weight: 700;
    }
  }

  .address {
    margin-top: 1rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.95rem;
    color: #3e4850;
    line-height: 1.4;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  button {
    padding: 0.75rem;
    border-radius: 0.75rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;
    border: none;

    &.primary {
      background: #00658d;
      color: white;
      &:hover { background: #004c6b; }
    }
    
    &.secondary {
      background: #e1f2ff;
      color: #00658d;
      &:hover { background: #c6e7ff; }
    }
  }
`;

const MOCK_CLINICS = [
  { id: 1, name: "Kumasi Premier Dental", address: "Bantama High St, Near Komfo Anokye", distance: "1.2 km", rating: 4.8, reviews: 124 },
  { id: 2, name: "Ashanti Orthodontics", address: "Adum, Close to Central Market", distance: "4.1 km", rating: 4.9, reviews: 210 },
  { id: 3, name: "Oforikrom Smile Clinic", address: "Accra Rd, Oforikrom", distance: "3.5 km", rating: 4.6, reviews: 89 },
  { id: 4, name: "KNUST Dental Services", address: "University Campus, Tech", distance: "6.0 km", rating: 4.7, reviews: 156 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const LocalClinics = () => {
  return (
    <PageContainer>
      <Header>
        <div>
          <h1>Saved Clinics</h1>
          <p>Manage your preferred specialists and upcoming consultations.</p>
        </div>
        <SearchBox>
          <Search size={18} color="#8fa3b0" />
          <input type="text" placeholder="Search Kumasi area..." />
        </SearchBox>
      </Header>

      <ClinicsGrid variants={containerVariants} initial="hidden" animate="visible">
        {MOCK_CLINICS.map(clinic => (
          <ClinicCard key={clinic.id} variants={itemVariants}>
            <ClinicInfo>
              <h3>{clinic.name}</h3>
              <div className="meta">
                <span className="rating"><Star size={16} fill="#f59e0b" /> {clinic.rating} ({clinic.reviews})</span>
                <span>•</span>
                <span>{clinic.distance} away</span>
              </div>
              <div className="address">
                <MapPin size={18} color="#00658d" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{clinic.address}</span>
              </div>
            </ClinicInfo>
            <ActionGrid>
              <button className="secondary"><Phone size={16} /> Call Clinic</button>
              <button className="primary"><ExternalLink size={16} /> Book Online</button>
            </ActionGrid>
          </ClinicCard>
        ))}
      </ClinicsGrid>
    </PageContainer>
  );
};

export default LocalClinics;