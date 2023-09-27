import React from 'react';

import { CircularProgress } from '@mui/material';

import { LandingPage } from './styles';

const SplashScreen: React.FC = () => {
  return (
    <LandingPage>
      <CircularProgress color="warning" />
    </LandingPage>
  );
};

export default SplashScreen;
