import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '../constants/index.js';

function PublicRoute() {
  const isLogged = sessionStorage.getItem('logged');

  return isLogged ? <Navigate to={PATH.HOME} replace /> : <Outlet />;
}

export default PublicRoute;
