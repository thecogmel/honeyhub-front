import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateBase from '@components/Base/PrivateBase';

import Home from '@pages/Dashboard';
import Honeycomb from '@pages/Honeycomb';

import RoutesPath from '../routes';

const PublicRoutes: React.FC = () => {
  return (
    <PrivateBase>
      <Routes>
        <Route path={RoutesPath.private.home} element={<Home />} />
        <Route path={RoutesPath.private.honeycomb} element={<Honeycomb />} />
        <Route
          path="*"
          element={<Navigate to={RoutesPath.private.home} replace />}
        />
      </Routes>
    </PrivateBase>
  );
};

export default PublicRoutes;
