import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '../constants/index.js';

function ProtectedRoute() {
  const isLogged = sessionStorage.getItem('logged');

  return isLogged ? <Outlet /> : <Navigate to={PATH.AUTH} replace />;
}

export default ProtectedRoute;
