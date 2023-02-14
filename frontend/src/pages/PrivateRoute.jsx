import { useAuthStatus } from '../hooks/useAuthStatus.jsx';
import { Spinner } from '../components/index.js';
import { Navigate, Outlet } from 'react-router-dom';

/* =============================
📦 COMPONENT - PrivateRoute
============================= */
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  /* =============================
  📦 RENDERING
  ============================= */
  if (checkingStatus) return <Spinner />;

  return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
