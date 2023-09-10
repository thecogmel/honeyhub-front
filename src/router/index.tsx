import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '@contexts/Auth';

import PrivatePages from './PrivatePages';
import PublicPages from './PublicPages';

const AppRouter: React.FC = () => {
  const { authorized } = useAuth();
  return (
    <BrowserRouter>
      {authorized ? <PrivatePages /> : <PublicPages />}
    </BrowserRouter>
  );
};

export default AppRouter;
