// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import DashboardPage from './pages/DashboardPage';
import ReferralsPage from './pages/ReferralsPage';
import CustomersPage from './pages/CustomersPage';
import SettingsPage from './pages/SettingsPage';
import MarketingPage from './pages/MarketingPage';
import LearningPage from './pages/LearningPage';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

// Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-xl text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   return user ? children : <Navigate to="/login" />;
// };

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/referrals" 
              element={
                // <ProtectedRoute>
                  <ReferralsPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                // <ProtectedRoute>
                  <DashboardPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/customers" 
              element={
                // <ProtectedRoute>
                  <CustomersPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/marketing" 
              element={
                // <ProtectedRoute>
                  <MarketingPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/learning" 
              element={
                // <ProtectedRoute>
                  <LearningPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                // <ProtectedRoute>
                  <SettingsPage />
                // </ProtectedRoute>
              } 
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;