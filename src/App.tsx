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

import PricingPage from './pages/PricingPage';
import ExamplesGalleryPage from './pages/ExamplesGalleryPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AuthCallbackPage from './pages/auth/AuthCallbackPage';
import LogoutPage from './pages/auth/LogoutPage';
import SignedOutPage from './pages/auth/SignedOutPage';
import AccessDeniedPage from './pages/auth/AccessDeniedPage';

import DashboardPage from './pages/dashboard/DashboardPage';
import UploadPage from './pages/dashboard/UploadPage';
import ProcessingPage from './pages/dashboard/ProcessingPage';
import StoryViewer from './pages/dashboard/StoryViewer';
import RunsPage from './pages/dashboard/RunsPage';
import RunDetailPage from './pages/dashboard/RunDetailPage';
import SettingsPage from './pages/dashboard/SettingsPage';

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

        <Route path="pricing" element={<PricingPage />} />
        <Route path="examples" element={<ExamplesGalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>

      {/* Authentication routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Azure auth integration placeholders */}
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/signed-out" element={<SignedOutPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />

      {/* Authenticated dashboard routes */}
      <Route path="/dashboard" element={<Layout authenticated />}>
        <Route index element={<DashboardPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="processing/:jobId" element={<ProcessingPage />} />
        <Route path="story/:storyId" element={<StoryViewer />} />

        <Route path="runs" element={<RunsPage />} />
        <Route path="runs/:runId" element={<RunDetailPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
