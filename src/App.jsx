import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Helmet } from 'react-helmet-async';
import useStore from './store/useStore';

// Layouts
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BarsPage from './pages/BarsPage';
import TransactionsPage from './pages/TransactionsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const { isAuthenticated, checkAuth } = useStore(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    checkAuth: state.checkAuth
  }));

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Helmet>
        <title>מערכת גורם מפנה</title>
        <meta name="description" content="מערכת לניהול גורמים מפנים" />
      </Helmet>
      
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
          </Route>
          
          {/* App Routes - Protected */}
          <Route 
            element={
              <MainLayout>
                {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
              </MainLayout>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/bars" element={<BarsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          
          {/* Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      
      <Toaster position="top-left" richColors />
    </>
  );
};

export default App;
