import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ScanFace, 
  ClipboardList, 
  MapPin, 
  Wallet, 
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { authClient } from '../lib/auth';

const SidebarContainer = styled.aside`
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e0e3e5;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4.5rem); /* Full height minus the navbar */
  position: sticky;
  top: 4.5rem;
  
  /* Mobile Handling */
  @media (max-width: 1023px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
    transform: translateX(${(props) => (props.$isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease-in-out;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e3e5;

  h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    color: #00658d;
    margin: 0;
  }

  button {
    background: none;
    border: none;
    color: #3e4850;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavList = styled.nav`
  flex: 1;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #3e4850;
  transition: all 0.2s;

  &:hover {
    background-color: #f2f4f6;
    color: #00658d;
  }

  /* React Router automatically applies the 'active' class */
  &.active {
    background-color: #e1f2ff;
    color: #00658d;
    
    .icon { color: #26b1ff; }
  }

  .icon {
    color: #8fa3b0;
    transition: color 0.2s;
  }
`;

const BottomActions = styled.div`
  padding: 1.5rem 1rem;
  border-top: 1px solid #e0e3e5;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UserSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authClient.signOut();
    if (onClose) onClose();
    navigate('/');
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <MobileHeader>
        <h2>SWEET TOOTH</h2>
        <button onClick={onClose}><X size={24} /></button>
      </MobileHeader>

      <NavList>
        <StyledNavLink to="/dashboard" end onClick={onClose}>
          <LayoutDashboard className="icon" size={20} />
          Dashboard
        </StyledNavLink>
        
        <StyledNavLink to="/dashboard/scans" onClick={onClose}>
          <ScanFace className="icon" size={20} />
          My Scans
        </StyledNavLink>
        
        <StyledNavLink to="/dashboard/treatments" onClick={onClose}>
          <ClipboardList className="icon" size={20} />
          Treatment Plans
        </StyledNavLink>
        
        <StyledNavLink to="/dashboard/clinics" onClick={onClose}>
          <MapPin className="icon" size={20} />
          Local Clinics
        </StyledNavLink>
        
        <StyledNavLink to="/dashboard/finance" onClick={onClose}>
          <Wallet className="icon" size={20} />
          Financial Estimates
        </StyledNavLink>
      </NavList>

      <BottomActions>
        <StyledNavLink to="/dashboard/settings" onClick={onClose}>
          <Settings className="icon" size={20} />
          Settings
        </StyledNavLink>
        <StyledNavLink as="button" onClick={handleSignOut} style={{ color: '#a93100', border: 'none', background: 'none', cursor: 'pointer', width: '100%', font: 'inherit', textAlign: 'left' }}>
          <LogOut className="icon" size={20} color="#a93100" />
          Log Out
        </StyledNavLink>
      </BottomActions>
    </SidebarContainer>
  );
};

export default UserSidebar;