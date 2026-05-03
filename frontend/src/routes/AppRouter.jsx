import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth }        from '../context/AuthContext';
import FacultyRoutes      from './FacultyRoutes';
import HODRoutes          from './HODRoutes';
// import PrincipalRoutes    from './PrincipleRoutes';
import ChairmanRoutes     from './ChairmanRoutes';
import LoginPage          from '../pages/auth/Login';

const ROLE_HOME = {
  faculty:   '/faculty/dashboard',
  hod:       '/HOD/dashboard',
  // principal: '/principal/dashboard',
  chairman:  '/chairman/dashboard',
};

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to={ROLE_HOME[user.role] || '/login'} replace /> : <LoginPage />
      } />

      <Route path="/faculty/*" element={
        !user ? <Navigate to="/login" replace />
          : user.role !== 'faculty' ? <Navigate to={ROLE_HOME[user.role]} replace />
          : <FacultyRoutes />
      } />

      <Route path="/HOD/*" element={
        !user ? <Navigate to="/login" replace />
          : user.role !== 'hod' ? <Navigate to={ROLE_HOME[user.role]} replace />
          : <HODRoutes />
      } />

      {/* <Route path="/principal/*" element={
        !user ? <Navigate to="/login" replace />
          : user.role !== 'principal' ? <Navigate to={ROLE_HOME[user.role]} replace />
          : <PrincipalRoutes />
      } /> */}

      <Route path="/chairman/*" element={
        !user ? <Navigate to="/login" replace />
          : user.role !== 'chairman' ? <Navigate to={ROLE_HOME[user.role]} replace />
          : <ChairmanRoutes />
      } />

      <Route path="*" element={
        user ? <Navigate to={ROLE_HOME[user.role] || '/login'} replace /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
}