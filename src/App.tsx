/**
 * Main application component with routing structure
 */

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ProblemPage from './pages/ProblemPage';
import SolutionPage from './pages/SolutionPage';
import HowItWorksPage from './pages/HowItWorksPage';
import DemoPage from './pages/DemoPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import UploadPage from './pages/dashboard/UploadPage';
import ProcessingPage from './pages/dashboard/ProcessingPage';
import StoryViewer from './pages/dashboard/StoryViewer';

export default function App() {
  return (
    <Routes>
      {/* Public marketing routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="problem" element={<ProblemPage />} />
        <Route path="solution" element={<SolutionPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="demo" element={<DemoPage />} />
      </Route>

      {/* Authentication routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Authenticated dashboard routes */}
      <Route path="/dashboard" element={<Layout authenticated />}>
        <Route index element={<DashboardPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="processing/:jobId" element={<ProcessingPage />} />
        <Route path="story/:storyId" element={<StoryViewer />} />
      </Route>
    </Routes>
  );
}
