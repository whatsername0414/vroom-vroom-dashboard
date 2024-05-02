import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ user }) => {
  return user ? <Outlet /> : <Navigate to={'/auth'} />;
};

export default RequireAuth;
