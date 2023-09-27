import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateBase from '@components/Base/PrivateBase';

import RoutesPath from '../routes';
import pages from './pages';

const PublicRoutes: React.FC = () => {
  return (
    <PrivateBase>
      <Routes>
        {pages.map((page) => (
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
