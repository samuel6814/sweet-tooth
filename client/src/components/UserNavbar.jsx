import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Search, Bell, Plus, Menu, Home, LogOut } from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';
import { authClient } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

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

const ProfileDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 101, 141, 0.15);
  border: 1px solid #e0e3e5;
  width: 200px;
  overflow: hidden;
  z-index: 50;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;

  .user-info {
    padding: 1rem;
    border-bottom: 1px solid #e0e3e5;
    background-color: #f7f9fb;
    
    p { margin: 0; }
    .name { font-weight: 700; color: #191c1e; font-size: 0.95rem; }
    .email { color: #8fa3b0; font-size: 0.8rem; margin-top: 0.2rem; }
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Hanken Grotesk', sans-serif;
    font-size: 0.95rem;
    color: #d32f2f;
    font-weight: 600;
    transition: background-color 0.2s;

    &:hover { background-color: #ffebee; }
  }
`;

const UserNavbar = ({ onMenuClick }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate('/login');
  };

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
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
          <div ref={profileRef} style={{ position: 'relative' }}>
            <UserAvatar title="Profile Options" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'JD'}
            </UserAvatar>

            <ProfileDropdownMenu $isOpen={isProfileOpen}>
              <div className="user-info">
                <p className="name">{user?.name || 'Guest'}</p>
                <p className="email">{user?.email || 'Not logged in'}</p>
              </div>
              <button className="action-btn" onClick={handleSignOut}>
                <LogOut size={18} /> Sign Out
              </button>
            </ProfileDropdownMenu>
          </div>
        </RightSection>
      </NavInner>
    </NavContainer>
  );
};

export default UserNavbar;