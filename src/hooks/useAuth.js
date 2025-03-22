import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

export const useAuth = () => {
  const { 
    auth, 
    login, 
    logout, 
    checkAuth 
  } = useStore(state => ({
    auth: state.auth,
    login: state.login,
    logout: state.logout,
    checkAuth: state.checkAuth
  }));
  
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      navigate('/dashboard');
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;
