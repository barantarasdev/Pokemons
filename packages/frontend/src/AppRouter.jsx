import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { PATH } from './constants/index.js';
import PublicRoute from './components/PublicRoute';
import Arena from './pages/Arena.jsx';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={PATH.AUTH} element={<Auth />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={PATH.HOME} element={<Home />} />
          <Route path={`${PATH.HOME}${PATH.POKEMON}`} element={<Arena />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
