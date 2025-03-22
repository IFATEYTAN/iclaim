// /src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../store/useStore';

const ProtectedRoute = () => {
  const { auth } = useStore();
  
  // אם המשתמש לא מזוהה, הפנייה לדף ההתחברות
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // אם המשתמש מזוהה, אפשר להמשיך לדף המבוקש
  return <Outlet />;
};

export default ProtectedRoute;
