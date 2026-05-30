import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom"; 

// --- Styled Components ---

const Container = styled.div`
  display: flex; 
  width: 100%;
  background-color: #ffffff; 
  overflow: hidden; 
`;

const MainContent = styled.main`
  flex: 1; 
  height: 100%;
  overflow-y: auto; 
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const App = () => {
  return (
    <Container>
      <MainContent>
        {/* Content Area - Renders whatever route is active */}
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContent>
    </Container>
  );
};

export default App;
