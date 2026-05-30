import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Search, Bell, Plus, Menu, Home } from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';

// --- Styled Components ---

const NavContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e3e5;
  height: 4.5rem;
  width: 100%;
`;

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1.5rem;
  
  @media (min-width: 1024px) { padding: 0 2rem; }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const MobileMenuBtn = styled.button`
  background: none;
  border: none;
  color: #3e4850;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-left: -0.5rem;
  
  @media (min-width: 1024px) { display: none; }
`;

const Brand = styled(Link)`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  color: #00658d;
  text-decoration: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  
  @media (max-width: 640px) { display: none; }
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  max-width: 500px;
  margin: 0 2rem;
  
  @media (max-width: 768px) { display: none; }
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  
  input {
    width: 100%;
    background-color: #f2f4f6;
    border: 1px solid transparent;
    border-radius: 9999px;
    padding: 0.6rem 1rem 0.6rem 2.8rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.95rem;
    color: #191c1e;
    transition: all 0.2s ease;
    
    &::placeholder { color: #8fa3b0; }
    &:focus {
      background-color: #ffffff;
      border-color: #26b1ff;
      outline: none;
      box-shadow: 0 0 0 3px rgba(38, 177, 255, 0.1);
    }
  }

  .icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #8fa3b0;
    pointer-events: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const NewScanBtn = styled.button`
  display: none;
  @media (min-width: 640px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #ff5722;
    color: #ffffff;
    border: none;
    border-radius: 9999px;
    padding: 0.6rem 1.25rem;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover { background-color: #f4511e; }
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #3e4850;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover { background-color: #f2f4f6; color: #00658d; }

  .badge {
    position: absolute;
    top: 0.3rem;
    right: 0.4rem;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #ff5722;
    border-radius: 50%;
    border: 2px solid #ffffff;
  }
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const UserAvatar = styled.button`
  background: #e1f2ff;
  border: 2px solid transparent;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  color: #00658d;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover { border-color: #00658d; }
`;

const UserNavbar = ({ onMenuClick }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NavContainer>
      <NavInner>
        <LeftSection>
          <MobileMenuBtn onClick={onMenuClick}>
            <Menu size={24} />
          </MobileMenuBtn>
          <Brand to="/dashboard">SWEET TOOTH</Brand>
        </LeftSection>

        <CenterSection>
          <SearchBar>
            <Search className="icon" size={18} />
            <input type="text" placeholder="Search treatments, scans, or clinics..." />
          </SearchBar>
        </CenterSection>

        <RightSection>
          {/* New Scan button pointing to the public scan route */}
          <NewScanBtn as={Link} to="/scan" style={{ textDecoration: 'none' }}>
            <Plus size={18} /> New AI Scan
          </NewScanBtn>
          
          {/* Home icon pointing back to the landing page */}
          <IconButton as={Link} to="/" title="Home">
            <Home size={20} />
          </IconButton>
          
          {/* Notification Area */}
          <NotificationWrapper ref={notifRef}>
            <IconButton 
              title="Notifications" 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
            >
              <Bell size={20} />
              <span className="badge" />
            </IconButton>
            
            <NotificationsDropdown isOpen={isNotifOpen} />
          </NotificationWrapper>
          
          <UserAvatar title="Profile Options">
            JD
          </UserAvatar>
        </RightSection>
      </NavInner>
    </NavContainer>
  );
};

export default UserNavbar;