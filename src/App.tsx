
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardPage from "./pages/DashboardPage";
import ConversationalAIPage from "./pages/ConversationalAIPage";
import LearningJourneyPage from "./pages/LearningJourneyPage";
import ELibraryPage from "./pages/ELibraryPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CarbonFootprintPage from "./pages/CarbonFootprintPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CoursesPublishedPage from "./pages/CoursesPublishedPage";
import CreatorJourneyPage from "./pages/CreatorJourneyPage";
import CreatorELibraryPage from "./pages/CreatorELibraryPage";
import MarketplacePage from "./pages/Marketplace";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import AdminCreatorsPage from "./pages/admin/AdminCreatorsPage";
import AdminLearnersPage from "./pages/admin/AdminLearnersPage";
import AdminSystemPage from "./pages/admin/AdminSystemPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/carbon" element={<CarbonFootprintPage />} />
          <Route path="/dashboard/ai" element={<ConversationalAIPage />} />
          <Route path="/dashboard/journey" element={<LearningJourneyPage />} />
          <Route path="/dashboard/library" element={<ELibraryPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/create-course" element={<CreateCoursePage />} />
          <Route path="/dashboard/courses-published" element={<CoursesPublishedPage />} />
          <Route path="/dashboard/creator-e-library" element={<CreatorELibraryPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/creators" element={<AdminCreatorsPage />} />
          <Route path="/admin/learners" element={<AdminLearnersPage />} />
          <Route path="/admin/system" element={<AdminSystemPage />} />
          <Route path="/dashboard/creator-journey" element={<CreatorJourneyPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/course/:courseId" element={<CourseDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
