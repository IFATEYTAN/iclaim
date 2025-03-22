// /src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import ProtectedRoute from './routes/ProtectedRoute';
import useStore from './store/useStore';
import { Toaster } from 'sonner';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const BarManagement = lazy(() => import('./pages/BarManagement'));
const TransactionManagement = lazy(() => import('./pages/TransactionManagement'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  const { auth } = useStore();
  
  return (
    <Router>
      <div className="flex h-screen bg-background">
        {auth.isAuthenticated && <Sidebar />}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4">
            <Suspense fallback={<div className="flex items-center justify-center h-full">טוען...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/bars" element={<BarManagement />} />
                  <Route path="/transactions" element={<TransactionManagement />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
      <Toaster position="top-left" richColors />
    </Router>
  );
}

export default App;