import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import UserNavbar from '../../components/UserNavbar';
import UserSidebar from '../../components/UserSidebar';
import { authClient } from '../../lib/auth';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f9fb; /* Standard dashboard background */
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 1.5rem;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  
  @media (min-width: 768px) { padding: 2rem; }
  @media (min-width: 1024px) { padding: 3rem; max-width: calc(100vw - 260px); }
`;

const MobileOverlay = styled.div`
  display: none;
  
  @media (max-width: 1023px) {
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background-color: rgba(0, 30, 45, 0.5);
    backdrop-filter: blur(4px);
    z-index: 90; /* Just below the sidebar */
  }
`;

const LoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #00658d;
`;

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (isPending) {
    return (
      <LoadingScreen>
        <Loader2 className="animate-spin" size={36} />
      </LoadingScreen>
    );
  }

  if (!session?.user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <LayoutWrapper>
      {/* Navbar sits fixed at the very top */}
      <UserNavbar onMenuClick={toggleSidebar} />
      
      <MainContent>
        {/* Sidebar sits on the left */}
        <UserSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        {/* Dark overlay for mobile when sidebar is open */}
        <MobileOverlay $isOpen={isSidebarOpen} onClick={closeSidebar} />
        
        {/* The dynamic content injects here based on the route */}
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </LayoutWrapper>
  );
};

export default UserLayout;