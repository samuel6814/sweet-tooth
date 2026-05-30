import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from "./App";

// --- Homepage & Auth ---
import HomeLayout from './pages/home/HomeLayout';
import Auth from './pages/auth/Auth';

// --- Static Pages ---
import PrivacyPolicy from './pages/static/PrivacyPolicy';
import TermsOfService from './pages/static/TermsOfService';
import DataSecurity from './pages/static/DataSecurity';

// --- Feature Pages ---
import HowItWorks from './pages/features/HowItWorks';
import AIAnalysis from './pages/features/AIAnalysis';
import Treatments from './pages/features/Treatments';
import CostEstimates from './pages/features/CostEstimates';
import TreatmentDetail from './pages/features/TreatmentDetail';
import NewScan from './pages/features/NewScan'; 

// --- User Dashboard ---
import UserLayout from './pages/user/UserLayout';
import DashboardOverview from './pages/user/DashboardOverview'; 
import MyScans from './pages/user/MyScans';
import UserTreatments from './pages/user/UserTreatments';
import LocalClinics from './pages/user/LocalClinics';
import UserFinance from './pages/user/UserFinance';
import UserSettings from './pages/user/UserSettings';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          
          {/* Main Landing Page */}
          <Route index element={<HomeLayout />} />
          
          {/* Authentication */}
          <Route path="login" element={<Auth />} />

          {/* Static/Legal Pages */}
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="security" element={<DataSecurity />} />

          {/* Feature Pages */}
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="ai-analysis" element={<AIAnalysis />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="cost-estimates" element={<CostEstimates />} />
          <Route path="scan" element={<NewScan />} />

          <Route path="treatments/braces" element={<TreatmentDetail />} />

          {/* Protected User Dashboard Routes */}
          <Route path="dashboard" element={<UserLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="scans" element={<MyScans />} />
            <Route path="treatments" element={<UserTreatments />} />
            <Route path="clinics" element={<LocalClinics />} />
            <Route path="finance" element={<UserFinance />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
          
        </Route> {/* ADDED: Missing closing tag for the main App route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);