import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import SoundPlayer from "./utils/sounds";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import Challenges from "./pages/Challenges";
import Leaderboards from "./pages/Leaderboards";
import Badges from "./pages/Badges";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import PointsShop from "./pages/PointsShop";
import TeacherPortal from "./pages/TeacherPortal";
import Contact from "./pages/Contact";
import ProfileEdit from "./pages/ProfileEdit";
import Demo from "./pages/Demo";
import { StudentProvider } from "./contexts/StudentContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { initializeData } from "./data/sampleData";
import { AnimatePresence } from "framer-motion";

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  requiredRole?: 'student' | 'teacher' | 'admin';
}> = ({ children, requiredRole }) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-[#F8D991] text-xl font-semibold backdrop-blur-md bg-white/10 px-6 py-3 rounded-full">
          Loading...
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && userProfile.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// App Content Component
const AppContent: React.FC = () => {
  const { user, userProfile } = useAuth();

  // Redirect authenticated users to appropriate dashboard
  const getDefaultRoute = () => {
    if (user && userProfile) {
      return userProfile.role === 'student' ? '/dashboard' : '/teacher';
    }
    return '/';
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Student Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="student">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Dashboard />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lessons"
            element={
              <ProtectedRoute requiredRole="student">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Lessons />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lessons/:id"
            element={
              <ProtectedRoute requiredRole="student">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <LessonDetail />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute requiredRole="student">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Challenges />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboards"
            element={
              <ProtectedRoute requiredRole="student">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Leaderboards />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/badges"
            element={
              <ProtectedRoute requiredRole="student">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Badges />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop"
            element={
              <ProtectedRoute requiredRole="student">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <PointsShop />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute requiredRole="student">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Analytics />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="student">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <Header />
                  <main className="container mx-auto px-4 py-6">
                    <Profile />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute requiredRole="student">
                <ProfileEdit />
              </ProtectedRoute>
            }
          />
          
          {/* Teacher Routes */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute requiredRole="teacher">
                <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
                  <main className="container mx-auto px-4 py-6">
                    <TeacherPortal />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};
function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeData();
    SoundPlayer.preloadSounds();
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-[#F8D991] text-xl font-semibold backdrop-blur-md bg-white/10 px-6 py-3 rounded-full">
          Loading PrismWorlds Platform...
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <StudentProvider>
        <AppContent />
      </StudentProvider>
    </AuthProvider>
  );
}

export default App;
