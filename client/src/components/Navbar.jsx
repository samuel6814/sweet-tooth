import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowUpRight, Menu, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Styled Components ---

const NavContainer = styled.nav`
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 3rem);
  max-width: 1850px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 500px;
  box-shadow: 0 10px 40px rgba(0, 101, 141, 0.08);
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.5rem;
  padding: 0 2.5rem;
`;

const Brand = styled(Link)`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px;
  color: #00658d;
  text-decoration: none;
`;

const NavLinks = styled.ul`
  display: none;
  @media (min-width: 768px) {
    display: flex; gap: 2.5rem; list-style: none; margin: 0; align-items: center;
  }
`;

const NavItem = styled(Link)`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 16px; font-weight: 600; color: #3e4850; text-transform: uppercase;
  text-decoration: none; &:hover { color: #26b1ff; }
`;

const ActionGroup = styled.div`
  display: flex; align-items: center; gap: 1rem;
`;

const CtaButton = styled.button`
  padding: 0.75rem 1.8rem;
  background-color: #ff5722;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex; align-items: center;
  &:hover { background-color: #f4511e; }
`;

// --- Auth/Profile Styles ---
const ProfileWrapper = styled.div` position: relative; `;

const UserAvatar = styled.button`
  background: #e1f2ff; border: 2px solid #00658d; width: 2.5rem; height: 2.5rem;
  border-radius: 50%; font-weight: 700; color: #00658d; cursor: pointer;
`;

const ProfileMenu = styled(motion.div)`
  position: absolute; top: 120%; right: 0; width: 200px; background: white;
  border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); padding: 0.5rem;
`;

const ProfileItem = styled(Link)`
  padding: 0.75rem; display: flex; align-items: center; gap: 0.5rem;
  color: #3e4850; text-decoration: none; font-family: 'Hanken Grotesk';
  &:hover { background: #f7f9fb; }
`;

const LogoutBtn = styled.button`
  width: 100%; padding: 0.75rem; display: flex; align-items: center; gap: 0.5rem;
  color: #a93100; border: none; background: none; cursor: pointer;
`;

// --- Modal ---
const ModalOverlay = styled(motion.div)`
  position: fixed; inset: 0; background: rgba(0,30,45,0.6); z-index: 2000;
  display: flex; align-items: center; justify-content: center;
`;

// --- Component ---
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleScanClick = () => isLoggedIn ? navigate('/scan') : setShowGuestModal(true);

  return (
    <>
      <NavContainer>
        <NavInner>
          <Brand to="/">SWEET TOOTH</Brand>
          <NavLinks>
            <li><NavItem to="/how-it-works">How It Works</NavItem></li>
            <li><NavItem to="/treatments">Treatments</NavItem></li>
          </NavLinks>

          <ActionGroup>
            <CtaButton onClick={handleScanClick}>
              Start Free Scan <ArrowUpRight size={18} style={{marginLeft:'8px'}}/>
            </CtaButton>

            {isLoggedIn ? (
              <ProfileWrapper ref={profileRef}>
                <UserAvatar onClick={() => setIsProfileOpen(!isProfileOpen)}>JD</UserAvatar>
                <AnimatePresence>
                  {isProfileOpen && (
                    <ProfileMenu>
                      <ProfileItem to="/dashboard"><LayoutDashboard size={16}/> Dashboard</ProfileItem>
                      <ProfileItem to="/dashboard/settings"><Settings size={16}/> Settings</ProfileItem>
                      <LogoutBtn onClick={() => { setIsLoggedIn(false); navigate('/'); }}><LogOut size={16}/> Log Out</LogoutBtn>
                    </ProfileMenu>
                  )}
                </AnimatePresence>
              </ProfileWrapper>
            ) : (
              <Link to="/login" style={{color:'#00658d', fontWeight:700, textDecoration:'none'}}>Log In</Link>
            )}
          </ActionGroup>
        </NavInner>
      </NavContainer>

      <AnimatePresence>
        {showGuestModal && (
          <ModalOverlay onClick={() => setShowGuestModal(false)}>
            <motion.div style={{background:'white', padding:'2rem', borderRadius:'1.5rem', width:'400px', textAlign:'center'}}>
              <h3 style={{fontFamily:'Bebas Neue', fontSize:'2rem'}}>Continue to Scan?</h3>
              <p style={{fontFamily:'Hanken Grotesk'}}>Save your results by logging in, or continue as a guest.</p>
              <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                <button onClick={() => {setShowGuestModal(false); navigate('/scan')}} style={{padding:'10px', borderRadius:'99px', border:'none', background:'#eee'}}>Continue as Guest</button>
                <button onClick={() => {setShowGuestModal(false); setIsLoggedIn(true); navigate('/scan')}} style={{padding:'10px', borderRadius:'99px', border:'none', background:'#00658d', color:'white'}}>Log In / Register</button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;