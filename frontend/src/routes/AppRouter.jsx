// src/routes/AppRouter.jsx
import FacultyRoutes from './FacultyRoutes';
// import HodRoutes     from './HodRoutes';

export default function AppRouter({ role }) {
//   if (role === 'hod')       return <HodRoutes />;
//   if (role === 'principal') return <PrincipalRoutes />;
  return <FacultyRoutes />; // default
}