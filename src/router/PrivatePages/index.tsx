import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '@contexts/Auth';

import PrivateBase from '@components/Base/PrivateBase';

import RoutesPath from '../routes';
import pages from './pages';

const PublicRoutes: React.FC = () => {
  const { userInfo } = useAuth();
  return (
    <PrivateBase>
      <Routes>
        {pages
          .filter((pageRole) => pageRole.route.role.includes(userInfo!.role))
          .map((page) => (
            <Route
              key={page.route.path}
              path={page.route.path}
              element={<page.component />}
            />
          ))}

        <Route
          path="*"
          element={<Navigate to={RoutesPath.private.home.path} replace />}
        />
      </Routes>
    </PrivateBase>
  );
};

export default PublicRoutes;
