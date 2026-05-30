import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  ArrowUpRight,
  Menu,
  X,
  LayoutDashboard,
  ScanFace,
  ClipboardList,
  MapPin,
  Wallet,
  Settings,
  LogOut,
  LogIn,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from '../lib/auth';

// --- Shared nav config ---
const PUBLIC_LINKS = [
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Treatments', to: '/treatments' },
];

const DASHBOARD_LINKS = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'My Scans', to: '/dashboard/scans', icon: ScanFace },
  { label: 'Treatment Plans', to: '/dashboard/treatments', icon: ClipboardList },
  { label: 'Local Clinics', to: '/dashboard/clinics', icon: MapPin },
  { label: 'Financial Estimates', to: '/dashboard/finance', icon: Wallet },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
];

// --- Breakpoints ---
// phone:   < 768px
// tablet:  768px – 1023px
// desktop: >= 1024px
const TABLET = '768px';
const DESKTOP = '1024px';

// --- Styled Components ---

const NavContainer = styled.nav`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 1.5rem);
  max-width: 1850px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 500px;
  box-shadow: 0 10px 40px rgba(0, 101, 141, 0.08);

  @media (min-width: ${TABLET}) {
    top: 1.5rem;
    width: calc(100% - 3rem);
  }
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  padding: 0 1.25rem;

  @media (min-width: ${TABLET}) {
    height: 4.5rem;
    padding: 0 1.75rem;
  }

  @media (min-width: ${DESKTOP}) {
    padding: 0 2.5rem;
  }
`;

const Brand = styled(Link)`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px;
  color: #00658d;
  text-decoration: none;
  letter-spacing: 0.03em;

  @media (min-width: ${TABLET}) {
    font-size: 32px;
  }
`;

const NavLinks = styled.ul`
  display: none;
  @media (min-width: ${TABLET}) {
    display: flex;
    gap: 1.75rem;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
  }
  @media (min-width: ${DESKTOP}) {
    gap: 2.5rem;
  }
`;

const NavItem = styled(Link)`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #3e4850;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    color: #26b1ff;
  }
  @media (min-width: ${DESKTOP}) {
    font-size: 16px;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: ${TABLET}) {
    gap: 1rem;
  }
`;

const CtaButton = styled.button`
  padding: 0.6rem 1rem;
  background-color: #ff5722;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  &:hover {
    background-color: #f4511e;
  }

  @media (min-width: ${TABLET}) {
    padding: 0.75rem 1.5rem;
    font-size: 14px;
  }

  /* On phones we hide the label and show a compact button via the parent */
  .cta-label {
    display: none;
    @media (min-width: 480px) {
      display: inline;
    }
  }
`;

// --- Auth/Profile Styles ---
const ProfileWrapper = styled.div`
  position: relative;
  display: none;
  @media (min-width: ${TABLET}) {
    display: block;
  }
`;

const UserAvatar = styled.button`
  background: #e1f2ff;
  border: 2px solid #00658d;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-weight: 700;
  font-family: 'Hanken Grotesk', sans-serif;
  color: #00658d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileMenu = styled(motion.div)`
  position: absolute;
  top: 130%;
  right: 0;
  width: 240px;
  background: white;
  border: 1px solid #e0e3e5;
  border-radius: 1rem;
  box-shadow: 0 14px 40px rgba(0, 101, 141, 0.18);
  padding: 0.5rem;
  overflow: hidden;
`;

const ProfileInfo = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid #e0e3e5;
  margin-bottom: 0.25rem;

  .name {
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    color: #191c1e;
    font-size: 0.95rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .email {
    font-family: 'Hanken Grotesk', sans-serif;
    color: #8fa3b0;
    font-size: 0.8rem;
    margin: 0.15rem 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ProfileItem = styled(Link)`
  padding: 0.7rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #3e4850;
  text-decoration: none;
  border-radius: 0.6rem;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  &:hover {
    background: #f2f4f6;
    color: #00658d;
  }
`;

const LogoutBtn = styled.button`
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.7rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #d32f2f;
  border: none;
  border-top: 1px solid #e0e3e5;
  border-radius: 0 0 0.6rem 0.6rem;
  background: none;
  cursor: pointer;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  &:hover {
    background: #ffebee;
  }
`;

const LoginLink = styled(Link)`
  display: none;
  color: #00658d;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  align-items: center;
  gap: 0.4rem;
  &:hover {
    color: #26b1ff;
  }
  @media (min-width: ${TABLET}) {
    display: flex;
  }
`;

// --- Mobile menu ---
const HamburgerBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: none;
  background: #e1f2ff;
  color: #00658d;
  cursor: pointer;
  @media (min-width: ${TABLET}) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: min(85vw, 340px);
  background: #ffffff;
  z-index: 3000;
  box-shadow: -10px 0 40px rgba(0, 30, 45, 0.15);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  span {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    color: #00658d;
  }
  button {
    background: #f2f4f6;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3e4850;
    cursor: pointer;
  }
`;

const MobileUserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f7f9fb;
  border-radius: 1rem;
  margin-bottom: 1rem;

  .avatar {
    flex-shrink: 0;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: #e1f2ff;
    border: 2px solid #00658d;
    color: #00658d;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
  }
  .meta {
    min-width: 0;
  }
  .name {
    font-family: 'Hanken Grotesk', sans-serif;
    font-weight: 700;
    color: #191c1e;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .email {
    font-family: 'Hanken Grotesk', sans-serif;
    color: #8fa3b0;
    font-size: 0.8rem;
    margin: 0.15rem 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const MobileSectionLabel = styled.p`
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #8fa3b0;
  margin: 1rem 0 0.5rem 0.25rem;
`;

const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 0.75rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #3e4850;
  &:hover {
    background: #f2f4f6;
    color: #00658d;
  }
`;

const MobileLogout = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.85rem 0.75rem;
  border-radius: 0.75rem;
  border: none;
  background: #ffebee;
  color: #d32f2f;
  font-family: 'Hanken Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;

const MobileLoginBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.95rem;
  border-radius: 0.85rem;
  background: #00658d;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 30, 45, 0.5);
  backdrop-filter: blur(3px);
  z-index: 2900;
`;

// --- Modal ---
const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 30, 45, 0.6);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
`;

// --- Component ---
const Navbar = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const isLoggedIn = !!user;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const profileRef = useRef(null);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  const handleScanClick = () => {
    closeMobile();
    isLoggedIn ? navigate('/scan') : setShowGuestModal(true);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsProfileOpen(false);
    closeMobile();
    navigate('/');
  };

  return (
    <>
      <NavContainer>
        <NavInner>
          <Brand to="/" onClick={closeMobile}>
            SWEET TOOTH
          </Brand>

          <NavLinks>
            {PUBLIC_LINKS.map((link) => (
              <li key={link.to}>
                <NavItem to={link.to}>{link.label}</NavItem>
              </li>
            ))}
          </NavLinks>

          <ActionGroup>
            <CtaButton onClick={handleScanClick}>
              <span className="cta-label">Start Free Scan</span>
              <ArrowUpRight size={18} style={{ marginLeft: '6px' }} />
            </CtaButton>

            {/* Desktop / tablet: profile dropdown or login */}
            {!isPending && isLoggedIn ? (
              <ProfileWrapper ref={profileRef}>
                <UserAvatar onClick={() => setIsProfileOpen((v) => !v)} title="Account">
                  {initials}
                </UserAvatar>
                <AnimatePresence>
                  {isProfileOpen && (
                    <ProfileMenu
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ProfileInfo>
                        <p className="name">{user.name || 'Account'}</p>
                        <p className="email">{user.email}</p>
                      </ProfileInfo>
                      {DASHBOARD_LINKS.map(({ label, to, icon: Icon }) => (
                        <ProfileItem key={to} to={to} onClick={() => setIsProfileOpen(false)}>
                          <Icon size={17} /> {label}
                        </ProfileItem>
                      ))}
                      <LogoutBtn onClick={handleSignOut}>
                        <LogOut size={17} /> Log Out
                      </LogoutBtn>
                    </ProfileMenu>
                  )}
                </AnimatePresence>
              </ProfileWrapper>
            ) : (
              !isPending && (
                <LoginLink to="/login">
                  <LogIn size={17} /> Log In
                </LoginLink>
              )
            )}

            {/* Phone: hamburger */}
            <HamburgerBtn onClick={() => setIsMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </HamburgerBtn>
          </ActionGroup>
        </NavInner>
      </NavContainer>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
            >
              <MobileMenuHeader>
                <span>SWEET TOOTH</span>
                <button onClick={closeMobile} aria-label="Close menu">
                  <X size={22} />
                </button>
              </MobileMenuHeader>

              {isLoggedIn && (
                <MobileUserCard>
                  <div className="avatar">{initials}</div>
                  <div className="meta">
                    <p className="name">{user.name || 'Account'}</p>
                    <p className="email">{user.email}</p>
                  </div>
                </MobileUserCard>
              )}

              <MobileSectionLabel>Explore</MobileSectionLabel>
              {PUBLIC_LINKS.map((link) => (
                <MobileLink key={link.to} to={link.to} onClick={closeMobile}>
                  {link.label}
                </MobileLink>
              ))}

              {isLoggedIn ? (
                <>
                  <MobileSectionLabel>My Account</MobileSectionLabel>
                  {DASHBOARD_LINKS.map(({ label, to, icon: Icon }) => (
                    <MobileLink key={to} to={to} onClick={closeMobile}>
                      <Icon size={20} /> {label}
                    </MobileLink>
                  ))}
                  <MobileLogout onClick={handleSignOut}>
                    <LogOut size={20} /> Log Out
                  </MobileLogout>
                </>
              ) : (
                <MobileLoginBtn to="/login" onClick={closeMobile}>
                  <LogIn size={18} /> Log In / Register
                </MobileLoginBtn>
              )}
            </MobileMenu>
          </>
        )}
      </AnimatePresence>

      {/* Guest scan modal */}
      <AnimatePresence>
        {showGuestModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGuestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1.5rem',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', margin: '0 0 0.5rem' }}>
                Continue to Scan?
              </h3>
              <p style={{ fontFamily: 'Hanken Grotesk', color: '#3e4850' }}>
                Save your results by logging in, or continue as a guest.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1.5rem' }}>
                <button
                  onClick={() => {
                    setShowGuestModal(false);
                    navigate('/scan');
                  }}
                  style={{ padding: '12px', borderRadius: '99px', border: 'none', background: '#eee', cursor: 'pointer', fontWeight: 600 }}
                >
                  Continue as Guest
                </button>
                <button
                  onClick={() => {
                    setShowGuestModal(false);
                    navigate('/login');
                  }}
                  style={{ padding: '12px', borderRadius: '99px', border: 'none', background: '#00658d', color: 'white', cursor: 'pointer', fontWeight: 600 }}
                >
                  Log In / Register
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
